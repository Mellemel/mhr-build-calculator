import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm"
import { RampageSkill } from ".";

export enum WeaponType {
  Bow = 'bow',
  ChargeBlade = 'chargeblade',
  DualBlades = 'dualblades',
  GreatSword = 'greatsword',
  GunLance = 'gunlance',
  Hammer = 'hammer',
  HeavyBowgun = 'heavybowgun',
  HuntingHorn = 'huntinghorn',
  InsectGlaive = 'insectglaive',
  Lance = 'lance',
  LightBowgun = 'lightbowgun',
  LongSword = 'longsword',
  SwitchAxe = 'switchaxe',
  SwordAndShield = 'swordandshield'
}

export enum ElementType {
  Fire = 'fire',
  Water = 'water',
  Ice = 'ice',
  Thunder = 'thunder',
  Dragon = 'dragon'
}
export interface ElementalStat {
  type: ElementType,
  value: number
}

@Entity()
export class Weapon extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  name!: string;
  @Column('simple-enum', { nullable: false })
  type!: WeaponType;
  @Column({ nullable: false })
  attack!: number;
  @Column({ nullable: false })
  affinity!: number;
  @Column('simple-json', { nullable: true })
  element!: (ElementalStat | null);
  @Column({ nullable: false })
  defense!: number;
  @Column('smallint', { nullable: false })
  rarity!: number;
  @Column('simple-array')
  decorationSlots!: (number[] | null);

  @ManyToMany(() => RampageSkill)
  @JoinTable()
  rampageSkills!: RampageSkill[];
}
