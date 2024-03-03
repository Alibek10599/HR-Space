import { ApiProperty } from '@nestjs/swagger';

export class ApproveApplicationDto {
  @ApiProperty({ example: 1, description: 'Id of application' })
  readonly id: number;
}
