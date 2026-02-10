import { Outlet, useLoaderData } from 'react-router-dom'
import ListaPaises from './ListaPaises.jsx'

export default function Layout() {
    // Obtengo los paises que cargo en el loader principal
    const paises = useLoaderData()

    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>

            <aside style={{ width: '35%', padding: '1rem', borderRight: '1px solid #ddd' }}>
                <h2>Países del Mundo</h2>
                <small>Datos cargados desde restcountries.com</small>

                <ListaPaises paises={paises} />
            </aside>

            <main style={{ width: '65%', padding: '2rem' }}>
                <Outlet />
            </main>
        </div>
    )
}
