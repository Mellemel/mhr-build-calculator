import baseHeadArmor from '../images/armors/armour_head_r1.png';
import baseChestArmor from '../images/armors/armour_chest_r1.png';
import baseArmsArmor from '../images/armors/armour_arms_r1.png';
import baseWaistArmor from '../images/armors/armour_waist_r1.png';
import baseLegsArmor from '../images/armors/armour_legs_r1.png';
import GearRow from './GearRow';

type Armor = 'head' | 'chest' | 'arms' | 'waist' | 'legs';

interface ArmorRowProps {
  type: Armor
}

function ArmorRow(props: ArmorRowProps) {
  return (
    <GearRow image={imageType[props.type]} title='N/A'>
      <div className='pure-g'>
        <p>Defense</p>
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
