import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginUserDto } from '../users/dto/login-user-dto';
import { comparePasswords, hashPassword } from '../helpers/hashHelper';
import { autoGeneratePassword } from '../helpers/autoGenerateStrHelper';
import { ResetPasswordDto } from './dto/reset-password-dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../users/users.model';
import { LoginResponse } from './auth.pb';
import { EmailService } from 'src/email/email.service';
import { SetPasswordRequest } from '../grpc/auth.pb';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private emailService: EmailService,
    @InjectModel(User) private userRepository: typeof User,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.getUser(email);
    if (user && (await comparePasswords(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: LoginUserDto): Promise<LoginResponse> {
    const authUser = await this.validateUser(user.email, user.password);

    if (authUser) {
      const roleId = (await this.usersService.getUser(user.email)).roleId;
      const payload = { email: user.email, roleId: roleId };

      return {
        token: this.jwtService.sign(payload),
        status: HttpStatus.OK,
        error: null,
      };
    }

    return {
      token: null,
      status: HttpStatus.FORBIDDEN,
      error: ['Неверный email или пароль'],
    };
  }

  async resetPassword(dto: ResetPasswordDto) {
    const email = dto.email;
    const newPassword = await autoGeneratePassword();
    const password = await hashPassword(newPassword);
    await this.emailService.resetPasswordEmail(newPassword, email);
    return await this.userRepository.update({ password }, { where: { email } });
  }

  async setPassword(dto: SetPasswordRequest) {
    const email = (await this.userRepository.findByPk(dto.userId)).email;
    const newPassword = await autoGeneratePassword();
    const password = await hashPassword(newPassword);
    await this.emailService.sendPasswordEmail(password, email);
    return await this.userRepository.update({ password }, { where: { email } });
  }
}
