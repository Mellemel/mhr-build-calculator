import GearRow from './GearRow';

import baseWeaponsIcon from '../images/weapons/weapon_greatsword_r1.png';
import { ReactComponent as AttackIcon } from '../images/icons/mhw_attack_icon.svg'
import { ReactComponent as AffinityIcon } from '../images/icons/mhw_affinity_icon.svg'

function WeaponRow() {
  return (
    <GearRow image={baseWeaponsIcon} title='N/A'>
      <div className='pure-g'>
        <div className='icon-container pure-g'>
          <AttackIcon width={'25px'} height={'25px'} style={{}} />
          <span>N/A</span>
        </div>
        <div className='icon-container pure-g'>
          <AffinityIcon width={'25px'} height={'25px'} />
          <span>N/A</span>
        </div>
      </div>
      <p>Rampage Skill</p>
    </GearRow>
  )
}

export default WeaponRow;
