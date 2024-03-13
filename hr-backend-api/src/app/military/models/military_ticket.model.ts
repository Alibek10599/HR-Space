import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface MilitaryTicketCreationAttrs {
  name: string;
}

@Table({ tableName: 'military_ticket' })
export class MilitaryTicket extends Model<
  MilitaryTicket,
  MilitaryTicketCreationAttrs
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
