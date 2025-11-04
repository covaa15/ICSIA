import { useState } from 'react';

function App() {
  // usamos dos estados
  // uno para el texto introducido y otro para la lista de tareas
  const [enteredTodoText, setEnteredTodoText] = useState('');
  const [todos, setTodos] = useState([]);

  function handleChangeTodoText(event) {
    setEnteredTodoText(event.target.value);
  }

  function handleAddTodo(event) {
    event.preventDefault();
    // como tenemos que tener un campo de id distinto para cada tarea,
    // usamos la fecha actual en formato ISO como id
    setTodos((curTodos) => [
      { id: new Date().toISOString(), text: enteredTodoText },
      ...curTodos,
    ]);
    setEnteredTodoText('');
  }

  return (
    <>
    {/* // meto el manejador en el formulario */}
    {/* // podría ir también en el botón  */}
      <form onSubmit={handleAddTodo}>
        <label>Tareas</label>
        <input
          type="text"
          onChange={handleChangeTodoText}
          value={enteredTodoText}
        />
        <button>Añadir Tarea</button>
      </form>
      <ul>
        {todos.map((todo) => (
          // el map de react necesita un key único para cada elemento
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </>
  );
}

export default App;