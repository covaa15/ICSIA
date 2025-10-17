
// 1 sin props
// export default function Tarea() {

// 2 con props
//declarar props, sino no funciona
// export default function Tarea(props) {

// 3 desestructurar props que llegan como objeto
// export default function Tarea({datos:{id, contenido}}) {

// 4 con props y children
// export default function Tarea(props) {

//5 con objeto desestructurado y children
// export default function Tarea({children,datos:{id, contenido}}) {

// 6 un objeto que no deestructuro y children 
// export default function Tarea({children,datos}) {

// 7 vienen ya desestructuradas 
export default function Tarea({children,id,contenido}) {

// 
  return (
    // 1 sin props
    <li>Tarea 1</li>

    // 2 con props
    // <li> Id:({props.id}) Tarea: {props.contenido} </li>
    // 2 con props y template string
    // <li> {`Id:(${props.id}) -> Tarea: ${props.contenido}`}  </li>

    // 3 desestructurar props que llegan como objeto
    // <li> {`Id:(${id}) -> Tarea: ${contenido}`}  </li>
    

    // 4 con props y children dentro de las props
    // <li> {props.children} Id:({props.id}) Tarea: {props.contenido} </li>


    // 5 con objeto desestructurado y children fuera de las props
    // <li>{`${children} Id:(${id}) -> Tarea: ${contenido}`}</li>


    // 6 un objeto que no deestructuro y children 
    // <li>{`${children} Id:(${datos.id}) -> Tarea: ${datos.contenido}`}</li>

    // 7 ya desestructuradas y children 
    // <li>{`${children} Id:(${id}) -> Tarea: ${contenido}`}</li>

    //

    //con operador de propagación  no se puede usar en una etiqueta
    // esto da error, React no sabe renderizar un objeto
    //  <li >{...datos}.</li>

    // podría convertirse en una cadena con lo de abajo pero lo 
    // muestra con sintaxis de objeto
    //  <li >{JSON.stringify(datos)}</li>
      
    // si fueran atributos del li si funcionaría
    //  <li {...datos}> {children}  </li>    
  )
}
