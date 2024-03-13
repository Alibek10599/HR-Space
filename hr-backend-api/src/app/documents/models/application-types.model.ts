import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface ApplicationTypesCreationAttrs {
  id: number;
  title: string;
  order: boolean;
}

@Table({ tableName: 'application-types' })
export class ApplicationTypes extends Model<
  ApplicationTypes,
  ApplicationTypesCreationAttrs
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

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: false })
  order: boolean;

  @Column({ type: DataType.DATE, allowNull: true })
  createdAt: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  updatedAt: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  deletedAt: Date;
}
