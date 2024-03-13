import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Employee } from '../employee/models/employee.model';
import { MilitaryCertificate } from './models/military_certificate.model';
import { MilitaryDocType } from './models/military_doc_type.model';
import { MilitaryStatus } from './models/military_status.model';
import { MilitaryTicket } from './models/military_ticket.model';
import { CreateMilitaryStatusDto } from './dto/create-military-status-dto';

@Injectable()
export class MilitaryService {
  constructor(
    @InjectModel(Employee)
    private employeeRepository: typeof Employee,

    @InjectModel(MilitaryCertificate)
    private militaryCertificateRepository: typeof MilitaryCertificate,

    @InjectModel(MilitaryDocType)
    private militaryDocTypeRepository: typeof MilitaryDocType,

    @InjectModel(MilitaryStatus)
    private militaryStatusRepository: typeof MilitaryStatus,

    @InjectModel(MilitaryTicket)
    private militaryTicketRepository: typeof MilitaryTicket,
  ) {}

  async getMilitaryCertificates() {
    return this.militaryCertificateRepository.findAll();
  }

  async getMilitaryDocTypes() {
    return this.militaryDocTypeRepository.findAll();
  }

  async getMilitaryTickets() {
    return this.militaryTicketRepository.findAll();
  }

  async getMilitaryStatuses() {
    return this.militaryStatusRepository.findAll();
  }

  async createMilitaryStatus(dto: CreateMilitaryStatusDto) {
    return this.militaryStatusRepository.create(dto);
  }
}
