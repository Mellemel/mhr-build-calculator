import { useEffect, useState } from 'react';
import { ClientDatabase } from '@data-processing/database-client';
import { Weapon } from '@data-processing/models/Weapon';

import { ArmorRow, WeaponRow } from './components';

function App() {
  const [weapons, setWeapons] = useState<Weapon[]>([]);
  useEffect(() => {
    (async () => {
      await ClientDatabase.initialize();
      const weapons = await Weapon.find();
      setWeapons(weapons);
    })()
  }, []);

  return (
    <div className="pure-g">
      <div className="column-container pure-u-1-2">
        <h3>Gear Set</h3>
        <WeaponRow />
        <ArmorRow type='head' />
        <ArmorRow type='chest' />
        <ArmorRow type='arms' />
        <ArmorRow type='waist' />
        <ArmorRow type='legs' />
      </div>
      <div className="column-container pure-u-1-4">
        <h3>Skills</h3>
      </div>
      <div className="column-container pure-u-1-4">
        <h3>Stats</h3>
      </div>
    </div>
  );
}

export default App;
