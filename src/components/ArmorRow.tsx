import GearRow from './GearRow';
import ImageContainer from './ImageCounter';

import baseHeadArmor from '../images/armors/armour_head_r1.png';
import baseChestArmor from '../images/armors/armour_chest_r1.png';
import baseArmsArmor from '../images/armors/armour_arms_r1.png';
import baseWaistArmor from '../images/armors/armour_waist_r1.png';
import baseLegsArmor from '../images/armors/armour_legs_r1.png';
import {ReactComponent as ElementalFireIcon } from '../images/elementals/elementalres_fire_icon.svg';
import {ReactComponent as ElementalWaterIcon } from '../images/elementals/elementalres_water_icon.svg';
import {ReactComponent as ElementalIceIcon } from '../images/elementals/elementalres_ice_icon.svg';
import {ReactComponent as ElementalThunderIcon } from '../images/elementals/elementalres_thunder_icon.svg';
import {ReactComponent as ElementalDragonIcon } from '../images/elementals/elementalres_dragon_icon.svg';
import DefenseIcon from '../images/icons/mhw_screenshot_defense_icon_v0.png'

type Armor = 'head' | 'chest' | 'arms' | 'waist' | 'legs';

interface ArmorRowProps {
  type: Armor
}

function ArmorRow(props: ArmorRowProps) {
  return (
    <GearRow image={imageType[props.type]} title='N/A'>
      <div className='pure-g'>
        <ImageContainer icon={<img className='icon-container-svg' src={DefenseIcon} alt="Defense Icon" />}/>
        <ImageContainer icon={<ElementalFireIcon className='icon-container-svg' />}/>
        <ImageContainer icon={<ElementalWaterIcon className='icon-container-svg' />}/>
        <ImageContainer icon={<ElementalIceIcon className='icon-container-svg' />}/>
        <ImageContainer icon={<ElementalThunderIcon className='icon-container-svg' />}/>
        <ImageContainer icon={<ElementalDragonIcon className='icon-container-svg' />}/>
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
