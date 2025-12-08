import React from 'react';

function TransactionItem({ transaccion, nombreCuenta, catgoria, borrarTransaccion }) {
  // TODO: Recibe las props adecuadas

  const sign = transaccion.tipo === 'ingreso' ? '+' : '-';

  return (
    <li className="transaction-item">
      <div className="transaction-icon">
        {/* TODO: Muestra la imagen del icono de la categoría */}
        <img src={catgoria.icono} alt={catgoria.nombre} />
      </div>
      <div className="transaction-details">
        {/* TODO: Muestra la descripción de la transacción */}
        <span className="description">{transaccion.descripcion}</span>
        {/* TODO: Muestra la fecha y el nombre de la cuenta */}
        <span className="meta">{transaccion.fecha} | {nombreCuenta}</span>
      </div>
      <div className="transaction-amount">
        {/* TODO: Muestra el monto formateado, con un '+' o '-' delante */}
        {sign}{transaccion.monto.toFixed(2)} €
        {/* TODO: Llama a la función que elimina la transación */}
        <button className="delete-btn" onClick={() => borrarTransaccion(transaccion.id)}>
          &times;
        </button>
      </div>
    </li>
  );
}

function TransactionHistory({ transacciones, cuentas, categorias, borrarTransaccion, abrirVentanaModal }) {
  /* 
    TODO: Recibe las props adecuadas

    programar eventos necesarios
  */

  return (
    <div className="card">
      <div className="history-header">
        <h2>Historial de Transacciones</h2>
        {/* TODO: Abre el modal para añadir una transacción al hacer clic en este botón */}
        <button className="primary-action-btn" onClick={abrirVentanaModal}>
          Añadir Transacción
        </button>
      </div>
      <ul className="transaction-list">
        {/* 
          TODO: Transaciones
          Por cada transación ..........
          No olvides pasarle todas las props que necesita.
        */}
        {transacciones.map(transaccion => {
          const cuenta = cuentas.find(acc => acc.id === transaccion.accountId);
          const categoria = categorias[transaccion.categoriaId];

          return (
            <TransactionItem
              key={transaccion.id}
              transaccion={transaccion}
              nombreCuenta={cuenta?.nombre}
              catgoria={categoria}
              borrarTransaccion={borrarTransaccion}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default TransactionHistory;

