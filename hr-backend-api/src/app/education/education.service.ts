import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Education } from './models/education.model';
import { EducationStatus } from './models/education_status.model';
import { Speciality } from './models/specialities.model';
import { University } from './models/universities.model';
import { CreateEducationDto } from './dto/create-education-dto';

@Injectable()
export class EducationService {
  constructor(
    @InjectModel(Education) private educationRepository: typeof Education,
    @InjectModel(EducationStatus)
    private educationStatusRepository: typeof EducationStatus,
    @InjectModel(Speciality) private specialityRepository: typeof Speciality,
    @InjectModel(University) private universityRepository: typeof University,
  ) {}

  async getEducations() {
    return this.educationRepository.findAll();
  }

  async createEducation(dto: CreateEducationDto) {
    return this.educationRepository.create(dto);
  }

  async getEducationStatuses() {
    return this.educationStatusRepository.findAll();
  }

  async getEducationById(id: number) {
    return this.educationRepository.findByPk(id);
  }

  async getSpecialities() {
    return this.specialityRepository.findAll();
  }

  async getUniversities() {
    return this.universityRepository.findAll();
  }
}
