-- Rendimiento Profiler Antes de utilizar el useCallback y el React.memo()--

    - Añado el primer error:

           ![alt text](./src/img/image-1.png)


    - Añado el segundo error:
    
           ![alt text](./src/img/image-2.png) 

            
    - Añado el tercer error:
    
            ![alt text](./src/img/image-3.png)


     - Añado el cuarto error:
    
            ![alt text](./src/img/image-4.png) 


     - Elimino el primer error:
    
            ![alt text](./src/img/image-5.png)


     - Elimino todos errores:
    
            ![alt text](./src/img/image-6.png)




-- Codigo Antes de las modificaciones -- 

    - App.jsx:

            ![alt text](./src/img/image-7.png)

            ![alt text](./src/img/image-8.png)


    - ToastContainer.jsx:

            ![alt text](./src/img/image-9.png)

    
    - ToastItem.jsx

            ![alt text](./src/img/image-10.png)



-- Codigo Después de las modificaciones -- 

    - App.jsx

        ![alt text](./src/img/image-11.png)

        ![alt text](./src/img/image-12.png)

    
    - ToastContainer.jsx:

            ![alt text](./src/img/image-13.png)

    
    - ToastItem.jsx

            ![alt text](./src/img/image-14.png)



-- Rendimiento Profiler Después de utilizar el useCallback y el React.memo()--

    - Añado el primer error:

           ![alt text](./src/img/image-15.png)


    - Añado el segundo error:
    
           ![alt text](./src/img/image-16.png)

            
    - Añado el tercer error:
    
            ![alt text](./src/img/image-17.png)


     - Añado el cuarto error:
    
            ![alt text](./src/img/image-18.png)


     - Elimino el primer error:
    
            ![alt text](./src/img/image-19.png)


     - Elimino todos errores:
    
            ![alt text](./src/img/image-20.png)


Realice estas modificaciones porque antes cada vez que agregaba o eliminaba un error, todos los componentes del ToastItem se volvian a renderizar, debido a que le pasaba funciones inlines como props y React las consideraba como nuevas en cada render.

Para mejorar el rendimiento, lo que hice fue utilizar useCallback en la funcion borrarError y React.memo en el ToastItem, para evitar asi renders innecesarios y que solo se renderice el Toast que esta cambiando.

Funcion borrarError, aqui utilizo el useCallback:

        ![alt text](./src/img/image-21.png)

ToastItem donde utilizo el React.memo
        
        ![alt text](./src/img/image-22.png)