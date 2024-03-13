import { Body, Controller, Get, Post } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dto/create-document-dto';
import { GrpcMethod } from '@nestjs/microservices';
import {
  ApproveApplicationRequest,
  GenerateToWorkDocumentsRequest,
  GetApplicationRequest,
  HR_SERVICE_NAME,
} from '../grpc/hr.pb';
import { CreateApplicationDto } from './dto/create-application-dto';

@Controller('documents')
export class DocumentsController {
  constructor(private documentService: DocumentsService) {}

  @Get('/get')
  async getDocuments() {
    return await this.documentService.getDocuments();
  }

  @Get('/getDocTypes')
  async getDocTypes() {
    return await this.documentService.getDocTypes();
  }

  @GrpcMethod(HR_SERVICE_NAME, 'GetCountries')
  async getCountries() {
    return await this.documentService.getCountries();
  }

  @Get('/getAuthorities')
  async getAuthorities() {
    return await this.documentService.getAuthorities();
  }

  @Post('/create')
  async createDocument(@Body() dto: CreateDocumentDto) {
    return await this.documentService.createDocument(dto);
  }

  @GrpcMethod(HR_SERVICE_NAME, 'GenerateToWorkDocuments')
  async generateToWorkDocuments(request: GenerateToWorkDocumentsRequest) {
    const dto = new CreateApplicationDto();

    dto.empId = request.employeeId;
    dto.statusId = 0;
    dto.typeId = request.typeId;
    dto.headId = request.headId;

    return await this.documentService.generateToWorkDocuments(
      dto,
      request.employeeId,
      request.positionId,
    );
  }

  @GrpcMethod(HR_SERVICE_NAME, 'GetApplications')
  async getEmployeeApplications(request: GetApplicationRequest) {
    return await this.documentService.getApplicationToWorkDocument(
      request.empId,
    );
  }

  @GrpcMethod(HR_SERVICE_NAME, 'GetApplicationTypes')
  async getApplicationTypes() {
    return await this.documentService.getApplicationTypes();
  }

  @GrpcMethod(HR_SERVICE_NAME, 'GetHeads')
  async getHeads() {
    return await this.documentService.getHeads();
  }

  @GrpcMethod(HR_SERVICE_NAME, 'ApproveApplication')
  async approveApplication(request: ApproveApplicationRequest) {
    return await this.documentService.approveApplication(request.id);
  }
}
