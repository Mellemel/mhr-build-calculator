import { default as weaponData } from './downloaded_data.json';

type WeaponType = keyof typeof weaponData

const headers = [
  'name', 'weapon_type', 'attack',
  'affinity', 'elemental_stat', 'defense',
  'rarity', 'decorations', 'rampage_skills',
]
const swordHeaders = [
  'name', 'base_sharpness', 'max_sharpness',
]
const bowHeaders = [
  'name', 'arc_shot', 'base_charge_level_limit',
  'charge_shot', 'compatible_coatings'
]
const chargebladeHeaders = [
  'name', 'phial_type'
]
const gunlanceHeaders = [
  'name', 'shelling_type', 'shelling_type'
]
const bowgunHeaders = [
  'name', 'ammo', 'deviation', 'recoil', 'reload'
]
const rampageSkillsHeaders = [
  'name', 'rampageSkill', 'level'
]
const elementalHeaders = [
  'name', 'type', 'amount'
]
// Object.keys(weaponData).forEach(weaponType => {
//   const weapons = weaponData[weaponType as WeaponType];
//   weapons.forEach(weapon => {
//     const decorations = weapon.decorations.stringify();
//     const rampageSkills = weapon.ramps[0].stringify();
//     const row = [
//       weapon.name, weaponType, weapon.attack, weapon.affinity,
//       weapon.defense, weapon.rarity, decorations,

//     ]
//   })
// })