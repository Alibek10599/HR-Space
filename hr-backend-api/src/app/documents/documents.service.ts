import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Document } from './models/documents.model';
import { Country } from './models/countries.model';
import { Authority } from './models/authorities.model';
import { CreateDocumentDto } from './dto/create-document-dto';
import { DocTypes } from './models/doc_type.model';
import {
  fileGeneratorHelper,
  updateFileHelper,
} from '../helpers/file-generator';
import { Employee } from '../employee/models/employee.model';
import { Position } from '../employee/models/position.model';
import moment from 'moment';
import { Heads } from './models/heads.model';
import { ApplicationTypes } from './models/application-types.model';
import { Application } from './models/applications.model';
import { CreateApplicationDto } from './dto/create-application-dto';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectModel(Employee) private employeeRepository: typeof Employee,
    @InjectModel(Position) private positionRepository: typeof Position,
    @InjectModel(Application) private applicationRepository: typeof Application,
    @InjectModel(Document) private documentRepository: typeof Document,
    @InjectModel(Heads) private headsRepository: typeof Heads,
    @InjectModel(ApplicationTypes)
    private applicationTypesRepository: typeof ApplicationTypes,
    @InjectModel(DocTypes)
    private documentTypeRepository: typeof DocTypes,
    @InjectModel(Country) private countryRepository: typeof Country,
    @InjectModel(Authority) private authorityRepository: typeof Authority,
  ) {}

  async createDocument(dto: CreateDocumentDto) {
    return await this.documentRepository.create(dto);
  }
  async getDocuments() {
    return await this.documentRepository.findAll();
  }
  async getDocTypes() {
    return await this.documentTypeRepository.findAll();
  }

  async getCountries() {
    return { countries: await this.countryRepository.findAll() };
  }

  async getAuthorities() {
    return await this.authorityRepository.findAll();
  }

  async getApplicationToWorkDocument(employeeId: number) {
    const applications = await this.applicationRepository.findAll({
      where: { empId: employeeId },
    });
    return {
      applications: applications,
    };
  }

  async getApplicationTypes() {
    return {
      applicationTypes: await this.applicationTypesRepository.findAll(),
    };
  }

  async getHeads() {
    return {
      heads: await this.headsRepository.findAll(),
    };
  }

  async createApplication(dto: CreateApplicationDto) {
    let result = {};
    try {
      result = await this.applicationRepository.create(dto);
    } catch (e) {
      console.log(e);
    }
    if (result) {
      return { message: 'Application created!' };
    }
  }

  async generateToWorkDocuments(
    dto: CreateApplicationDto,
    employeeId: number,
    positionId: number,
  ) {
    const employee = await this.employeeRepository.findByPk(employeeId);
    if (!employee) {
      return { message: 'Employee not found' };
    }

    const applicationSampleName = 'application-to-work.docx';
    const orderSampleName = 'order-to-work.docx';
    const currDate = new Date();
    const position = await this.positionRepository.findByPk(positionId);
    const employeeFio =
      employee.name + ' ' + employee.surname + ' ' + employee.secondName;

    const applicationDocumentName = `${applicationSampleName}_${
      employee.surname
    }_${currDate.toLocaleDateString()}.docx`;

    const orderDocumentName = `${orderSampleName}_${
      employee.surname
    }_${currDate.toLocaleDateString()}.docx`;

    dto.filename = applicationDocumentName;

    const applicationData = {
      fio: employeeFio,
      position: position.title,
      date: moment().locale('ru-RU').format('LL'),
      approvefio: '{approvefio}',
      approvedate: '{approvedate}',
    };

    const orderData = {
      ls: 34 + (await this.applicationRepository.count()),
      fio: employeeFio,
      shortFio: employee.surname + ' ' + employee.name[0] + '.',
      day: currDate.getDay(),
      month: moment().locale('ru-RU').format('LL').split(' ')[1],
      year: currDate.getFullYear(),
      date: moment().locale('ru-RU').format('LL'),
      position: position.title,
    };

    try {
      await fileGeneratorHelper(
        applicationSampleName,
        applicationDocumentName,
        applicationData,
      );
      await fileGeneratorHelper(orderSampleName, orderDocumentName, orderData);
      await this.createApplication(dto);
    } catch (e) {
      console.log(e);
    }

    return { message: 'Documents generated!' };
  }

  async approveApplication(applicationId: number) {
    const application = await this.applicationRepository.findByPk(
      applicationId,
    );
    if (!application) {
      return { message: 'Application not found' };
    }
    const approvedEmployee = await this.employeeRepository.findByPk(
      application.headId,
    );
    const approvedFio =
      approvedEmployee.surname +
      ' ' +
      approvedEmployee.name[0] +
      '. ' +
      approvedEmployee.secondName[0] +
      '.';

    const data = {
      approvefio: approvedFio,
      approvedate: new Date().toLocaleDateString(),
    };
    await updateFileHelper(application.filename, data);

    application.statusId = 1;
    application.approvedAt = new Date();
    await application.save();
    return { message: 'Application approved!' };
  }
}
