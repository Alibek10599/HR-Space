import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface DocumentsCreationAttrs {
  name: string;
}

@Table({ tableName: 'documents' })
export class Document extends Model<Document, DocumentsCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  employee_id: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  doc_type_id: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  document_number: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  authority_id: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  citizen_id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  iin: string;

  @Column({ type: DataType.DATE, allowNull: true })
  date_of_expiry: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  date_of_issue: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  date_of_birth: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  createdAt: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  updatedAt: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  deletedAt: Date;
}
