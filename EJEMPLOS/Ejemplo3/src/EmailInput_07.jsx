//importo el hook
import { useState } from "react";

export default function EmailInput_07() {

  // un estado, un objeto con dos campos
 const [userData, setUserData] = useState({
    email: "",
    password: ""
  });

function handleUpdateEmail(event) {
    setUserData(prevData => ({
      email: event.target.value,
      password: prevData.password
    }));
};
  function handleUpdatePassword(event) {
    setUserData(prevData => ({
      email: prevData.email,
      password: event.target.value
    }));
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
}
