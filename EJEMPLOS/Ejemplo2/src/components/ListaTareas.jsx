import Tarea from "./Tarea";

export default function ListaTareas() {
    //  const tarea1={id:"1", contenido:"Ir al cine"}
    //  const tarea2={id:"2", contenido:"Comprar pan"}
    //  const tarea3={id:"3", contenido:"Estudiar"}
  return (
    <ul>
      {/* 1.- sin props */}
      <Tarea/>
      <Tarea/>
      <Tarea/>

      {/* 2.- con props */}
      {/* <Tarea id="1" contenido="Ir al cine"/>
      <Tarea id="2" contenido="Comprar pan"/>
      <Tarea id="3" contenido="Estudiar"/> */}

      {/* 3.- props como un objeto*/}
    
      {/* <Tarea datos={tarea1}></Tarea>
      <Tarea datos={tarea2}></Tarea>
      <Tarea datos={tarea3}></Tarea> */}


      {/* 4.- con props children */}
      {/* <Tarea id="1" contenido="Ir al cine">Tarea 1</Tarea>
      <Tarea id="2" contenido="Comprar pan">Tarea 2</Tarea>
      <Tarea id="3" contenido="Estudiar">Tarea 3</Tarea>         */}

    


    {/* 5.- y 6.- con un objeto y CON chidren */}
    {/* <Tarea datos={tarea1}>Tarea 1</Tarea>
    <Tarea datos={tarea2}>Tarea 2</Tarea>
    <Tarea datos={tarea3}>Tarea 3 </Tarea> */}

    {/* 7.- operador de propagacion en la la llamada */}
     {/* <Tarea {...tarea1}>Tarea 1</Tarea>
     <Tarea {...tarea2}>Tarea 2</Tarea>
    <Tarea {...tarea3}>Tarea 3 </Tarea> */}

    </ul>    
  )
}
