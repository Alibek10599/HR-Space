import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface MilitaryStatusCreationAttrs {
  name: string;
}

@Table({ tableName: 'military_status' })
export class MilitaryStatus extends Model<
  MilitaryStatus,
  MilitaryStatusCreationAttrs
> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  military_doc_type_id: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  military_ticket_id: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  military_cert_id: number;

  @Column({ type: DataType.DATE, allowNull: true })
  createdAt: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  updatedAt: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  deletedAt: Date;
}
