import { useState } from "react";
export default function Counter() {
const [counter, setCounter] = useState(0);

  function handleIncrement() {
    setCounter(function(prevCounter) { return prevCounter + 1; });
// alternativamente, se podrían utilizar funciones flecha JS:
// setCounter(prevCounter => prevCounter + 1);
};
return (
    <>
      <p>Counter Value: {counter}</p>
      <button onClick={handleIncrement}>Increment</button>
    </>
  );
};
