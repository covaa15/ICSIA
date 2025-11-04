import { useState } from "react";
 
export default  function TermsOfUse() {
  const [showTerms, setShowTerms] = useState(false);
  function handleShowTermsSummary() {
    setShowTerms(true);
  }
  // con operador ternario
  const paragraph = showTerms ? <p>Al continuar, aceptas que no te indemnizaremos por ningún daño o perjuicio causado por nuestros productos.</p> : null;
return (
    <section>
      <button onClick={handleShowTermsSummary}>
         Mostrar resumen de los términos de uso
      </button>
      { paragraph }
    </section>
  );
} 


