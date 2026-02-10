import { useRouteError } from 'react-router-dom'

export default function ErrorPage() {

  const error = useRouteError()

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Hay un error</h1>
      <p>No se pudieron cargar los datos.</p>
      <pre>{error.message}</pre>
    </div>
  )
}
