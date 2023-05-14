import { BaseEntity } from "typeorm";
import { BowGunAmmo, mapBowGunAmmo, mapElementStat } from "./transformers";
import { Weapon, WeaponType } from "./models/Weapon";
import { Blade, ChargeBlade, DualBlades, GreatSword, GunLance, Hammer, Lance, LongSword, ChargeBladePhialType, ShellingType, SwordAndShield, SwitchAxe } from "./models/weapons/Blades";
import { ArchShotType, Bow } from "./models/weapons/Bow";
import { RampageSkill } from "./models/RampageSkill";
import { BowGun, HeavyBowGun, LightBowGun } from "./models/weapons/BowGun";
import { HuntingHorn } from "./models/weapons/HuntingHorn";
import { InsectGlaive } from "./models/weapons/InsectGlaive"; 
import { DataBase } from "./database";
import { dbConfig } from "./database-configurations";

export class ServerDatabase extends DataBase {
  private static weaponRecordFunctionsMap: relatedWeaponRecordFunctionsType = {
    [WeaponType.Bow]: this.createBowRecord,
    [WeaponType.ChargeBlade]: this.createChargeBladeRecord,
    [WeaponType.DualBlades]: this.createBladeRecord<DualBlades>,
    [WeaponType.GreatSword]: this.createBladeRecord<GreatSword>,
    [WeaponType.GunLance]: this.createGunLanceRecord,
    [WeaponType.Hammer]: this.createBladeRecord<Hammer>,
    [WeaponType.HeavyBowgun]: this.createBowGunRecord<HeavyBowGun>,
    [WeaponType.HuntingHorn]: this.createHuntingHornRecord,
    [WeaponType.InsectGlaive]: this.createInsectGlaiveRecord,
    [WeaponType.Lance]: this.createBladeRecord<Lance>,
    [WeaponType.LightBowgun]: this.createBowGunRecord<LightBowGun>,
    [WeaponType.LongSword]: this.createBladeRecord<LongSword>,
    [WeaponType.SwitchAxe]: this.createBladeRecord<SwitchAxe>,
    [WeaponType.SwordAndShield]: this.createBladeRecord<SwordAndShield>
  };
  public static async initialize() {
    super.initialize(dbConfig);
  }
  public static async retrieveRampageSkillRecord(name: string) {
    return RampageSkill.findOneBy({ name: name });
  }
  public static async createRampageSkillRecord(name: string) {
    const rampageSkill = new RampageSkill();
    rampageSkill.name = name;
    return rampageSkill.save();
  }
  public static async createWeaponRecord(weaponType: WeaponType, rampageSkills: RampageSkill[], weaponData: any) {
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
    return this.createRelatedWeaponRecord(weapon, weaponData);
  }
  private static async createRelatedWeaponRecord(weaponRecord: Weapon, weaponData: any) {
    const relatedWeaponRecord = this.weaponRecordFunctionsMap[weaponRecord.type](weaponData);
    relatedWeaponRecord.weapon = weaponRecord;
    relatedWeaponRecord.save();
    return relatedWeaponRecord;
  }
  private static createBowRecord(bowData: BowData) {
    const bow = new Bow();
    const { bow_stats } = bowData;
    bow.arcShot = bow_stats.arc_shot;
    bow.baseChargeLevelLimit = bow_stats.base_charge_level_limit;
    bow.chargeShots = bow_stats.charge_shot.map((charge: any) => ({
      type: charge[0], level: charge[1]
    }));
    bow.compatibleCoatings = {
      blast: bow_stats.compatible_coatings.blast_coating === 1,
      closeRange: bow_stats.compatible_coatings.close_range_coating === 1,
      exhaust: bow_stats.compatible_coatings.exhaust_coating === 1,
      para: bow_stats.compatible_coatings.para_coating === 1,
      poison: bow_stats.compatible_coatings.poison_coating === 1,
      power: bow_stats.compatible_coatings.power_coating === 1,
      sleep: bow_stats.compatible_coatings.sleep_coating === 1,
    }
    return bow;
  }
  private static createChargeBladeRecord(chargeBladeData: ChargeBladeData & BladeData) {
    const chargeBlade = new ChargeBlade();
    chargeBlade.addSharpnessAttributes(chargeBladeData);
    chargeBlade.phialType = chargeBladeData.chargeblade_stats.phial_type;
    return chargeBlade;
  }
  private static createBladeRecord<T extends Blade>(bladeData: BladeData): T {
    const blade = new Blade();
    blade.addSharpnessAttributes(bladeData);
    return blade as T;
  }
  private static createGunLanceRecord(gunLanceRecord: GunLanceData & BladeData) {
    const gunLance = new GunLance();
    gunLance.addSharpnessAttributes(gunLanceRecord);
    gunLance.shellingType = gunLanceRecord.gunlance_stats.shelling_type;
    gunLance.shellingLevel = gunLanceRecord.gunlance_stats.shelling_level;
    return gunLance;
  }
  private static createBowGunRecord<T extends BowGun>(bowGunRecord: BowGunData) {
    const bowGun = new BowGun();
    const { bowgun_stats } = bowGunRecord;
    bowGun.deviation = bowgun_stats.deviation;
    bowGun.recoil = bowgun_stats.recoil;
    bowGun.reloadSpeed = bowgun_stats.reload;
    bowGun.ammoCapacity = mapBowGunAmmo(bowgun_stats.ammo)
    return bowGun as T;
  }
  private static createHuntingHornRecord(huntingHornData: HuntingHornData) {
    const huntingHorn = new HuntingHorn();
    huntingHorn.songs = [
      huntingHornData.huntinghorn_songs.a_a,
      huntingHornData.huntinghorn_songs.x_x,
      huntingHornData.huntinghorn_songs.xa_xa
    ];
    return huntingHorn;
  }
  private static createInsectGlaiveRecord(insectGlaiveData: InsectGlaiveData) {
    const insectGlaive = new InsectGlaive();
    insectGlaive.kinsectLevel = insectGlaiveData.insectglaive_stats.kinsect_level;
    return insectGlaive;
  }
}

type InsectGlaiveData = {
  insectglaive_stats: {
    kinsect_level: 1
  }
}

type HuntingHornData = {
  huntinghorn_songs: {
    a_a: string,
    x_x: string,
    xa_xa: string
  }
}

type BowGunData = {
  bowgun_stats: {
    ammo: BowGunAmmo,
    deviation: {
      left: boolean,
      right: boolean,
      severity: number
    }
    recoil: number,
    reload: number
  }
}

type GunLanceData = {
  gunlance_stats: {
    shelling_level: number,
    shelling_type: ShellingType
  }
}

type ChargeBladeData = {
  chargeblade_stats: {
    phial_type: ChargeBladePhialType
  }
}

type BladeData = {
  base_sharpness: number[],
  max_sharpness: number[]
}

type BowData = {
  bow_stats: {
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
    }
  }
};

type relatedWeaponRecordFunctionsType = {
  [key in WeaponType]: (arg: any) => BaseEntity & { weapon: Weapon };
};