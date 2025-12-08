Ejercicio 5

¿Qué pasaría si no uso useCallback para envolver addPost?

    Si no uso useCallback, la función addPost se estaría creando de nuevo cada vez que el componente renderiza, aunque no toque nada del formulario.


¿Por qué el useEffect que depende de addPost se ejecutaría en cada render?

    Porque como la función se vuelve a crear cada vez que el componente se renderiza, React entiende que esa dependencia cambió, y entonces el useEffect se ejecuta otra vez aunque la función haga exactamente lo mismo.
