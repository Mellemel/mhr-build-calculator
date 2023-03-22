import GearRow from './GearRow';

import baseWeaponsIcon from '../images/weapons/weapon_greatsword_r1.png';
import { ReactComponent as AttackIcon } from '../images/icons/mhw_attack_icon.svg'
import { ReactComponent as AffinityIcon } from '../images/icons/mhw_affinity_icon.svg'
import ImageContainer from './ImageCounter';

function WeaponRow() {
  return (
    <GearRow image={baseWeaponsIcon} title='N/A'>
      <div className='pure-g'>
        <ImageContainer icon={<AttackIcon className='icon-container-svg' />} />
        <ImageContainer icon={<AffinityIcon className='icon-container-svg' />} />
      </div>
      <p>Rampage Skill</p>
    </GearRow>
  )
}

export default WeaponRow;
