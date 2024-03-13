import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface ApplicationCreationAttrs {
  id: number;
  empId: number;
  typeId: number;
  statusId: number;
  headId: number;
}

@Table({ tableName: 'applications' })
export class Application extends Model<Application, ApplicationCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  filename: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  typeId: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  empId: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  headId: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  statusId: number;

  @Column({ type: DataType.INTEGER, allowNull: true })
  formedId: number;

  @Column({ type: DataType.DATE, allowNull: true })
  formedAt: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  approvedAt: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  createdAt: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  updatedAt: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  deletedAt: Date;
}
