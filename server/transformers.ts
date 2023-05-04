import { ElementType } from "./models/Weapon";

export function mapRampageSkills(skills: string[]) {
  return skills.map(skill => ({name: skill.slice(0, -2), level: parseInt(skill.slice(-1))}))
}

export function mapElementStat(eleStat: any) {
  const key = Object.keys(eleStat)[0];
  if (key) {
    return {
      type: key as ElementType,
      value: eleStat[key]
    }
  }
  return null;
}