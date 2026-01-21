import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import HomePage from './componentes/HomePage.jsx'
import PostsListPage from './componentes/PostListPage.jsx'
import PostDetailPage from './componentes/PostDetailPage.jsx'
import Navbar from './componentes/Navbar.jsx'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <>
          <Navbar />
          <Outlet />
        </>
      ),
      children: [
        {
          index: true,
          element: <HomePage />
        },
        {
          path: 'posts',
          element: <PostsListPage />
        },
        {
          path: 'posts/:postId',
          element: <PostDetailPage />
        }
      ]
    }
  ])

  return <RouterProvider router={router} />
}

export default App
