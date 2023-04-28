import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { Weapon } from "./Weapon";

@Entity()
export class SwordStat extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  baseSharpness: number[] = [];
  @Column()
  maxSharpness: number[] = [];

  @OneToOne(() => Weapon, {nullable: false})
  @JoinColumn()
  weapon!: Weapon;
}