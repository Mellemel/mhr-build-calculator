import baseHeadArmor from '../images/armour_head_r1.png';
import baseChestArmor from '../images/armour_chest_r1.png';
import baseArmsArmor from '../images/armour_arms_r1.png';
import baseWaistArmor from '../images/armour_waist_r1.png';
import baseLegsArmor from '../images/armour_legs_r1.png';
import GearRow from './Shared/GearRow';

type Armor = 'head' | 'chest' | 'arms' | 'waist' | 'legs';

interface ArmorRowProps {
  type: Armor
}

function ArmorRow(props: ArmorRowProps) {
  return (
    <GearRow image={imageType[props.type]}>
      <div className="pure-u-3-4">
        <p>Defense</p>
        <p>Resistance</p>
        <p>Fire</p>
        <p>Water</p>
        <p>Ice</p>
        <p>Thunder</p>
        <p>Dragon</p>
      </div>
    </GearRow>
  )
}

const imageType = {
  'head': baseHeadArmor,
  'chest': baseChestArmor,
  'arms': baseArmsArmor,
  'waist': baseWaistArmor,
  'legs': baseLegsArmor
}

export default ArmorRow;
