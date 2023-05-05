import { BaseEntity, Column, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Weapon } from ".";
import { BowGunAmmo } from ".";

interface BowGunDeviation {
  left: boolean;
  right: boolean;
  severity: number;
}

export class BowGun extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('simple-json', {nullable: false})
  deviation!: BowGunDeviation;
  @Column({nullable: false})
  recoil: number = 0;
  @Column({nullable: false})
  reloadSpeed: number = 0;

  @OneToOne(() => Weapon, {nullable: false})
  weapon!: Weapon

  @OneToMany(() => BowGunAmmo, ammo => ammo.bowGun)
  bowGunAmmo!: BowGunAmmo
}