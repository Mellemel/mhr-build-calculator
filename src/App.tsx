import './App.css';
import baseWeaponImage from './images/weapon_greatsword_r1.png';

function App() {
  return (
    <div className="pure-g">
      <div className="pure-u-1-3">
        <div>
        <img className="img-base-wearable" src={baseWeaponImage} alt="Stock Weapon" />
        <div>
          <input type="text"/>
          <p>Attack</p>
          <p>Affinity</p>
          <p>Rampage Skill</p>
        </div>
        </div>

      </div>
      <div className="pure-u-1-3"><p>Thirds</p></div>
      <div className="pure-u-1-3"><p>Thirds</p></div>
    </div>
  );
}

export default App;
