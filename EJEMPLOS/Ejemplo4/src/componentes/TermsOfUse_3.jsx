import { useState } from "react";
 
export default  function TermsOfUse() {
  const [showTerms, setShowTerms] = useState(false);
  function handleShowTermsSummary() {
    setShowTerms(true);
  }
  return (
    <section>
      <button onClick={handleShowTermsSummary}>
        Mostrar resumen de los términos de uso
      </button>
      {/*inyectado directamente en el JSX*/}
      {showTerms ? <p>Al continuar, aceptas que no te indemnizaremos por ningún daño o perjuicio causado por nuestros productos.</p> : null}
      {/* con operador de cortocircuito */}
      {/* {showTerms && <p>Al continuar, aceptas que no te indemnizaremos por ningún daño o perjuicio causado por nuestros productos.</p>} */}
    </section>
  );
} 


