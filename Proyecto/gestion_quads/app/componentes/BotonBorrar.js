//Mensaje  confirmacion
"use client";

export default function BotonBorrar({ mensaje, className, children }) {
  return (
    <button
      type="submit"
      className={className}
      onClick={(e) => {
        if (!confirm(mensaje)) {
          e.preventDefault();
          e.stopPropagation();
        }
      }}
    >
      {children}
    </button>
  );
}