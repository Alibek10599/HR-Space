import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from 'src/app/users/users.model';
import { EmailService } from './email.service';

describe('EmailService', () => {
  let service: EmailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailService, ConfigService],
      imports: [ConfigModule.forRoot()],
    }).compile();

    service = module.get<EmailService>(EmailService);
  });

  // it('should be defined', () => {
  //   expect(service).toBeDefined();
  // });

  it('should send email', async () => {
    let user: User;
    user.id = 16;
    user.email = 'alibekalibek856@gmail.com';
    expect(service.sendRegistrationEmail(user)).toBeInstanceOf(Object);
  });
});
