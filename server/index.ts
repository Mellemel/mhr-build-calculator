import { Database } from "./database";
import { default as weaponData } from './data/mhr_weapon_data.json';
import { WeaponType } from "./models/Weapon";

seedData()

async function seedData() {
  await Database.initialize();

  const weaponTypes = Object.keys(weaponData) as WeaponType[];
  for (const weaponType of weaponTypes) {
    const weapons = weaponData[weaponType];
    for (const weaponData of weapons) {
      const rampageSkills = weaponData.ramps[0]
      const rampageSkillRecords = await Promise.all(
        rampageSkills.map(async (skill) => {
          const record = await Database.retrieveRampageSkillRecord(skill);
          return record ?? Database.createRampageSkillRecord(skill);
        })
      )
      Database.createWeaponRecord(weaponType, rampageSkillRecords, weaponData);
    }
  }
}
