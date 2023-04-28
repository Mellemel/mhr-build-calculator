import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm"
import { RampageSkill } from "./RampageSkill";

export type WeaponType = 'bow' | 'chargeblade' |
  'dualblades' | 'greatsword' |
  'gunlance' | 'hammer' |
  'heavybowgun' | 'huntinghorn' |
  'insectglaive' | 'lance' |
  'lightbowgun' | 'longsword' |
  'switchaxe' | 'swordandshield';

export type ElementType = 'fire' | 'water' | 'ice' | 'thunder' | 'dragon';
export interface ElementalStat {
  type: ElementType,
  attack: number
}

@Entity()
export class Weapon extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  name!: string;
  @Column('simple-enum', { nullable: false })
  type!: WeaponType;
  @Column()
  attack: number = 0;
  @Column()
  affinity: number = 0;
  @Column('simple-json', { nullable: true })
  element!: ElementalStat;
  @Column()
  defense: number = 0;
  @Column('smallint')
  rarity: number = 0;

  @Column('simple-array')
  decorationSlots: number[] = [];

  @ManyToMany(() => RampageSkill)
  @JoinTable()
  rampageSkills!: RampageSkill[];
}
