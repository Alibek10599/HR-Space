export class CreateDocumentDto {
  employee_id: number;
  doc_type_id: number;
  document_number: string;
  authority_id: number;
  citizen_id: number;
  iin: number;
  date_of_expiry: Date;
  date_of_issue: Date;
  date_of_birth: Date;
}
