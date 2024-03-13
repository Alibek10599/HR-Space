import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Education } from './models/education.model';
import { EducationStatus } from './models/education_status.model';
import { Speciality } from './models/specialities.model';
import { University } from './models/universities.model';
import { EducationService } from './education.service';
import { EducationController } from './education.controller';

@Module({
  controllers: [EducationController],
  providers: [EducationService],
  imports: [
    SequelizeModule.forFeature([
      Education,
      EducationStatus,
      Speciality,
      University,
    ]),
  ],
  exports: [EducationService],
})
export class EducationModule {}
