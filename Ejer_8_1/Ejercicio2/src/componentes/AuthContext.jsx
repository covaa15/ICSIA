import { createContext, useContext, useState } from "react";

// Guardo el usuario que esta seleccionado en el select
const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [usuarioActual, setUsuarioActual] = useState("Ana");

  return (
    <AuthContext.Provider value={{ usuarioActual, setUsuarioActual }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
