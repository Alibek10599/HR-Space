import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface JobExperienceCreationAttrs {
  name: string;
}

@Table({ tableName: 'job_experience' })
export class JobExperience extends Model<
  JobExperience,
  JobExperienceCreationAttrs
> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  employee_id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  position: string;

  @Column({ type: DataType.STRING, allowNull: false })
  company: string;

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
