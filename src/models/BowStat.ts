import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Weapon } from "./Weapon";

type ArchShotType = 'recovery' | 'affinity' | 'brace';
type CoatingType = 'blast' | 'closeRange' | 'exhaust' | 'para' | 'poison' | 'power' | 'sleep';
type ChargeShotType = 'rapid' | 'pierce' | 'spread';
interface BowWeaponChargeShot {
  type: ChargeShotType,
  level: number
}

@Entity()
export class BowStat extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('simple-enum', { nullable: false })
  arcShot!: ArchShotType;
  @Column()
  baseChargeLevelLimit: number = 0;
  @Column('simple-array')
  chargeShot: BowWeaponChargeShot[] = [];
  @Column('simple-array')
  compatibleCoatings: CoatingType[] = [];

  @OneToOne(() => Weapon, {nullable: false})
  @JoinColumn()
  weapon!: Weapon;
}


