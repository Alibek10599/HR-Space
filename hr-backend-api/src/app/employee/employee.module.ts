import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Employee } from './models/employee.model';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { EmployeeStatus } from './models/employee_status.model';
import { EmployeeAddition } from './models/employee_addition.model';
import { MarriageType } from './models/mariage_type.model';
import { Position } from './models/position.model';
import { PositionLvl } from './models/position_level.model';
import { JobExperience } from './models/job_experience.model';
import { Department } from './models/department.model';
import { ContactPerson } from './models/contact_person.model';
import { WorkFormat } from './models/work_format.model';
import { AuthService } from '../auth/auth.service';

@Module({
  controllers: [EmployeeController],
  providers: [EmployeeService, AuthService],
  imports: [
    SequelizeModule.forFeature([
      Employee,
      EmployeeAddition,
      EmployeeStatus,
      MarriageType,
      Position,
      PositionLvl,
      JobExperience,
      Department,
      ContactPerson,
      WorkFormat,
    ]),
  ],
  exports: [EmployeeService, AuthService],
})
export class EmployeeModule {}
