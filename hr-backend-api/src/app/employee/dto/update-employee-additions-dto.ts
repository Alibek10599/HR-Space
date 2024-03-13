export class UpdateEmployeeAdditionsDto {
  readonly department_id: number;
  readonly position_id: number;
  readonly level_id: number;
  readonly head_id: number;
  readonly contract_id: number;
  readonly work_format_id: number;
  readonly med_cert_status: number;
  readonly salary_after_probation: string;
  readonly start_date: Date;
  readonly period_probation: Date;
}
