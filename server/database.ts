import { BaseEntity, DataSource } from "typeorm";
import { RampageSkill } from "./models/RampageSkill";
import { Weapon, WeaponType } from "./models/Weapon";
import { mapElementStat } from "./transformers";
import dbConfig from "./db-config";
import { Bow, ArchShotType } from "./models/Bow";

export class Database {
  private static client: DataSource;

  private static relatedWeaponRecordFunctionsMap: relatedWeaponRecordFunctionsType = {
    [WeaponType.Bow]: this.createBowRecord,
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

  private constructor(){}

  public static async initialize() {
    const AppDataSource = new DataSource(dbConfig)
    this.client = await AppDataSource.initialize();
  }

  public static async getClient() {
    if (!this.client) {
      await this.initialize();
    }
    return this.client;
  }

  public static async retrieveRampageSkillRecord(name: string) {
    return RampageSkill.findOneBy({ name: name });
  }

  public static async createRampageSkillRecord(name: string, level: number) {
    const rampageSkill = new RampageSkill();
    rampageSkill.name = name;
    rampageSkill.level = level;
    await rampageSkill.save()
    return rampageSkill;
  }

  public static async createWeaponRecord(weaponData: any, weaponType: WeaponType, rampageSkills: RampageSkill[]) {
    const weapon = new Weapon();
    weapon.name = weaponData.name;
    weapon.type = weaponType;
    weapon.attack = weaponData.attack;
    weapon.affinity = weaponData.affinity;
    weapon.element = mapElementStat(weaponData.elestat);
    weapon.defense = weaponData.defense;
    weapon.rarity = weaponData.rarity;
    weapon.decorationSlots = weaponData.decos;
    weapon.rampageSkills = rampageSkills;
    await weapon.save();
    return weapon;
  }

  public static async createRelatedWeaponRecord(weaponRecord: Weapon, weaponData: any) {
    const relatedWeaponRecord = await this.relatedWeaponRecordFunctionsMap[weaponRecord.type](weaponData);
    relatedWeaponRecord.weapon = weaponRecord
    return relatedWeaponRecord.save();
  }

  public static async createBowRecord(weaponData: BowData) {
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
    await bow.save()
    return bow;
  }
}

type BowData = {
  arc_shot: ArchShotType;
  base_charge_level_limit: number;
  charge_shot: [string, number][];
  compatible_coatings: {
    blast_coating: number;
    close_range_coating: number;
    exhaust_coating: number;
    para_coating: number;
    poison_coating: number;
    power_coating: number;
    sleep_coating: number;
  };
};

type relatedWeaponRecordFunctionsType = {
  [key in WeaponType]: (arg: any) => Promise<BaseEntity & { weapon: Weapon }>;
};