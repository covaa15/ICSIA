export default function EmailInput_03() {
  let errorMessage = "";

  function evaluateEmail(event) {
    console.log("Hello");
    const enteredEmail = event.target.value;
    if (enteredEmail.trim() === "" || !enteredEmail.includes("@")) {
      errorMessage = "La dirección de correo electrónico introducida no es válida.";
	} else {
      errorMessage = "";
    }
     console.log(errorMessage);
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

