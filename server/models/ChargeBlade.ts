import { ChildEntity, Column } from "typeorm";
import { Blade } from ".";

export enum PhialType {
  Element = 'element',
  Impact = 'impact',
}

@ChildEntity()
export class ChargeBlade extends Blade {
  @Column('simple-enum', { nullable: false })
  phialType!: PhialType;
}