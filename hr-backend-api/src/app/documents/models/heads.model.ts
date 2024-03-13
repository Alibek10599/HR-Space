import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface HeadsCreationAttrs {
  id: number;
  empId: string;
}

@Table({ tableName: 'heads' })
export class Heads extends Model<Heads, HeadsCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  empId: number;

  @Column({ type: DataType.DATE, allowNull: true })
  createdAt: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  updatedAt: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  deletedAt: Date;
}
