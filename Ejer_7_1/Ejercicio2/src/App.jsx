import { useState, useMemo } from "react";
import SearchInput from "./componentes/SearchInput.jsx";
import UserList from "./componentes/UserList.jsx";
import './css/style.css';

const usuarios = Array.from({ length: 10000 }, (_, indice) => ({
  id: indice,
  nombre: `Nombre${indice}`,
  email: `usuario${indice + 1}@ejemplo.com`,
  empresa: `Empresa ${indice % 20 + 1} S.A.`,
}));

export default function App() {
  const [search, setSearch] = useState("");

  const usuariosFiltrados = useMemo(() => {
    return usuarios.filter(usuario =>
      usuario.nombre.toLowerCase().includes(search.toLowerCase()) ||
      usuario.email.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div>
      <SearchInput value={search} onChange={setSearch} />
      <UserList usuarios={usuariosFiltrados} />
    </div>
  );
}
