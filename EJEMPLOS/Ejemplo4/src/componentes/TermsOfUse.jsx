import { useState } from "react";
 
export default  function TermsOfUse() {
  const [showTerms, setShowTerms] = useState(false);
  function handleShowTermsSummary() {
    setShowTerms(true);
  }
  let paragraphText = "";
  if (showTerms) {
     paragraphText = "Al continuar, aceptas que no te indemnizaremos por ningún daño o   perjuicio causado por nuestros productos.";
  }
  return (
    <section>
      <button onClick={handleShowTermsSummary}>
         Mostrar resumen de las condiciones de uso
      </button>
      <p>{paragraphText}</p>
    </section>
  );
} 
