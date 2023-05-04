import { Database } from "./database";
import { default as weaponData } from './data/mhr_weapon_data.json';
import { ElementType, Weapon, WeaponType } from "./models/Weapon";
import { RampageSkill } from "./models/RampageSkill";
import { Bow } from "./models/Bow";
import { BaseEntity } from "typeorm";

seedData()

async function seedData() {
  await Database.initialize();
  const weaponTypes = Object.keys(weaponData);
  for (const weaponType in weaponTypes) {
    const weapons = weaponData[weaponType as WeaponType];
    for (const weaponData of weapons) {
      const weaponRecord = await createWeaponRecord(weaponData, weaponType as WeaponType);
      createRelatedWeaponRecord(weaponRecord, weaponData);
    }
  }
}

async function createWeaponRecord(weaponData: any, weaponType: WeaponType) {
  const weapon = new Weapon();
  weapon.name = weaponData.name;
  weapon.type = weaponType;
  weapon.attack = weaponData.attack;
  weapon.affinity = weaponData.affinity;
  weapon.element = mapElementStat(weaponData.elestat);
  weapon.defense = weaponData.defense;
  weapon.rarity = weaponData.rarity;
  weapon.decorationSlots = weaponData.decos;
  weapon.rampageSkills = await mapRampageSkills(weaponData.ramps[0]);
  await weapon.save();
  return weapon;
}

function mapElementStat(eleStat: any) {
  const key = Object.keys(eleStat)[0];
  if (key) {
    return {
      type: key as ElementType,
      value: eleStat[key]
    }
  }
  return null;
}

async function mapRampageSkills(skills: string[]) {
  const rampageSkills = skills.map(retrieveRampageSkill);
  async function retrieveRampageSkill(skill: string) {
    const name = skill.slice(0, -2);
    const savedSkill = await RampageSkill.findOneBy({ name: name });
    if (savedSkill) {
      return savedSkill
    }
    const rampageSkill = new RampageSkill();
    rampageSkill.name = name;
    rampageSkill.level = parseInt(skill.slice(-1));
    await rampageSkill.save()
    return rampageSkill;
  }
  return Promise.all(rampageSkills);
}

async function createRelatedWeaponRecord(weaponRecord: Weapon, weaponData: any) {
  const relatedWeaponRecord = await relatedWeaponRecordFunctions[weaponRecord.type](weaponData);
  relatedWeaponRecord.weapon = weaponRecord
  return relatedWeaponRecord.save();
}

type relatedWeaponRecordFunctionsType = {
  [key in WeaponType]: (arg: any) => Promise<BaseEntity & {weapon: Weapon}>;
};

const relatedWeaponRecordFunctions: relatedWeaponRecordFunctionsType = {
  [WeaponType.Bow]: createBowRecord,
  [WeaponType.ChargeBlade]: () => console.log('Charge Blade function'),
  [WeaponType.DualBlades]: () => console.log('Dual Blades function'),
  [WeaponType.GreatSword]: () => console.log('Great Sword function'),
  [WeaponType.GunLance]: () => console.log('Gunlance function'),
  [WeaponType.Hammer]: () => console.log('Hammer function'),
  [WeaponType.HeavyBowgun]: () => console.log('Heavy Bowgun function'),
  [WeaponType.HuntingHorn]: () => console.log('Hunting Horn function'),
  [WeaponType.InsectGlaive]: () => console.log('Insect Glaive function'),
  [WeaponType.Lance]: () => console.log('Lance function'),
  [WeaponType.LightBowgun]: () => console.log('Light Bowgun function'),
  [WeaponType.LongSword]: () => console.log('Long Sword function'),
  [WeaponType.SwitchAxe]: () => console.log('Switch Axe function'),
  [WeaponType.SwordAndShield]: () => console.log('Sword and Shield function')
};

async function createBowRecord(weaponData: any) {
  const bow = new Bow();
  bow.arcShot = weaponData.arc_shot;
  bow.baseChargeLevelLimit = weaponData.base_charge_level_limit;
  bow.chargeShots = weaponData.charge_shot.map((charge: any) => ({
    type: charge[0], level: charge[1]
  }));
  bow.compatibleCoatings = {
    blast: weaponData.compatible_coatings.blast_coating === 1,
    closeRange: weaponData.compatible_coatings.close_range_coating === 1,
    exhaust: weaponData.compatible_coatings.exhaust_coating === 1,
    para: weaponData.compatible_coatings.para_coating === 1,
    poison: weaponData.compatible_coatings.poison_coating === 1,
    power: weaponData.compatible_coatings.power_coating === 1,
    sleep: weaponData.compatible_coatings.sleep_coating === 1,
  }
  return bow;
}
