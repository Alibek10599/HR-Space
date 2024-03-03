import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployeeAdditionsDto {
  @ApiProperty({ example: 1, description: 'departmentId' })
  readonly departmentId: number;
  @ApiProperty({ example: 1, description: 'positionId' })
  readonly positionId: number;
  @ApiProperty({ example: 1, description: 'levelId' })
  readonly levelId: number;
  @ApiProperty({ example: 1, description: 'headId' })
  readonly headId: number;
  @ApiProperty({ example: 1, description: 'contractId' })
  readonly contractId: number;
  @ApiProperty({ example: 1, description: 'workFormatId' })
  readonly workFormatId: number;
  @ApiProperty({ example: 1, description: 'medCertStatus' })
  readonly medCertStatus: number;
  @ApiProperty({ example: '10000', description: 'salaryAfterProbation' })
  readonly salaryAfterProbation: string;
  @ApiProperty({ example: new Date(), description: 'startDate' })
  readonly startDate: Date;
  @ApiProperty({ example: new Date(), description: 'periodProbation' })
  readonly periodProbation: Date;
}
