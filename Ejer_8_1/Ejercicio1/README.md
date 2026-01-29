-- Pregunta 1 --

    Uso useReducer porque el carrito maneja varios datos que dependen entre sí. Si utilizo varios useState, al aumentar la cantidad de un producto tendría que actualizar los items y el total por separado,lo que me puede provocar errores ya que se podría liar y utilizar un estado mas antiguo.


-- Pregunta 2 --

    Si un componente que no tiene nada que ver con el carrito se vuelve a renderizar, probablemente sea porque su componente padre se está re-renderizando. Con React DevTools se puede revisar qué es lo que está causando ese re-render.