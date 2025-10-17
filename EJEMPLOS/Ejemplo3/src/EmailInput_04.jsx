//importo el hook
import { useState } from "react";

export default function EmailInput_04() {

//creo el estado que quiero controlar
const [errorMessage, setErrorMessage] = useState("");

  function evaluateEmail(event) {
    const enteredEmail = event.target.value;
    if (enteredEmail.trim() === "" || !enteredEmail.includes("@")) {
	setErrorMessage("La dirección de correo electrónico introducida no es    	v	 válida."); 
    } else {
      setErrorMessage("");
    }
  };
  return (
    <div>
      <input 
        placeholder="Tu correo electrónico" 
        type="email" 
        onBlur={evaluateEmail} />
      <p>{errorMessage}</p>
    </div>
  );
};



