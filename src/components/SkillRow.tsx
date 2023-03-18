import baseWeaponImage from '../images/weapons/weapon_greatsword_r1.png';
import GearRow from './GearRow';

function WeaponRow() {
  return (
    <GearRow image={baseWeaponImage} title='N/A'>
      <div className='pure-g'>
        <p>Attack</p>
        <p>Affinity</p>
      </div>
      <p>Rampage Skill</p>
    </GearRow>
  )
}

export default WeaponRow;
