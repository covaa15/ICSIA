-- Pregunta 1 --

    He usado useMemo para calcular el color de la sombra en CardPreview, ya que no es un dato principal del tema y no hace falta guardarlo en el contexto, evitando asi añadir un estado innecesario y el cálculo solo se hace cuando cambia el color principal.