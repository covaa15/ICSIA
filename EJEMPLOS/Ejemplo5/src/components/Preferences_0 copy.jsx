import { useState, forwardRef } from 'react';

import classes from './Preferences.module.css';

function Preferences(props) {
  const ref = props.ref;
  //o const  const { ref } = props; 
  // const Preferences = forwardRef((props, ref) => {
  const [wantsNewProdInfo, setWantsNewProdInfo] = useState(false);
  const [wantsProdUpdateInfo, setWantsProdUpdateInfo] = useState(false);

  function changeNewProdPrefHandler() {
    setWantsNewProdInfo((prevPref) => !prevPref);
  }

  function changeUpdateProdPrefHandler() {
    setWantsProdUpdateInfo((prevPref) => !prevPref);
  }

  function reset() {
    setWantsNewProdInfo(false);
    setWantsProdUpdateInfo(false);
  }
 
  // Asigno la función reset y las preferencias seleccionadas
  // al ref que recibo por props
  // este reset se ejecuta desde el componente padre EmailForm
  ref.current.reset = reset;
  //crea un objeto con las preferencias seleccionadas
  ref.current.selectedPreferences = {
    newProductInfo: wantsNewProdInfo,
    productUpdateInfo: wantsProdUpdateInfo,
  };

  return (
    <div className={classes.preferences}>
      <label>
        <input
          type="checkbox"
          id="pref-new"
          checked={wantsNewProdInfo}
          onChange={changeNewProdPrefHandler}
        />
        <span>New Products</span>
      </label>
      <label>
        <input
          type="checkbox"
          id="pref-updates"
          checked={wantsProdUpdateInfo}
          onChange={changeUpdateProdPrefHandler}
        />
        <span>Product Updates</span>
      </label>
    </div>
  );
};

export default Preferences;
