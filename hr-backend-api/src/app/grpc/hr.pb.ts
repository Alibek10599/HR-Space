/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { Empty } from './google/protobuf/empty.pb';
import exp from 'constants';

export const protobufPackage = 'hr';

export interface GetEmployeeRequest {
  id: number;
}

export interface GetEmployeeResponse {
  id: number;
  name: string;
  surname: string;
  secondName: string;
  sex: boolean;
  address: string;
  phone: string;
  citizenshipId: number;
  birthday: Date;
  marriageId: number;
  militaryId: number;
  statusId: number;
  userId: number;
  employeeAddId: number;
}

export interface GetEmployeesResponse {
  employees: GetEmployeeResponse[];
}

export interface CreateEmployeeRequest {
  name: string;
  surname: string;
  secondName: string;
  sex: boolean;
  address: string;
  phone: string;
  citizenshipId: number;
  birthday: Date;
  marriageId: number;
  militaryId: null | number;
  statusId: number;
  userId: number;
  employeeAddId: null | number;
}

export interface CreateEmployeeResponse {
  employee: GetEmployeeResponse;
}

export interface GetEmployeeAdditionRequest {
  id: number;
}

export interface GetEmployeeAdditionResponse {
  id: number;
  departmentId: number;
  positionId: number;
  levelId: number;
  headId: number;
  contractId: number;
  workFormatId: number;
  medCertStatus: number;
  salaryAfterProbation: string;
  startDate: Date;
  periodProbation: Date;
}
export interface GetEmployeeAdditionsResponse {
  employeeAdditions: GetEmployeeAdditionResponse[];
}

export interface CreateEmployeeAdditionRequest {
  departmentId: number;
  positionId: number;
  levelId: number;
  headId: number;
  contractId: number;
  workFormatId: number;
  medCertStatus: number;
  salaryAfterProbation: string;
  startDate: Date;
  periodProbation: Date;
}

export interface CreateEmployeeAdditionResponse {
  employeeAddition: GetEmployeeAdditionResponse;
}

export interface GetMaritalTypeResponse {
  id: number;
  title: string;
}

export interface GetMaritalTypesResponse {
  maritalTypes: GetMaritalTypeResponse[];
}

export interface GetCountryResponse {
  id: number;
  title: string;
}

export interface GetCountriesResponse {
  countries: GetCountryResponse[];
}

export interface GenerateToWorkDocumentsRequest {
  employeeId: number;
  positionId: number;
  headId: number;
  typeId: number;
}
export interface GenerateToWorkDocumentsResponse {
  message: string;
}

export interface GetApplicationRequest {
  empId: number;
}

export interface GetApplicationResponse {
  id: number;
  typeId: number;
  empId: number;
  headId: number;
  statusId: number;
  formedId: number;
  formedAt: string;
  approvedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetApplicationsResponse {
  applications: GetApplicationResponse[];
}

export interface CreateApplicationRequest {
  typeId: number;
  empId: number;
  headId: number;
  statusId: number;
}

export interface CreateApplicationResponse {
  message: string;
}

export interface GetApplicationTypeResponse {
  id: number;
  title: string;
  order: boolean;
}

export interface GetApplicationTypesResponse {
  applicationTypes: GetApplicationTypeResponse[];
}

export interface GetHeadResponse {
  id: number;
  empId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: null | string;
}

export interface GetHeadsResponse {
  heads: GetHeadResponse[];
}

export interface ApproveApplicationRequest {
  id: number;
}

export interface ApproveApplicationResponse {
  message: string;
}

export const HR_PACKAGE_NAME = 'hr';

export interface HrServiceClient {
  getEmployee(request: GetEmployeeRequest): Observable<GetEmployeeResponse>;

  getEmployees(request: Empty): Observable<GetEmployeesResponse>;

  createEmployee(
    request: CreateEmployeeRequest,
    rest: any,
  ): Observable<CreateEmployeeResponse>;

  getEmployeeAdditions(
    request: GetEmployeeAdditionRequest,
  ): Observable<GetEmployeeAdditionsResponse>;

  createEmployeeAddition(
    request: CreateEmployeeAdditionRequest,
    rest: any,
  ): Observable<CreateEmployeeAdditionResponse>;

  getMaritalTypes(request: Empty): Observable<GetMaritalTypesResponse>;
  getCountries(request: Empty): Observable<GetCountriesResponse>;

  generateToWorkDocuments(
    request: GenerateToWorkDocumentsRequest,
  ): Observable<GenerateToWorkDocumentsResponse>;

  getApplication(
    request: GetApplicationRequest,
  ): Observable<GetApplicationResponse>;
  getApplications(
    request: GetApplicationRequest,
  ): Observable<GetApplicationsResponse>;
  createApplication(
    request: CreateApplicationRequest,
  ): Observable<CreateApplicationResponse>;
  getApplicationTypes(request: Empty): Observable<GetApplicationTypesResponse>;
  getHeads(request: Empty): Observable<GetHeadsResponse>;
  approveApplication(
    request: ApproveApplicationRequest,
  ): Observable<ApproveApplicationResponse>;
}

export interface HrServiceController {
  getEmployee(
    request: GetEmployeeRequest,
  ):
    | Promise<GetEmployeeResponse>
    | Observable<GetEmployeeResponse>
    | GetEmployeeResponse;

  getEmployees(
    request: Empty,
  ):
    | Promise<GetEmployeesResponse>
    | Observable<GetEmployeesResponse>
    | GetEmployeesResponse;

  createEmployee(
    request: CreateEmployeeRequest,
  ):
    | Promise<CreateEmployeeResponse>
    | Observable<CreateEmployeeResponse>
    | CreateEmployeeResponse;

  getEmployeeAdditions(
    request: GetEmployeeAdditionRequest,
  ):
    | Promise<GetEmployeeAdditionsResponse>
    | Observable<GetEmployeeAdditionsResponse>
    | GetEmployeeAdditionsResponse;

  createEmployeeAddition(
    request: CreateEmployeeAdditionRequest,
  ):
    | Promise<CreateEmployeeAdditionResponse>
    | Observable<CreateEmployeeAdditionResponse>
    | CreateEmployeeAdditionResponse;

  getMaritalTypes(
    request: Empty,
  ):
    | Promise<GetMaritalTypesResponse>
    | Observable<GetMaritalTypesResponse>
    | GetMaritalTypesResponse;

  getCountries(
    request: Empty,
  ):
    | Promise<GetCountriesResponse>
    | Observable<GetCountriesResponse>
    | GetCountriesResponse;

  generateToWorkDocuments(
    request: GenerateToWorkDocumentsRequest,
  ):
    | Promise<GenerateToWorkDocumentsResponse>
    | Observable<GenerateToWorkDocumentsResponse>
    | GenerateToWorkDocumentsResponse;

  getApplication(
    request: GetApplicationRequest,
  ):
    | Promise<GetApplicationResponse>
    | Observable<GetApplicationResponse>
    | GetApplicationResponse;

  getApplications(
    request: Empty,
  ):
    | Promise<GetApplicationsResponse>
    | Observable<GetApplicationsResponse>
    | GetApplicationsResponse;

  getApplicationTypes(
    request: Empty,
  ):
    | Promise<GetApplicationTypesResponse>
    | Observable<GetApplicationTypesResponse>
    | GetApplicationTypesResponse;

  getHeads(
    request: Empty,
  ):
    | Promise<GetHeadsResponse>
    | Observable<GetHeadsResponse>
    | GetHeadsResponse;

  approveApplication(
    request: ApproveApplicationRequest,
  ):
    | Promise<ApproveApplicationResponse>
    | Observable<ApproveApplicationResponse>
    | ApproveApplicationResponse;
}

export function HrServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'getEmployee',
      'getEmployees',
      'createEmployee',
      'getEmployeeAdditions',
      'createEmployeeAddition',
      'getMaritalTypes',
      'getCountries',
      'generateToWorkDocuments',
      'getApplication',
      'getApplications',
      'getApplicationTypes',
      'getHeads',
      'approveApplication',
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('HrService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcStreamMethod('HrService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const HR_SERVICE_NAME = 'HrService';
