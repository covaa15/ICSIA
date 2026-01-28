import ToastItem from "./ToastItem.jsx";

export default function ContenedorToast({ errores, borrarError }) {
  return (
    <div className="toasts">
      <h2>Errores activos ({errores.length})</h2>

      {errores.map(error => (
        <ToastItem
          key={error.id}
          error={error}
          onClose={borrarError}
        />
      ))}
    </div>
  );
}

