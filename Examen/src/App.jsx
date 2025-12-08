import React, { useState, useMemo } from 'react';

// Import de componentes
import UserSelectionScreen from './components/UserSelectionScreen';
import Dashboard from './components/Dashboard';
import TransactionHistory from './components/TransactionHistory';
import TransactionForm from './components/TransactionForm';
import Modal from './components/Modal';

// Import de datos iniciales
import usersData from './data/users.json';
import accountsData from './data/accounts.json';
import transactionsData from './data/transactions.json';
import categoriesData from './data/categories.json';

// Import de estilos
import './App.css';


function App() {
  // --- GESTIÓN DE ESTADO ---
  // declaras los estados de la aplicacón, por ejemplo,
  // para las transacciones:
  const [transacciones, setTransacciones] = useState(transactionsData);
  const [currentUser, setCurrentUser] = useState(null);
  const [isModalOpen, setModalAbierto] = useState(false);


  // --- MANEJADORES DE EVENTOS ---
  // TODO: Implementa la lógica de las funciones manejadoras de eventos.
  // por ejemplo, algunos posibles serían


  function handleAddTransaction(nuevaTransaccion) {
    // Pista: Añade la nueva transacción al principio de la lista de transacciones.
    setTransacciones(prev => [nuevaTransaccion, ...prev]);
  }

function handleDeleteTransaction(idTransaccion) {
   // Pista: Filtra la lista de transacciones para eliminar la que coincida con el ID.
    setTransacciones(transacciones.filter(transaccion => transaccion.id !== idTransaccion));
   }
  function handleFilterChange(newFilters) {
    // Pista: Actualiza el estado de los filtros.
  }


  // --- DATOS DERIVADOS Y CÁLCULOS ---
  //Cálculos necesarios para la funcionalidad de la app,
  // por ejemplo algunos de ellos serían:

  // TODO: 1. Calcula las cuentas que pertenecen al usuario actual ('currentUser').
  const userAccounts = useMemo(() => {
    return accountsData.filter(cuenta => cuenta.userId === currentUser?.id);
  }, [currentUser]); // Reemplaza esto con tu lógica (p. ej., usando useMemo y .filter())

  // TODO: 2 Calcula el resumen para el Dashboard (solo el patrimonio neto).
  // Pista: Suma los saldos de todas las cuentas del usuario.
  const dashboardSummary = useMemo(() => {
    return userAccounts.reduce((total, acumulador) => total + acumulador.balanceInicial, 0);
  }, [userAccounts]);//Reemplaza esto por la operación correcta

  // TODO: 3 Filtrar as transacciones que se mostrarán en el historial.
  // Pista: Empieza con las transacciones del usuario y luego aplica el filtro de cuenta.
    const filtroTransacciones = useMemo(() => {
    return transacciones.filter(transaccion =>
      userAccounts.some(cuenta => cuenta.id === transaccion.accountId)
    );
  }, [transacciones, userAccounts]); // Reemplaza esto

  // --- LÓGICA DE RENDERIZADO ---

  // Al iniciar muestra la pantalla de selección de usuario.
  if (!currentUser) {
    return <UserSelectionScreen usuarios={usersData} usuarioSeleccionado={setCurrentUser} />;
  }

  // Si hay un usuario, muestra la aplicación principal.
  return (
    <>
      <header className="app-header">
        <h1>Gestor de Finanzas</h1>
        <div className="user-selector">
          <span>Bienvenido {currentUser.nombre}</span>
          <button onClick={() => setCurrentUser(null)}>Cambiar Usuario</button>
        </div>
      </header>
      <main className="container">
        <div className="main-layout">
          <Dashboard cuentas={userAccounts} patrimonio={dashboardSummary} />
          <TransactionHistory
            transacciones={filtroTransacciones}
            cuentas={userAccounts}
            categorias={categoriesData}
            borrarTransaccion={handleDeleteTransaction}
            abrirVentanaModal={() => setModalAbierto(true)}
          />
        </div>
      </main>

      {/* TODO: Pasa las props necesarias al Modal y al Formulario */}
      <Modal ventanaAbierta={isModalOpen} cerrarVentana={() => setModalAbierto(false)}>
        <TransactionForm
          cuentas={userAccounts}
          categorias={categoriesData}
          añadirTransaccion={handleAddTransaction}
          cerrarVentana={() => setModalAbierto(false)}
        />
      </Modal>
    </>
  );
}

export default App;
