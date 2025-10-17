//importo el hook
import { useState } from "react";

export default function EmailInput_05() {

  // dos estados
 const [enteredEmail, setEnteredEmail] = useState("");
 const [enteredPassword, setEnteredPassword] = useState("");

  function handleUpdateEmail(event) {
    setEnteredEmail(event.target.value);
  };
  function handleUpdatePassword(event) {
    setEnteredPassword(event.target.value);
  };
// A continuación, las propiedades se dividen en varias líneas para facilitar la lectura
// Esto está permitido cuando se utiliza JSX, al igual que en HTML estándar
return (
    <form>
      <input
        type="email"
        placeholder="Tu correo electrónico"
        onBlur={handleUpdateEmail} />
      <input
        type="password"
        placeholder="Tu contraseña"
        onBlur={handleUpdatePassword} />
    </form>
  );
};
