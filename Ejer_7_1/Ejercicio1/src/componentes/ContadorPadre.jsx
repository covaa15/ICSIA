import { useMemo, useState } from "react";
import ListaIntermedia from "./ListaIntermedia.jsx";

export default function ContadorPadre() {
  console.log("ContadorPadre render");

  const [count, setCount] = useState(0);

  const users = useMemo(() => {
    return Array.from({ length: 500 }, (_, i) => ({
      id: i + 1,
      name: `Usuario ${i + 1}`,
      email: `user${i + 1}@ejemplo.com`,
      avatar: `https://i.pravatar.cc/150?img=${(i + 1) % 70 + 1}`,
      isOnline: Math.random() > 0.5,
    }));
  }, []);

  return (
    <div>
      <h2>Contador local: {count}</h2>
      <button onClick={() => setCount(c => c + 1)}>+1 local</button>
      <ListaIntermedia users={users} />
    </div>
  );
}