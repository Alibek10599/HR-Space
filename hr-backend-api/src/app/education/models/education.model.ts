import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface EducationCreationAttrs {
  name: string;
}

@Table({ tableName: 'education' })
export class Education extends Model<Education, EducationCreationAttrs> {
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
  university_id: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  speciality_id: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  education_status_id: number;

  @Column({ type: DataType.DATE, allowNull: true })
  start_date: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  finish_date: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  createdAt: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  updatedAt: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  deletedAt: Date;
}
