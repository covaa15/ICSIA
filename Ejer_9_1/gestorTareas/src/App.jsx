import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";

import RootLayout from "./Rooter/RootLayout.jsx";
import DashboardLayout from "./Rooter/DashboardLayout.jsx";

import HomePage from "./componentes/HomePage.jsx";
import TaskListPage from "./componentes/TaskListPage.jsx";
import TaskDetailPage from "./componentes/TaskDetailPage.jsx";
import NewTaskPage from "./componentes/NewTaskPage.jsx";
import NotFoundPage from "./componentes/NotFoundPage.jsx";

const ProfilePage = lazy(() => import("./componentes/ProfilePage.jsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },

      {
        path: "dashboard",
        element: <DashboardLayout />,
        children: [
          { index: true, element: <TaskListPage /> },
          { path: "new", element: <NewTaskPage /> },
          { path: "task/:taskId", element: <TaskDetailPage /> }
        ]
      },

      {
        path: "profile",
        element: (
          <Suspense fallback={<p>Cargando perfil...</p>}>
            <ProfilePage />
          </Suspense>
        )
      }
    ]
  },
  { path: "*", element: <NotFoundPage /> }
]);

export default function App() {
  return <RouterProvider router={router} />;
}
