import { BaseEntity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BowGun } from "./BowGun";

type Ammo = 'normal' | 'piercing' | 'spread' | 'shrapnel' | 'sticky' | 'cluster';

type ElementalAmmo = 'fire' | 'water' | 'thunder' | 'ice' | 'dragon';

type StatusAmmo = 'poison' | 'paralysis' | 'sleep' | 'exhaust' | 'recoil';

type SupportAmmo = 'demon' | 'amor' | 'slicing' | 'wyvern' | 'tranq'

export class BowGunAmmo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('simple-enum')
  type!: Ammo | ElementalAmmo | StatusAmmo | SupportAmmo
  @Column('simple-array')
  capacity: (number | null)[] = []

  @ManyToOne(() => BowGun, bowGun => bowGun.bowGunAmmo)
  bowGun!: BowGun;
}