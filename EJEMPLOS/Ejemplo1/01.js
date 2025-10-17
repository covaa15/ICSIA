    // Evento que se dispara cuando el contenido
    //  del DOM ha sido completamente cargado
    window.addEventListener('DOMContentLoaded', () => {
        // Seleccionar el div contenedor
      const contenedor = document.getElementById('contenido');

      // Crear párrafo
      const parrafo = document.createElement('p');
      // Añadir texto al párrafo
      parrafo.textContent = 'Este es un párrafo añadido automáticamente al cargar la página.';
      // resultado de las dos líneas anteriores, tengo 
      // <p>Este es un párrafo añadido automáticamente al cargar la página.</p>    
      // Añadir el párrafo al contenedor
      contenedor.appendChild(parrafo);

      // Crear lista
      const lista = document.createElement('ul');
      // Añadir elementos a la lista
      ['Elemento A', 'Elemento B', 'Elemento C'].forEach(texto => {
        const item = document.createElement('li');
        item.textContent = texto;
        lista.appendChild(item);
      });
      // Añadir la lista al contenedor
      contenedor.appendChild(lista);

      // Crear imagen
      const imagen = document.createElement('img');
      // Añadir atributos a la imagen
      imagen.src = 'https://picsum.photos/530/300';
      imagen.alt = 'Imagen de ejemplo';
      imagen.style.marginTop = '10px';
      // Añadir la imagen al contenedor
      contenedor.appendChild(imagen);
    });
