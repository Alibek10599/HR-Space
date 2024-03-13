import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface EmployeeCreationAttrs {
  name: string;
  surname: string;
  second_name: string;
  sex: boolean;
  address: string;
  phone: string;
  marriage_id: number;
  military_id: number;
  status_id: number;
  user_id: number;
  employee_add_id: number;
}

@Table({ tableName: 'employees' })
export class Employee extends Model<Employee, EmployeeCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  surname: string;

  @Column({ type: DataType.STRING, allowNull: false })
  secondName: string;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  sex: boolean;

  @Column({ type: DataType.STRING, allowNull: false })
  address: string;

  @Column({ type: DataType.STRING, allowNull: false })
  phone: string;

  @Column({ type: DataType.DATE, allowNull: false })
  birthday: Date;

  @Column({ type: DataType.INTEGER, allowNull: false })
  citizenshipId: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  marriageId: number;

  @Column({ type: DataType.INTEGER, allowNull: true })
  militaryId: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  statusId: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number;

  @Column({ type: DataType.INTEGER, allowNull: true })
  employeeAddId: number;

  @Column({ type: DataType.DATE, allowNull: true })
  createdAt: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  updatedAt: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  deletedAt: Date;
}
