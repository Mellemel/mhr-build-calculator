import { BaseEntity, ChildEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, TableInheritance } from "typeorm";
import { Weapon } from "../Weapon";

interface BowGunDeviation {
  left: boolean;
  right: boolean;
  severity: number;
}

type Ammo = 'normal' | 'piercing' | 'spread' | 'shrapnel' | 'sticky' | 'cluster';

type ElementalAmmo = 'fire' | 'water' | 'thunder' | 'ice' | 'dragon';

type StatusAmmo = 'poison' | 'paralysis' | 'sleep' | 'exhaust' | 'recoil';

type SupportAmmo = 'demon' | 'amor' | 'slicing' | 'wyvern' | 'tranq'

export type AmmoTypes = Ammo | ElementalAmmo | StatusAmmo | SupportAmmo;
export interface AmmoCapacity {
  type: AmmoTypes;
  value: number;
}

@Entity()
@TableInheritance({ column: { name: 'type', type: 'varchar' } })
export class BowGun extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('simple-json', {nullable: false})
  deviation!: BowGunDeviation;
  @Column('smallint', {nullable: false})
  recoil!: number;
  @Column('smallint', {nullable: false})
  reloadSpeed!: number;
  @Column('simple-json', {nullable: false})
  ammoCapacity!: AmmoCapacity[]

  @OneToOne(() => Weapon, {nullable: false})
  @JoinColumn()
  weapon!: Weapon
}

@ChildEntity()
export class HeavyBowGun extends BowGun {}

@ChildEntity()
export class LightBowGun extends BowGun {}