import { NavLink } from 'react-router-dom'
import { useState } from 'react'

export default function ListaPaises({ paises = [] }) {
  // Texto del buscador
  const [busqueda, setBusqueda] = useState('')

  // Tipo de orden seleccionado
  const [orden, setOrden] = useState('nombre-asc')

  //Filtro por nombre
  let paisesFiltrados = paises.filter(pais =>
    pais.name.common.toLowerCase().startsWith(busqueda.toLowerCase())
  )

  // Ordeno segun la opcion elegida
  if (orden === 'nombre-asc') {
    paisesFiltrados.sort((a, b) =>
      a.name.common.localeCompare(b.name.common)
    )
  }

  if (orden === 'nombre-desc') {
    paisesFiltrados.sort((a, b) =>
      b.name.common.localeCompare(a.name.common)
    )
  }

  return (
    <>
      <input
        type="text"
        placeholder="Buscar país..."
        value={busqueda}
        onChange={e => setBusqueda(e.target.value)}
        style={{ width: '100%', margin: '1rem 0', padding: '0.5rem' }}
      />

      <select
        value={orden}
        onChange={e => setOrden(e.target.value)}
        style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem' }}
      >
        <option value="nombre-asc">Nombre (A–Z)</option>
        <option value="nombre-desc">Nombre (Z–A)</option>
      </select>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {paisesFiltrados.map(pais => (
          <li key={pais.cca3} style={{ marginBottom: '0.5rem' }}>
            <NavLink
              to={`/country/${pais.name.common.toLowerCase()}`}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                textDecoration: 'none',
                padding: '0.5rem',
                background: isActive ? '#e0e7ff' : 'transparent'
              })}
            >
              <img src={pais.flags.svg} alt="" width="25" />
              {pais.name.common}
            </NavLink>
          </li>
        ))}
      </ul>
    </>
  )
}
