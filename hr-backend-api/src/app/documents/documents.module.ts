import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Authority } from './models/authorities.model';
import { Country } from './models/countries.model';
import { DocTypes } from './models/doc_type.model';
import { Document } from './models/documents.model';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';
import { Employee } from '../employee/models/employee.model';
import { Position } from '../employee/models/position.model';
import { Application } from './models/applications.model';
import { ApplicationStatus } from './models/application-status.model';
import { ApplicationTypes } from './models/application-types.model';
import { Heads } from './models/heads.model';

@Module({
  controllers: [DocumentsController],
  providers: [DocumentsService],
  imports: [
    SequelizeModule.forFeature([
      Employee,
      Position,
      Authority,
      Country,
      DocTypes,
      Document,
      Application,
      ApplicationStatus,
      ApplicationTypes,
      Heads,
    ]),
  ],
  exports: [DocumentsService],
})
export class DocumentsModule {}
