import { useRef, useState } from 'react';
import classes from './EmailForm.module.css';

function EmailForm() {
  const [enteredEmail, setEnteredEmail] = useState("");
  function handleUpdateEmail(event) {
    setEnteredEmail(event.target.value);
  }
  function handleSubmitForm(event) {
    event.preventDefault();
    // podría enviar enteredEmail a un servidor backend
    // restablecer estableciendo el estado + utilizando la propiedad value a continuación
    setEnteredEmail("");
  }
  return (
    <form className={classes.form} onSubmit={handleSubmitForm}>
      <label htmlFor="email">Tu correo electrónico</label>
      <input
        type="email"
        id="email"
        onChange={handleUpdateEmail}
        value={enteredEmail}
      />
      <button>Guardar</button>
    </form>
  );
} 

export default EmailForm;
