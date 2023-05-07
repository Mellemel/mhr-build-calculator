import { AmmoCapacity, AmmoTypes } from "./models/weapons/BowGun";
import { ElementType } from "./models/Weapon";

export function mapRampageSkills(skills: string[]) {
  return skills.map(skill => ({name: skill.slice(0, -2), level: parseInt(skill.slice(-1))}))
}

export function mapElementStat(elementStat: {[key: string]: number}) {
  const key = Object.keys(elementStat)[0];
  if (key) {
    return {
      type: key as ElementType,
      value: elementStat[key]
    }
  }
  return null;
}

export type BowGunAmmo = {
  [key: string]: {
    ammo_capacity: number,
    available: boolean
  }[]
}



export function mapBowGunAmmo(ammos: BowGunAmmo): AmmoCapacity[] {
  const bowgunStats: AmmoCapacity[] = [];
  Object.keys(ammos).forEach((ammoType) => {
    ammos[ammoType].forEach((set) => {
      if (set.available === true) {
        bowgunStats.push({ type: ammoType as AmmoTypes, value: set.ammo_capacity});
      }
    });
  });
  return bowgunStats;
}