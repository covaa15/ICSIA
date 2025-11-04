import { useRef  } from 'react';

import classes from './EmailForm.module.css';

function EmailForm() {
  // Sin refs, con estado:
  // const [enteredEmail, setEnteredEmail] = useState('');

  // Con refs:
  const emailRef = useRef(null);

  // Sin refs:
  // function updateEmailHandler(event) {
  //   setEnteredEmail(event.target.value);
  // }

  function submitFormHandler(event) {
    event.preventDefault();

    // Sin refs: podrías usar el estado enteredEmail aquí

    // Alternativa (¡no debería usarse!):
    // const emailInputEl = document.getElementById('email');
    // const enteredEmailVal = emailInputEl.value;

    // Con refs:
    const enteredEmail = emailRef.current.value;
    console.log(enteredEmail);
    // emailRef.current.value = ''; // ¡no reinicies así!

    // podrías enviar enteredEmail a un servidor backend
  }

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      <label htmlFor="email">Your email</label>
      <input
        ref={emailRef}
        type="email"
        id="email"
        // onChange={updateEmailHandler}
      />
      <button>Save</button>
    </form>
  );
}

export default EmailForm;
