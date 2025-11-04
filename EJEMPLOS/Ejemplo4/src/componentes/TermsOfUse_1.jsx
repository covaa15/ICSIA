import { useState } from "react";
 
export default  function TermsOfUse() {
  const [showTerms, setShowTerms] = useState(false);
  function handleShowTermsSummary() {
    setShowTerms(true);
  }
  let paragraph;
  if (showTerms) {
    paragraph = <p>Al continuar, aceptas que no te indemnizaremos por ningún daño o perjuicio causado por nuestros productos.</p>;
  }
  return (
    <section>
      <button onClick={handleShowTermsSummary}>
       Mostrar resumen de las condiciones de uso
      </button>
       {paragraph}
    </section>
  );
}

