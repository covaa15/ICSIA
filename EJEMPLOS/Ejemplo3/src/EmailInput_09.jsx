//importo el hook
import { useState } from "react";

export default function EmailInput_09() {

const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);

  function handleUpdateEmail(event) {
  // se podría añadir aquí la validación del correo electrónico 
  setEmail(event.target.value);
  };

  function handleUpdateAgreement(event) {
    setAgreed(event.target.checked);// checked es una propiedad booleana predeterminada de JS
  };

  function handleSignup(event) {
    event.preventDefault();// evita que el navegador envíe una solicitud Http de forma predeterminada
    const userData = {userEmail: email, userAgrees: agreed};
    console.log(userData);
    // hacerLoQueSeaNecesario(userData);
  };

  return (
    // onSubmit={handleSignup}
    <form >
      <div>
        <label htmlFor="email">Tu correo electrónico</label>
        <input type="email" id="email" onChange={handleUpdateEmail}/>
      </div>
      <div>
        <input type="checkbox" id="agree" onChange={handleUpdateAgreement}/>
        <label htmlFor="agree">Acepto los términos y condiciones</label>
      </div>
      <div>
        <input type="submit" id="agree" onClick={handleSignup}/>
      </div>
    </form>
  );
}; 
