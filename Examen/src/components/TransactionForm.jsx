//src2/components/TransactionForm.jsx
import React, { useState, useEffect } from 'react';

function TransactionForm({ cuentas,categorias, añadirTransaccion, cerrarVentana }) {
  /* 
    TODO: Recibe las props adecuadas
  */

  // estado inicial del formulario
  const [fomularioDatos, setFormularioDatos] = useState({
    description: '',
    amount: '',
    type: 'gasto',
    accountId: '',
    categoryId: ''
  });

  const filtroCategorias = Object.entries(categorias).filter(
    ([, cat]) => cat.tipo === fomularioDatos.type
  );

  function handleChange(e) {
    setFormularioDatos({ ...fomularioDatos, [e.target.name]: e.target.value });
  }

  // Eventos de manejo de formulario, por ejemplo:
  function handleSubmit(e) {
    e.preventDefault();

    // TODO: Validar que todos los campos estén completos.
    if (!Object.values(fomularioDatos).every(Boolean)) return alert('Completa todos los campos');

    // TODO: añade los datos de la nueva transacción llamando a la prop adecuada.
    añadirTransaccion({
      ...fomularioDatos,
      id: crypto.randomUUID(),
      fecha: new Date().toISOString().split('T')[0],
      monto: Number(fomularioDatos.amount)
    });

    // Pista: Limpia el formulario después de enviarlo.
    setFormularioDatos({
      description: '',
      amount: '',
      type: 'gasto',
      accountId: '',
      categoryId: ''
    });
    cerrarVentana();
  }

  return (
    <div className="card">
      <h2>Nueva Transacción</h2>
      <div className="transaction-form">

        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="description">Descripción</label>
            <input
              type="text"
              id="description"
              name="description"
              value={fomularioDatos.description}
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Monto</label>
            <input
              type="number"
              id="amount"
              name="amount"
              step="0.01"
              value={fomularioDatos.amount}
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label htmlFor="type">Tipo</label>
            <select id="type" name="type" value={fomularioDatos.type} onChange={handleChange}>
              <option value="gasto">Gasto</option>
              <option value="ingreso">Ingreso</option>
            </select>
          </div>
          <div className="form-control">
            <label htmlFor="accountId">Cuenta</label>
            {/* TODO: Cuentas */}
            <select id="accountId" name="accountId" value={fomularioDatos.accountId} onChange={handleChange}>
              <option value="" disabled>Selecciona una cuenta</option>
              {cuentas.map(cuenta => (
                <option key={cuenta.id} value={cuenta.id}>{cuenta.nombre}</option>
              ))}
            </select>
          </div>
          <div className="form-control">
            <label htmlFor="categoryId">Categoría</label>
            {/* Pista: Las categorías mostradas deberían depender del 'tipo' (ingreso/gasto) seleccionado */}
            <select id="categoryId" name="categoryId" value={fomularioDatos.categoryId} onChange={handleChange}>
              <option value="" disabled>Selecciona una categoría</option>
              {filtroCategorias.map(([id, categoria]) => (
                <option key={id} value={id}>{categoria.nombre}</option>
              ))}
            </select>
          </div>
          <button type="submit">Añadir Transacción</button>
        </form>
      </div>
    </div>
  );
}

export default TransactionForm;







