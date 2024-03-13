import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EducationService } from './education.service';
import { CreateEducationDto } from './dto/create-education-dto';

@Controller('education')
export class EducationController {
  constructor(private educationService: EducationService) {}

  @Get('/get')
  async getEducation() {
    return this.educationService.getEducations();
  }

  @Get('/get-statuses')
  async getEducationStatuses() {
    return this.educationService.getEducationStatuses();
  }

  @Get('/get-specialities')
  async getSpecialities() {
    return this.educationService.getSpecialities();
  }

  @Get('/get-universities')
  async getUniversities() {
    return this.educationService.getUniversities();
  }

  @Get('/get-by-id/:id')
  async getEducationById(@Param('id') id: number) {
    return this.educationService.getEducationById(id);
  }

  @Post('/create')
  async createEducation(@Body() dto: CreateEducationDto) {
    return this.educationService.createEducation(dto);
  }
}
