import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Employee } from './models/employee.model';
import { CreateEmployeeDto } from './dto/create-employee-dto';
import { UpdateEmployeeDto } from './dto/update-employee-dto';
import { ContactPerson } from './models/contact_person.model';
import { Department } from './models/department.model';
import { EmployeeAddition } from './models/employee_addition.model';
import { EmployeeStatus } from './models/employee_status.model';
import { JobExperience } from './models/job_experience.model';
import { MarriageType } from './models/mariage_type.model';
import { Position } from './models/position.model';
import { PositionLvl } from './models/position_level.model';
import { WorkFormat } from './models/work_format.model';
import { CreateEmployeeAdditionsDto } from './dto/create-employee-additions-dto';
import { UpdateEmployeeAdditionsDto } from './dto/update-employee-additions-dto';
import { CreateEmployeeStatusesDto } from './dto/create-employee-statuses-dto';
import { CreateEmployeeContactPersonDto } from './dto/create-employee-contact-person-dto';
import { CreateDepartmentDto } from './dto/create-department-dto';
import { CreateEmployeeJobExperienceDto } from './dto/create-employee-job-experience-dto';
import { CreateMarriageTypeDto } from './dto/create-marriage-type-dto';
import { CreatePositionDto } from './dto/create-position-dto';
import { CreatePositionLvlDto } from './dto/create-position-lvl-dto';
import { CreateWorkFormatDto } from './dto/create-work-format-dto';
import {
  GetEmployeeAdditionResponse,
  GetEmployeeAdditionsResponse,
  GetEmployeesResponse,
  GetMaritalTypesResponse,
} from '../grpc/hr.pb';
import { EmployeeDto } from './dto/employee-dto';
import { MarriageTypesDto } from './dto/marriage-types-dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee) private employeeRepository: typeof Employee,

    @InjectModel(ContactPerson)
    private contactPersonRepository: typeof ContactPerson,

    @InjectModel(Department) private departmentRepository: typeof Department,

    @InjectModel(EmployeeAddition)
    private employeeAdditionRepository: typeof EmployeeAddition,

    @InjectModel(EmployeeStatus)
    private employeeStatusRepository: typeof EmployeeStatus,

    @InjectModel(JobExperience)
    private jobExperienceRepository: typeof JobExperience,

    @InjectModel(MarriageType)
    private marriageTypeRepository: typeof MarriageType,

    @InjectModel(Position) private positionRepository: typeof Position,

    @InjectModel(PositionLvl) private positionLvlRepository: typeof PositionLvl,

    @InjectModel(WorkFormat) private workFormatRepository: typeof WorkFormat,
  ) {}
  //TODO поставить проверки валидации, убрать try catch и сделать обработку ошибок через фильтр
  //TODO так же сделать где надо через релейшины, а то как то по колхозному

  // CRUD employee
  async getEmployees(): Promise<GetEmployeesResponse> {
    const employees = await this.employeeRepository.findAll();
    const employeeList = [];
    employees.map((employee) => {
      const employeeDto = new EmployeeDto();
      employeeDto.id = employee.id;
      employeeDto.name = employee.name;
      employeeDto.surname = employee.surname;
      employeeDto.secondName = employee.secondName;
      employeeDto.phone = employee.phone;
      employeeDto.citizenshipId = employee.citizenshipId;
      employeeDto.birthday = employee.birthday;
      employeeDto.address = employee.address;
      employeeDto.sex = employee.sex;
      employeeDto.marriageId = employee.marriageId;
      employeeDto.militaryId = employee.militaryId;
      employeeDto.statusId = employee.statusId;
      employeeDto.userId = employee.userId;
      employeeDto.employeeAddId = employee.employeeAddId;
      employeeList.push(employeeDto);
    });
    return { employees: employeeList };
  }

  async createEmployee(dto: CreateEmployeeDto) {
    const employee = await this.employeeRepository.create(dto);
    return { employee: employee };
  }

  async getEmployee(id: number) {
    return await this.employeeRepository.findByPk(id);
  }

  async updateEmployee(id: number, dto: UpdateEmployeeDto) {
    const employee = await this.employeeRepository.findByPk(id);
    try {
      return await employee.update(dto);
    } catch (e) {
      return e;
    }
  }

  async deleteEmployee(id: number) {
    const employee = await this.employeeRepository.findByPk(id);
    try {
      employee.deletedAt = new Date();
      await employee.save();
      return {
        message: 'Employee deleted',
      };
    } catch (e) {
      return e;
    }
  }

  //CRUD employee_additional_info
  async getEmployeeAdditions(
    employee_id: number,
  ): Promise<GetEmployeeAdditionsResponse> {
    const employee = await this.employeeRepository.findByPk(employee_id);

    const employeeAddition = await this.employeeAdditionRepository.findAll({
      where: {
        id: employee.employeeAddId,
      },
    });
    return { employeeAdditions: employeeAddition };
  }

  async createEmployeeAdditions(dto: CreateEmployeeAdditionsDto) {
    const employeeAddition = await this.employeeAdditionRepository.create(dto);
    return { employeeAddition: employeeAddition };
  }

  // async updateEmployeeAdditions(id: number, dto: UpdateEmployeeAdditionsDto) {
  //   const employeeAddInfo = await this.employeeAdditionRepository.findByPk(id);
  //   try {
  //     return await employeeAddInfo.update(dto);
  //   } catch (e) {
  //     return e;
  //   }
  // }

  //CRUD employee_status
  async getEmployeeStatuses() {
    return await this.employeeStatusRepository.findAll();
  }

  async getEmployeeStatus(user_id: number) {
    const employee = await this.employeeRepository.findByPk(user_id);
    return await this.employeeStatusRepository.findByPk(employee.statusId);
  }

  async createEmployeeStatus(dto: CreateEmployeeStatusesDto) {
    try {
      return await this.employeeStatusRepository.create(dto);
    } catch (e) {
      return e;
    }
  }

  //CRUD contact_person
  async getContactPersons(employee_id: number) {
    return await this.contactPersonRepository.findAll({
      where: {
        employee_id: employee_id,
      },
    });
  }

  async createContactPerson(dto: CreateEmployeeContactPersonDto) {
    try {
      return await this.contactPersonRepository.create(dto);
    } catch (e) {
      return e;
    }
  }

  //CRUD department
  // async getEmployeeDepartment(employee_id: number) {
  //   const employee = await this.employeeRepository.findByPk(employee_id);
  //   const employeeAddInfo = await this.employeeAdditionRepository.findByPk(
  //     employee.employeeAddId,
  //   );
  //   return await this.departmentRepository.findAll({
  //     where: {
  //       id: employeeAddInfo.department_id,
  //     },
  //   });
  // }

  async getDepartments() {
    return await this.departmentRepository.findAll();
  }

  async createDepartment(dto: CreateDepartmentDto) {
    try {
      return await this.departmentRepository.create(dto);
    } catch (e) {
      return e;
    }
  }

  //CRUD job_experience
  async getEmployeeJobExperiences(employee_id: number) {
    const employee = await this.employeeRepository.findByPk(employee_id);
    return await this.jobExperienceRepository.findAll({
      where: {
        employee_id: employee.id,
      },
    });
  }

  async createJobExperience(dto: CreateEmployeeJobExperienceDto) {
    try {
      return await this.jobExperienceRepository.create(dto);
    } catch (e) {
      return e;
    }
  }

  //CRUD marriage_type
  async getMarriageTypes(): Promise<GetMaritalTypesResponse> {
    const maritalTypes = [];
    const maritalType = await this.marriageTypeRepository.findAll();
    maritalType.map((marital) => {
      const maritalDto = new MarriageTypesDto();
      maritalDto.id = marital.id;
      maritalDto.title = marital.title;
      maritalTypes.push(maritalDto);
    });
    return { maritalTypes: maritalTypes };
  }

  async createMarriageType(dto: CreateMarriageTypeDto) {
    try {
      return await this.marriageTypeRepository.create(dto);
    } catch (e) {
      return e;
    }
  }

  //CRUD position
  async getPositions() {
    return await this.positionRepository.findAll();
  }

  async createPosition(dto: CreatePositionDto) {
    try {
      return await this.positionRepository.create(dto);
    } catch (e) {
      return e;
    }
  }

  //CRUD position_level
  async getPositionLevels() {
    return await this.positionLvlRepository.findAll();
  }

  async createPositionLevel(dto: CreatePositionLvlDto) {
    try {
      return await this.positionLvlRepository.create(dto);
    } catch (e) {
      return e;
    }
  }

  //CRUD work_format
  async getWorkFormats() {
    return await this.workFormatRepository.findAll();
  }

  async createWorkFormat(dto: CreateWorkFormatDto) {
    try {
      return await this.workFormatRepository.create(dto);
    } catch (e) {
      return e;
    }
  }
}
