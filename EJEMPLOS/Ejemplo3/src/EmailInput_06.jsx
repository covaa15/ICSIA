//importo el hook
import { useState } from "react";

export default function EmailInput_06() {

  // un estado, un objeto con dos campos
 const [userData, setUserData] = useState({
    email: "",
    password: ""
  });
  function handleUpdateEmail(event) {
    setUserData({
      email: event.target.value,
      password: userData.password
    });
    console.log(userData);
  };
  function handleUpdatePassword(event) {
    setUserData({
      email: userData.email,
      password: event.target.value
    });
    console.log(userData);
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
