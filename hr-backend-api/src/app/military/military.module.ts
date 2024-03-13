import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { MilitaryStatus } from './models/military_status.model';
import { MilitaryDocType } from './models/military_doc_type.model';
import { MilitaryCertificate } from './models/military_certificate.model';
import { MilitaryTicket } from './models/military_ticket.model';
import { MilitaryService } from './military.service';
import { MilitaryController } from './military.controller';
import { Employee } from '../employee/models/employee.model';

@Module({
  controllers: [MilitaryController],
  providers: [MilitaryService],
  imports: [
    SequelizeModule.forFeature([
      Employee,
      MilitaryStatus,
      MilitaryDocType,
      MilitaryCertificate,
      MilitaryTicket,
    ]),
  ],
  exports: [MilitaryService],
})
export class MilitaryModule {}
