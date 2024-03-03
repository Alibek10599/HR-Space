import {
  Body,
  Controller,
  Get,
  Headers,
  Inject,
  OnModuleInit,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import {
  ApproveApplicationResponse,
  CreateApplicationResponse,
  CreateEmployeeAdditionResponse,
  CreateEmployeeResponse,
  FormateApplicationResponse,
  GenerateToWorkDocumentsResponse,
  GetApplicationResponse,
  GetApplicationsResponse,
  GetApplicationTypesResponse,
  GetCountriesResponse,
  GetEmployeeAdditionsResponse,
  GetEmployeeResponse,
  GetEmployeesResponse,
  GetHeadsResponse,
  GetMaritalTypesResponse,
} from 'src/grpc/hr.pb';
import { HR_SERVICE_NAME, HrServiceClient } from '../grpc/hr.pb';
import { IncomingHttpHeaders } from 'http2';
import { createGrpcMetadata } from '../core/utils/metadata.util';
import { CreateEmployeeDto } from './dto/create-employee-dto';
import { CreateEmployeeAdditionsDto } from './dto/create-employee-additions-dto';
import { CreateApplicationDto } from './dto/create-application-dto';
import { ApproveApplicationDto } from './dto/approve-application-dto';
import { FormateApplicationDto } from './dto/formate-application-dto';

@ApiTags('HR')
@Controller('hr')
export class HrController implements OnModuleInit {
  private svc: HrServiceClient;

  @Inject(HR_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.svc = this.client.getService<HrServiceClient>(HR_SERVICE_NAME);
  }

  @Get('/employee/get/:id')
  private async getEmployee(
    @Param('id') id: number,
  ): Promise<Observable<GetEmployeeResponse>> {
    return this.svc.getEmployee({ id: id });
  }

  @ApiOperation({ summary: 'Список юзеров' })
  @Get('/employee/get-all')
  // @ApiBearerAuth('JWT-auth')
  private async getEmployees(): Promise<Observable<GetEmployeesResponse>> {
    return this.svc.getEmployees({});
  }

  @ApiOperation({ summary: 'Создание юзера' })
  @ApiBody({ type: CreateEmployeeDto })
  @Post('/employee/create')
  // @ApiBearerAuth('JWT-auth')
  private async createEmployee(
    @Body() dto: CreateEmployeeDto,
    @Headers() headers: IncomingHttpHeaders,
  ): Promise<Observable<CreateEmployeeResponse>> {
    return this.svc.createEmployee(dto, createGrpcMetadata(headers));
  }

  @ApiOperation({ summary: 'Заполнение доп инфы' })
  @ApiBody({ type: CreateEmployeeAdditionsDto })
  @Post('/employee/additional/create')
  private async createEmployeeAdditions(
    @Body() dto: CreateEmployeeAdditionsDto,
    @Headers() headers: IncomingHttpHeaders,
  ): Promise<Observable<CreateEmployeeAdditionResponse>> {
    return this.svc.createEmployeeAddition(dto, createGrpcMetadata(headers));
  }

  @ApiOperation({ summary: 'Получение доп инфы' })
  @Get('/employee/additional/get/:id')
  private async getEmployeeAdditions(
    @Param('id') id: number,
  ): Promise<Observable<GetEmployeeAdditionsResponse>> {
    return this.svc.getEmployeeAdditions({ id: id });
  }

  @ApiOperation({ summary: 'Получение списка типов женитьбы' })
  @Get('/employee/get-marital-types')
  private async getMaritalTypes(): Promise<
    Observable<GetMaritalTypesResponse>
  > {
    return this.svc.getMaritalTypes({});
  }

  @ApiOperation({ summary: 'Получение списка стран' })
  @Get('/employee/get-countries')
  private async getCountries(): Promise<Observable<GetCountriesResponse>> {
    return this.svc.getCountries({});
  }

  @ApiOperation({ summary: 'Генерация заявления на принятие на работу' })
  @Post('/documents/generate-employment-agreement')
  private async generateEmploymentAgreement(
    @Body() dto: CreateApplicationDto,
  ): Promise<Observable<GenerateToWorkDocumentsResponse>> {
    return this.svc.generateToWorkDocuments(dto);
  }

  @ApiOperation({ summary: 'Получение списка типов заявления' })
  @Get('/documents/get-application-types')
  private async getApplicationTypes(): Promise<
    Observable<GetApplicationTypesResponse>
  > {
    return this.svc.getApplicationTypes({});
  }

  @ApiOperation({ summary: 'Получение списка главных на согласование' })
  @Get('/documents/get-main-approver')
  private async getMainApprover(): Promise<Observable<GetHeadsResponse>> {
    return this.svc.getHeads({});
  }

  @ApiOperation({ summary: 'Получение списка заявлений по юзеру' })
  @Get('/documents/get-applications/:employeeId')
  private async getApplications(
    @Param('employeeId') employeeId: number,
  ): Promise<Observable<GetApplicationsResponse>> {
    return this.svc.getApplications({ empId: employeeId });
  }

  @ApiOperation({ summary: 'Одобрить заявление' })
  @Patch('/documents/approve-application')
  private async approveApplication(
    @Body() dto: ApproveApplicationDto,
  ): Promise<Observable<ApproveApplicationResponse>> {
    return this.svc.approveApplication(dto);
  }

  @ApiOperation({ summary: 'Сформировать заявление' })
  @Post('/documents/formate-application')
  private async formateApplication(
    @Body() dto: FormateApplicationDto,
  ): Promise<Observable<FormateApplicationResponse>> {
    return this.svc.formateApplication(dto);
  }
}
