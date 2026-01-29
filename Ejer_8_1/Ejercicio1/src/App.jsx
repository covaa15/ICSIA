import { useReducer, useCallback, useMemo } from "react";
import productos from "./datos/productos.json";
import ListaProductos from "./componentes/ListaProductos.jsx";
import Carrito from "./componentes/Carrito.jsx";
import "./css/style.css";

const estadoInicial = {
  items: []
};

function carritoReducer(state, action) {
  switch (action.type) {
    case "AGREGAR": {
      const existe = state.items.find(i => i.id === action.producto.id);

      if (existe) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.producto.id
              ? { ...item, cantidad: item.cantidad + 1 }
              : item
          )
        };
      }

      return {
        ...state,
        items: [
          ...state.items,
          {
            id: action.producto.id,
            nombre: action.producto.nombre,
            precio: action.producto.precio,
            cantidad: 1
          }
        ]
      };
    }

    case "INCREMENTAR":
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      };

    case "DECREMENTAR":
      return {
        ...state,
        items: state.items
          .map(item =>
            item.id === action.id
              ? { ...item, cantidad: item.cantidad - 1 }
              : item
          )
          .filter(item => item.cantidad > 0)
      };

    case "ELIMINAR":
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.id)
      };

    default:
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(carritoReducer, estadoInicial);

  const agregar = useCallback(
    producto => dispatch({ type: "AGREGAR", producto }),
    []
  );

  const incrementar = useCallback(
    id => dispatch({ type: "INCREMENTAR", id }),
    []
  );

  const decrementar = useCallback(
    id => dispatch({ type: "DECREMENTAR", id }),
    []
  );

  const eliminar = useCallback(
    id => dispatch({ type: "ELIMINAR", id }),
    []
  );

  const total = useMemo(
    () =>
      state.items.reduce(
        (acc, item) => acc + item.precio * item.cantidad,
        0
      ),
    [state.items]
  );

  return (
    <div className="app">
      <h1>Ejercicio 1: Carrito de la Compra</h1>

      <div className="layout">
        <ListaProductos productos={productos} onAgregar={agregar} />
        <Carrito
          items={state.items}
          onIncrementar={incrementar}
          onDecrementar={decrementar}
          onEliminar={eliminar}
          total={total}
        />
      </div>
    </div>
  );
}
