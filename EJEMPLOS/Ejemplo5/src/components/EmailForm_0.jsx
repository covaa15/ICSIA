import { useRef, useState } from 'react';
import classes from './EmailForm.module.css';

function EmailForm() {
  const [enteredEmail, setEnteredEmail] = useState("");
  console.log(enteredEmail);

  function handleUpdateEmail(event) {
    setEnteredEmail(event.target.value);
  }

  function handleSubmitForm(event) {
    event.preventDefault();
    // podría enviar enteredEmail a un servidor backend
  }

  return (
    <form className={classes.form} onSubmit={handleSubmitForm}>
      <label htmlFor="email">Tu correo electrónico</label>
      <input type="email" id="email" onChange={handleUpdateEmail} />
      <button>Guardar</button>
    </form>
  );
} 
export default EmailForm;
