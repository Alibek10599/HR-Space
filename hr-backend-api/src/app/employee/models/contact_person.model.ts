import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface ContactPersonCreationAttrs {
  name: string;
}

@Table({ tableName: 'contact_person' })
export class ContactPerson extends Model<
  ContactPerson,
  ContactPersonCreationAttrs
> {
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
  phone: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  employee_id: number;

  @Column({ type: DataType.DATE, allowNull: true })
  createdAt: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  updatedAt: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  deletedAt: Date;
}
