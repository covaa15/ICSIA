//Declarativo
const { useState } = React;
function CounterApp() {
  const [count, setCount] = useState(0);
    //JSX = JavaScript + XML (HTML)
  return (
    <div>
          <h1>Contador: {count}</h1>
          <button onClick={() => setCount(count + 1)}>Incrementar</button>
    </div>
  );
}