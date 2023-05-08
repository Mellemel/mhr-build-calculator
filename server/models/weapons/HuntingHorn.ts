import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Weapon } from "../Weapon";

@Entity()
export class HuntingHorn extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('simple-array')
  songs: string[] = [];

  @OneToOne(() => Weapon, {nullable: false})
  @JoinColumn()
  weapon!: Weapon
}