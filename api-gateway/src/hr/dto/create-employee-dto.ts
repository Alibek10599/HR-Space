import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployeeDto {
  @ApiProperty({ example: 'Davlat', description: 'name' })
  readonly name: string;
  @ApiProperty({ example: 'Ushurbakiyev', description: 'surname' })
  readonly surname: string;
  @ApiProperty({ example: 'Alimajanovich', description: 'secondName' })
  readonly secondName: string;
  @ApiProperty({ example: 1, description: 'male' })
  readonly sex: boolean;
  @ApiProperty({ example: 'almaty 1 a', description: 'address' })
  readonly address: string;
  @ApiProperty({ example: '87477777777', description: 'phone' })
  readonly phone: string;
  @ApiProperty({ example: 1, description: 'citizenshipId' })
  readonly citizenshipId: number;
  @ApiProperty({ example: '2023-03-27 13:19:13', description: 'birthday' })
  readonly birthday: Date;
  @ApiProperty({ example: 1, description: 'marriageId' })
  readonly marriageId: number;
  @ApiProperty({ example: null, description: 'militaryId' })
  readonly militaryId: number;
  @ApiProperty({ example: 1, description: 'statusId' })
  readonly statusId: number;
  @ApiProperty({ example: 1, description: 'userId' })
  readonly userId: number;
  @ApiProperty({ example: null, description: 'employeeAddId' })
  readonly employeeAddId: number;
}
