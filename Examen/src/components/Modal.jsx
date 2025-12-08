import React from 'react';

function Modal({ ventanaAbierta, cerrarVentana, children }) {
  // le faltan las props...
  if (!ventanaAbierta) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={cerrarVentana}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={cerrarVentana}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
