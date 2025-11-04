import { useState } from 'react';

function App() {
  // usamos dos estados
  // uno para el email introducido y para controlar si el input es inválido
  const [enteredEmail, setEnteredEmail] = useState();
  const [inputIsInvalid, setInputIsInvalid] = useState(false);

  function handleChangeEmail(event) {
    setEnteredEmail(event.target.value);
  }

  function handleSubmitForm(event) {
    event.preventDefault();
    // las strings se entienden como array de caracteres
    const emailIsValid = enteredEmail.includes('@'); 
    setInputIsInvalid(!emailIsValid);
  }

  return (
    <section>
      <form onSubmit={handleSubmitForm}>
        <label htmlFor="email">Your email</label>
        <input type="text" id="email" onChange={handleChangeEmail} />
        <button>Submit</button>
      </form>
      {inputIsInvalid && <p>Invalid email address entered!</p>}
    </section>
  );
}

export default App;