import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { Weapon } from "./Weapon";

@Entity()
export class Blade extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('simple-array')
  baseSharpness: number[] = [];
  @Column('simple-array')
  maxSharpness: number[] = [];

  @OneToOne(() => Weapon, {nullable: false})
  @JoinColumn()
  weapon!: Weapon;
}