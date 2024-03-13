import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface EmployeeStatusCreationAttrs {
  name: string;
}

@Table({ tableName: 'employee_status' })
export class EmployeeStatus extends Model<
  EmployeeStatus,
  EmployeeStatusCreationAttrs
> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @Column({ type: DataType.DATE, allowNull: true })
  createdAt: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  updatedAt: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  deletedAt: Date;
}
