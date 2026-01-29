-- Pregunta 1 --

    Separar el AuthContext y el TasksContext es buena práctica porque así evitamos renders innecesarios.

    Si todo estuviera en un solo contexto, cuando cambia una tarea también se volvería a renderizar UserInfo, aunque el usuario no haya cambiado.Al separarlos, cada componente solo se renderiza cuando cambia la información que usa.


-- Pregunta 2 --

    Cuando cambio el usuario en el <select>, se actualiza el AuthContext y todos los TaskItem se vuelven a renderizar aunque las tareas no hayan cambiado.

    Si envuelvo TaskItem en React.memo, deja de renderizarse si sus props no cambian. Pero eso no basta, porque si sigue usando el contexto, al cambiar el usuario igual se renderiza.

    Para que funcione correctamente, tengo que pasarle solo lo que necesita por props y no depender del contexto dentro del componente.