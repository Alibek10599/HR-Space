import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface EmployeeAdditionCreationAttrs {
  name: string;
}

@Table({ tableName: 'employees_addition' })
export class EmployeeAddition extends Model<
  EmployeeAddition,
  EmployeeAdditionCreationAttrs
> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  departmentId: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  positionId: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  levelId: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  headId: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  contractId: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  workFormatId: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  medCertStatus: number;

  @Column({ type: DataType.STRING, allowNull: true })
  salaryBeforeProbation: string;

  @Column({ type: DataType.STRING, allowNull: true })
  salaryAfterProbation: string;

  @Column({ type: DataType.DATE, allowNull: true })
  startDate: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  periodProbation: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  createdAt: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  updatedAt: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  deletedAt: Date;
}
