import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Weapon } from "./Weapon";

export enum ArchShotType {
  Recovery = 'recovery',
  Affinity = 'affinity',
  Brace = 'brace'
} 
  
export enum ChargeShotType {
  Rapid = 'rapid',
  Pierce = 'pierce',
  Spread = 'spread',
} 
export interface BowWeaponChargeShot {
  type: ChargeShotType,
  level: number
}

export interface CompatibleCoating {
  blast: boolean,
  closeRange: boolean,
  exhaust: boolean,
  para: boolean,
  poison: boolean,
  power: boolean,
  sleep: boolean
}

@Entity()
export class Bow extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('simple-enum', { nullable: false })
  arcShot!: ArchShotType;
  @Column({ nullable: false })
  baseChargeLevelLimit!: number;
  @Column('simple-array', { nullable: false })
  chargeShots!: BowWeaponChargeShot[];
  @Column('simple-json', { nullable: false })
  compatibleCoatings!: CompatibleCoating;

  @OneToOne(() => Weapon, {nullable: false})
  @JoinColumn()
  weapon!: Weapon;
}


