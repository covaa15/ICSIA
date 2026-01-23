-- Pregunta 3 --

VERSION SIN OPTIMIZAR:

    BUSQUEDA POR NOMBRE:

        ![alt text](./img/image.png)

        ![alt text](./img/image-1.png)

        ![alt text](./img/image-2.png)

        ![alt text](./img/image-3.png)

        ![alt text](./img/image-4.png)

        ![alt text](./img/image-5.png)

        ![alt text](./img/image-6.png)


    BUSQUEDA POR CORREO:

        ![alt text](./img/image-7.png)

        ![alt text](./img/image-8.png)

        ![alt text](./img/image-9.png)

        ![alt text](./img/image-10.png)

        ![alt text](./img/image-11.png)

        ![alt text](./img/image-12.png)

        ![alt text](./img/image-13.png)

        ![alt text](./img/image-14.png)

        ![alt text](./img/image-15.png)


--  La aplicación va muy lenta ¿Cuáles son sus puntos débiles? -- 

        - Cada vez que escribo en el buscador se vuelve a renderizar toda la lista de usuarios.

        - Las tarjetas de usuario se renderizan aunque no cambien sus datos

        - El filtro se ejecuta en cada renderizado




VERSION OPTIMIZADA:

    BUSQUEDA POR NOMBRE:

        ![alt text](./img/image-16.png)

        ![alt text](./img/image-17.png)

        ![alt text](./img/image-18.png)

        ![alt text](./img/image-19.png)

        ![alt text](./img/image-20.png)

        ![alt text](./img/image-21.png)

        ![alt text](./img/image-22.png)


    BUSQUEDA POR CORREO:

        ![alt text](./img/image-23.png)

        ![alt text](./img/image-24.png)

        ![alt text](./img/image-25.png)

        ![alt text](./img/image-26.png)

        ![alt text](./img/image-27.png)

        ![alt text](./img/image-28.png)

        ![alt text](./img/image-29.png)

        ![alt text](./img/image-30.png)

        ![alt text](./img/image-31.png)


--  ¿A mejorado la velocidad de la aplicación? -- 

        Sí, la velocidad de la aplicación ha mejorado muchísimo, ya que al usar useMemo se evita recalcular la lista de usuarios cada vez que el input cambia y además, no se renderizan las tarjetas que no han cambiado.


--  ¿qué cambios y por qué has hecho?  -- 

        - En App, añadi useMemo en el filter para que memorice el resultado de usuarios.filter y solo se recalcule cuando el search cambia.

            const usuariosFiltrados = useMemo(() => {
                 return usuarios.filter(usuario =>
                    usuario.nombre.toLowerCase().includes(search.toLowerCase()) ||
                    usuario.email.toLowerCase().includes(search.toLowerCase())
                );
            }, [search]);


        - En UserCard, volví a utilizar el useMemo para que si los props que se le pasan no cambian React no vuelva a renderizar todas las tarjetas cada vez que el usuario escribe en el input       

            const UserCard = memo(function UserCard({ usuario }) {

                //Contenido Metodo

            });