import { AuthProvider } from "./componentes/AuthContext.jsx";
import { TasksProvider } from "./componentes/TasksContext.jsx";
import SelectorUsuario from "./componentes/SelectorUsuario.jsx";
import ListaTareas from "./componentes/ListaTareas.jsx";
import UserInfo from "./componentes/UserInfo.jsx";
import "./css/style.css";
// Componente principal de la aplicación
function App() {
  return (
    <AuthProvider>
      <TasksProvider>
        <div className="app-container">
          <div className="card">

            <header className="header">
              <h1>Ejercicio 2: Tareas Multi-usuario</h1>

              <div className="user-bar">
                <div>
                  Usuario Actual: <SelectorUsuario />
                </div>

                <div className="logged">
                  Logueado como: Ana
                </div>
              </div>
            </header>

            <ListaTareas />

          </div>
        </div>
      </TasksProvider>
    </AuthProvider>
  );
}

export default App;