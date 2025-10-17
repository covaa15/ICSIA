export default function EmailInput_02() {
  let errorMessage = "";

  function evaluateEmail(event) {
    const enteredEmail = event.target.value;
    if (enteredEmail.trim() === "" || !enteredEmail.includes("@")) {
      errorMessage = "La dirección de correo electrónico introducida no es válida.";
    } else {
      errorMessage = "";
    }
  };
  
  const input = document.querySelector("input");
  input.addEventListener("blur", evaluateEmail);
  return (
    <div>
      <input placeholder="Tu correo electrónico" type="email" />
      <p>{errorMessage}</p>
    </div>
  );
}; 

