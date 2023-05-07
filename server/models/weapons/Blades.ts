import { BaseEntity, Column, OneToOne, JoinColumn, Entity, TableInheritance, ChildEntity, PrimaryGeneratedColumn } from "typeorm";
import { Weapon } from "../Weapon";

type BladeData = {
  base_sharpness: number[],
  max_sharpness: number[]
}

@Entity()
@TableInheritance({ column: { name: 'type', type: 'varchar' } })
export class Blade extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('simple-array', {nullable: false})
  baseSharpness!: number[];
  @Column('simple-array', {nullable: false})
  maxSharpness!: number[];

  @OneToOne(() => Weapon, {nullable: false})
  @JoinColumn()
  weapon!: Weapon;

  public addSharpnessAttributes(bladeData: BladeData) {
    this.baseSharpness = bladeData.base_sharpness;
    this.maxSharpness = bladeData.max_sharpness;
  }
}

export enum ChargeBladePhialType {
  Element = 'element',
  Impact = 'impact',
} 

@ChildEntity()
export class ChargeBlade extends Blade {
  @Column('simple-enum', { nullable: false })
  phialType!: ChargeBladePhialType;
}

@ChildEntity()
export class DualBlades extends Blade {}

@ChildEntity()
export class GreatSword extends Blade {}

export type ShellingType = 'normal' | 'long' | 'wide';

@ChildEntity()
export class GunLance extends Blade {
  @Column({ nullable: false })
  shellingType!: ShellingType;
  @Column()
  shellingLevel: number = 0;
}

@ChildEntity()
export class Hammer extends Blade {}

@ChildEntity()
export class Lance extends Blade {}

@ChildEntity()
export class LongSword extends Blade {}

type SwitchAxePhialType = 'elemental' | 'exhaust' | 'dragon' | 'power' | 'paralysis';

@ChildEntity()
export class SwitchAxe extends Blade {
  @Column('simple-enum', {nullable: false})
  phialType!: SwitchAxePhialType;
  @Column()
  phialValue!: number;
}

@ChildEntity()
export class SwordAndShield extends Blade {}