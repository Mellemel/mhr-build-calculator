import { BaseEntity, Column, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Weapon } from ".";

type PhialType = 'elemental' | 'exhaust' | 'dragon' | 'power' | 'paralysis';

export class SwitchAxe extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('simple-enum', {nullable: false})
  phialType!: PhialType;
  @Column()
  phialValue: number | null = null;

  @OneToOne(() => Weapon, {nullable: false})
  weapon!: Weapon
}