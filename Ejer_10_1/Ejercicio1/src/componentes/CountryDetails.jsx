import { useParams, useRouteLoaderData, Link } from 'react-router-dom'

export default function CountryDetails() {
  // Nombre del pais desde la URL
  const { nombrePais } = useParams()

  const paises = useRouteLoaderData('root') || []

  // Busco el pais que coincide con la URL
  const pais = paises.find(
    pais => pais.name.common.toLowerCase() === nombrePais
  )

  // Si el pais no existe
  if (!pais) {
    return <h2>País no encontrado</h2>
  }

  // Idiomas 
  const idiomas = pais.languages
    ? Object.values(pais.languages).join(', ')
    : 'No disponible'

  // Paises fronterizos
  const fronteras = pais.borders || []

  const paisesFronterizos = fronteras
    .map(codigo => paises.find(pais => pais.cca3 === codigo))
    .filter(Boolean)

  return (
    <>
      <img src={pais.flags.svg} alt="" width="150" />
      <h1>{pais.name.official}</h1>

      <ul>
        <li><strong>Capital:</strong> {pais.capital?.[0]}</li>
        <li><strong>Población:</strong> {pais.population.toLocaleString()}</li>
        <li>
          <strong>Continente:</strong> {pais.region} ({pais.subregion})
        </li>
        <li><strong>Idiomas:</strong> {idiomas}</li>
      </ul>

      <h3>Países Fronterizos</h3>

      {paisesFronterizos.length === 0 && (
        <p>No tiene fronteras</p>
      )}

      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {paisesFronterizos.map(paisFrontera => (
          <Link
            key={paisFrontera.cca3}
            to={`/country/${paisFrontera.name.common.toLowerCase()}`}
            style={{
              padding: '0.3rem 0.6rem',
              background: '#1d4ed8',
              color: 'white',
              borderRadius: '4px',
              textDecoration: 'none'
            }}
          >
            {paisFrontera.name.common}
          </Link>
        ))}
      </div>
    </>
  )
}
