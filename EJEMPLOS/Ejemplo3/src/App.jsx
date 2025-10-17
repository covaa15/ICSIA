import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SearchBar from './SearchBar.jsx'
import Overview from './Overview.jsx'

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  function handleUpdateSearchTerm(event) {
    setSearchTerm(event.target.value);
  };

  return (
    <>
    {/* //paso una función como prop, también se puede hacer */}
      <SearchBar onUpdateSearch={handleUpdateSearchTerm} />
      <Overview currentTerm={searchTerm} />
    </>
  );
}

export default App
