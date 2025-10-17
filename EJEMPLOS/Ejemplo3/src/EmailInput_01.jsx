export default function EmailInput_01() {
  return (
    <div>
      <input placeholder="Tu correo electrónico" type="email" />
      <p></p>
    </div>
  );
};
const input = document.querySelector("input");
const errorParagraph = document.querySelector("p");

function evaluateEmail(event) {
  const enteredEmail = event.target.value;
  if (enteredEmail.trim() === "" || !enteredEmail.includes("@")) {
    errorParagraph.textContent = "La dirección de correo electrónico introducida no es válida.";
  } else {
    errorParagraph.textContent = "";
  }
};
input.addEventListener("blur", evaluateEmail); 
