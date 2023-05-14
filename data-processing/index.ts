import { ServerDatabase } from "./database-server";
import { default as weaponData } from './raw/mhr_weapon_data.json';
import { WeaponType } from "./models/Weapon";

seedData()

async function seedData() {
  await ServerDatabase.initialize();

  const weaponTypes = Object.keys(weaponData) as WeaponType[];
  for (const weaponType of weaponTypes) {
    const weapons = weaponData[weaponType];
    for (const weaponData of weapons) {
      const rampageSkills = weaponData.ramps[0]
      const rampageSkillRecords = await Promise.all(
        rampageSkills.map(async (skill) => {
          const record = await ServerDatabase.retrieveRampageSkillRecord(skill);
          return record ?? ServerDatabase.createRampageSkillRecord(skill);
        })
      )
      ServerDatabase.createWeaponRecord(weaponType, rampageSkillRecords, weaponData);
    }
  }
}
