import { ApiProperty } from '@nestjs/swagger';

export class ResetPassworRequestDto {
  @ApiProperty({ example: 'dushurbakiev@gmail.com', description: 'Почта' })
  readonly email: string;
}
