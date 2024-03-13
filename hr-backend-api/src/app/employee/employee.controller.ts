import { Body, Controller, Param, Inject, OnModuleInit } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee-dto';
import { UpdateEmployeeDto } from './dto/update-employee-dto';
import { CreateEmployeeAdditionsDto } from './dto/create-employee-additions-dto';
import { CreateEmployeeStatusesDto } from './dto/create-employee-statuses-dto';
import { CreateEmployeeContactPersonDto } from './dto/create-employee-contact-person-dto';
import { CreateDepartmentDto } from './dto/create-department-dto';
import { CreateMarriageTypeDto } from './dto/create-marriage-type-dto';
import { CreatePositionDto } from './dto/create-position-dto';
import { CreatePositionLvlDto } from './dto/create-position-lvl-dto';
import { GrpcMethod } from '@nestjs/microservices';
import {
  GetEmployeeAdditionRequest,
  GetEmployeeRequest,
  HR_SERVICE_NAME,
} from '../grpc/hr.pb';
import { AuthServiceClient, AUTH_SERVICE_NAME } from '../grpc/auth.pb';
import { ClientGrpc } from '@nestjs/microservices';

@Controller('employee')
export class EmployeeController implements OnModuleInit {
  private svc: AuthServiceClient;

  @Inject(AUTH_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.svc = this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }
  constructor(private employeeService: EmployeeService) {}

  @GrpcMethod(HR_SERVICE_NAME, 'GetEmployees')
  async getEmployees() {
    return await this.employeeService.getEmployees();
  }

  @GrpcMethod(HR_SERVICE_NAME, 'GetEmployee')
  async getEmployee(@Body() dto: GetEmployeeRequest) {
    return await this.employeeService.getEmployee(dto.id);
  }

  @GrpcMethod(HR_SERVICE_NAME, 'CreateEmployee')
  async createEmployee(@Body() dto: CreateEmployeeDto) {
    await this.svc.setPassword({
      userId: dto.userId,
    });
    return await this.employeeService.createEmployee(dto);
  }

  @GrpcMethod(HR_SERVICE_NAME, 'UpdateEmployee')
  async updateEmployee(
    @Body() dto: UpdateEmployeeDto,
    @Param('id') id: number,
  ) {
    return await this.employeeService.updateEmployee(id, dto);
  }

  @GrpcMethod(HR_SERVICE_NAME, 'DeleteEmployee')
  async deleteEmployee(@Param('id') id: number) {
    return await this.employeeService.deleteEmployee(id);
  }

  @GrpcMethod(HR_SERVICE_NAME, 'GetEmployeeAdditions')
  async getEmployeeAdditions(@Body() dto: GetEmployeeAdditionRequest) {
    return await this.employeeService.getEmployeeAdditions(dto.id);
  }

  @GrpcMethod(HR_SERVICE_NAME, 'CreateEmployeeAddition')
  async createEmployeeAdditions(@Body() dto: CreateEmployeeAdditionsDto) {
    return await this.employeeService.createEmployeeAdditions(dto);
  }

  @GrpcMethod(HR_SERVICE_NAME, 'GetEmployeeStatuses')
  async getEmployeeStatuses() {
    return await this.employeeService.getEmployeeStatuses();
  }

  @GrpcMethod(HR_SERVICE_NAME, 'CreateEmployeeStatus')
  async createEmployeeStatus(@Body() dto: CreateEmployeeStatusesDto) {
    return await this.employeeService.createEmployeeStatus(dto);
  }

  @GrpcMethod(HR_SERVICE_NAME, 'GetEmployeeStatus')
  async getEmployeeStatus(@Param('id') employee_id: number) {
    return await this.employeeService.getEmployeeStatus(employee_id);
  }

  @GrpcMethod(HR_SERVICE_NAME, 'GetEmployeeContacts')
  async getEmployeeContacts(@Param('id') employee_id: number) {
    return await this.employeeService.getContactPersons(employee_id);
  }

  @GrpcMethod(HR_SERVICE_NAME, 'CreateEmployeeContact')
  async createEmployeeContact(@Body() dto: CreateEmployeeContactPersonDto) {
    return await this.employeeService.createContactPerson(dto);
  }

  @GrpcMethod(HR_SERVICE_NAME, 'GetEmployeeDepartments')
  async getEmployeeDepartments() {
    return await this.employeeService.getDepartments();
  }

  @GrpcMethod(HR_SERVICE_NAME, 'CreateEmployeeDepartment')
  async createEmployeeDepartment(@Body() dto: CreateDepartmentDto) {
    return await this.employeeService.createDepartment(dto);
  }

  // @GrpcMethod(HR_SERVICE_NAME, 'GetEmployeeDepartment')
  // async getEmployeeDepartment(@Param('id') employee_id: number) {
  //   return await this.employeeService.getEmployeeDepartment(employee_id);
  // }

  @GrpcMethod(HR_SERVICE_NAME, 'GetMaritalTypes')
  async getEmployeeMarriageTypes() {
    return await this.employeeService.getMarriageTypes();
  }

  @GrpcMethod(HR_SERVICE_NAME, 'CreateEmployeeMarriageTypes')
  async createEmployeeMarriageTypes(@Body() dto: CreateMarriageTypeDto) {
    return await this.employeeService.createMarriageType(dto);
  }

  @GrpcMethod(HR_SERVICE_NAME, 'GetEmployeePositions')
  async getEmployeePositions() {
    return await this.employeeService.getPositions();
  }

  @GrpcMethod(HR_SERVICE_NAME, 'CreateEmployeePosition')
  async createEmployeePosition(@Body() dto: CreatePositionDto) {
    return await this.employeeService.createPosition(dto);
  }

  @GrpcMethod(HR_SERVICE_NAME, 'GetPositionLevels')
  async getPositionLevels() {
    return await this.employeeService.getPositionLevels();
  }

  @GrpcMethod(HR_SERVICE_NAME, 'CreatePositionLevel')
  async createPositionLevel(@Body() dto: CreatePositionLvlDto) {
    return await this.employeeService.createPositionLevel(dto);
  }

  @GrpcMethod(HR_SERVICE_NAME, 'GetEmployeeWorkFormats')
  async getEmployeeWorkFormats() {
    return await this.employeeService.getWorkFormats();
  }

  @GrpcMethod(HR_SERVICE_NAME, 'CreateEmployeeWorkFormat')
  async createEmployeeWorkFormat(@Body() dto: CreatePositionLvlDto) {
    return await this.employeeService.createWorkFormat(dto);
  }
}
