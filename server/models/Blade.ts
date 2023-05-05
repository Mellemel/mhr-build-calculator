import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, TableInheritance } from "typeorm";
import { Weapon } from ".";

@Entity()
@TableInheritance({ column: { type: "varchar", name: "type" } })
export class Blade extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('simple-array', {nullable: false})
  baseSharpness!: number[];
  @Column('simple-array', {nullable: false})
  maxSharpness!: number[];

  @OneToOne(() => Weapon, {nullable: false})
  @JoinColumn()
  weapon!: Weapon;
}