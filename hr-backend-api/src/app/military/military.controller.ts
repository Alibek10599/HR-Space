import { Body, Controller, Get, Post } from '@nestjs/common';
import { MilitaryService } from './military.service';
import { CreateMilitaryStatusDto } from './dto/create-military-status-dto';

@Controller('military')
export class MilitaryController {
  constructor(private militaryService: MilitaryService) {}

  @Get('/get/certificates')
  async getMilitaryCertificates() {
    return this.militaryService.getMilitaryCertificates();
  }

  @Get('/get/doc_types')
  async getMilitaryDocTypes() {
    return this.militaryService.getMilitaryDocTypes();
  }

  @Get('/get/tickets')
  async getMilitaryTickets() {
    return this.militaryService.getMilitaryTickets();
  }

  @Get('/get/statuses')
  async getMilitaryStatuses() {
    return this.militaryService.getMilitaryStatuses();
  }

  @Post('/create/status')
  async createMilitaryStatus(@Body() dto: CreateMilitaryStatusDto) {
    return this.militaryService.createMilitaryStatus(dto);
  }
}
