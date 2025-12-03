## Analisis Código Inicial

    1. Se utilizaba el index como clave
        
            En el .map() se usa el index como clave y eso está mal, porque se necesita una clave única para identificar cada artículo, ya que 
            si se borra o se cambia el orden de uno, los articulos se mostrarian mal.Para solucionar este problema, lo que habría que hacer es 
            utilizar el id del artículo como clave.

    2.El filtro de Busqueda se realiza en el map

            El filtro de busqueda se está haciendo en el map(), devolviendo null cuando no hay y a parte que se tienen que recorrer todos los articulos aunque no sea necesario.Lo mejor sería filtrar antes del map() y asi solo se muestran los que cumplen con la busqueda.

    3. Input de Busqueda
        
             En el input de búsqueda no se está usando el value, solo el onChange, y eso está mal porque puede hacer que el campo no se actualice bien o cause errores
    
    4. Articulos fijados como pinned

             Los artículos que están fijados pinned deberían aparecer antes que el resto, algo que no essta succediendo. Para solucionar esto, lo que se podria hacer es hacer un sort(), antes del filtrado y el mapeo para que los elementos fijados se muestren siempre al principio.


## ¿Por qué es fundamental el uso de key para el rendimiento y la identidad del elemento en React?

Las keys son fundamentales porque permiten identificar cada elemento de una lista. Gracias a eso, cuando algo cambia, solo se actualizan los elementos necesarios y no toda la lista completa.

## Ejercicio 5.2

https://ejercicio5-2cova.netlify.app/




