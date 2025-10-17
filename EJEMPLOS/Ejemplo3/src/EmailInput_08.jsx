//importo el hook
import { useState } from "react";

export default function EmailInput_07() {

  const [email, setEmail] = useState("");

function handleUpdateEmail(event) {
    setEmail(event.target.value);
  };

function handleClearInput() {
	    setEmail("");// restablecer la entrada de correo electrónico (volver a una cadena vacía)
};

return (
  <>
   <input
   type="email"
   placeholder="Tu dirección de correo electrónico"
   // meto el estado en el value porque lo voy a resetear luego
   value={email}
       onChange={handleUpdateEmail} />
      <button onClick={handleClearInput}>Restablecer</button>
    </>
  );
}; 
