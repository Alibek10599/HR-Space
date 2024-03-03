import { ApiProperty } from '@nestjs/swagger';

export class CreateApplicationDto {
  @ApiProperty({ example: 1, description: 'employeeId' })
  readonly employeeId: number;
  @ApiProperty({ example: 1, description: 'positionId' })
  readonly positionId: number;
  @ApiProperty({ example: 1, description: 'headId' })
  readonly headId: number;
  @ApiProperty({ example: 1, description: 'typeId' })
  readonly typeId: number;
}
