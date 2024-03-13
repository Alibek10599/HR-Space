import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface PositionLvlCreationAttrs {
  name: string;
}

@Table({ tableName: 'position_lvl' })
export class PositionLvl extends Model<PositionLvl, PositionLvlCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @Column({ type: DataType.STRING, allowNull: false })
  sub_lvl: string;

  @Column({ type: DataType.DATE, allowNull: true })
  createdAt: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  updatedAt: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  deletedAt: Date;
}
