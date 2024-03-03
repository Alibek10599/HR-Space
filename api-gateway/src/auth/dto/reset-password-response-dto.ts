import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordResponseDto {
  @ApiProperty({ example: 'Пароль успешно изменен', description: 'Сообщение' })
  readonly message: string;
}
