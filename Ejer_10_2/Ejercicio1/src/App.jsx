import { createBrowserRouter } from "react-router-dom";

import RootLayout from "./routes/RootLayout.jsx";
import HomePage from "./routes/HomePage.jsx";
import ProjectsPage, { loader as proyectosLoader } from "./routes/ProjectsPage.jsx";
import ProjectDetailsPage, {loader as proyectoLoader,action as proyectoAction} from "./routes/ProjectDetailsPage.jsx";
import NewProjectPage, { action as nuevoProyectoAction } from "./routes/NewProjectPage.jsx";
import NewTaskPage, { action as nuevaTareaAction } from "./routes/NewTaskPage.jsx";

// Creo todas las rutas de la aplicación
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },

      {
        path: "projects",
        children: [
          {
            index: true,
            element: <ProjectsPage />,
            loader: proyectosLoader
          },
          {
            path: "new",
            element: <NewProjectPage />,
            action: nuevoProyectoAction
          },
          {
            path: ":projectId",
            element: <ProjectDetailsPage />,
            loader: proyectoLoader,
            action: proyectoAction
          },
          {
            path: ":projectId/new-task",
            element: <NewTaskPage />,
            action: nuevaTareaAction
          }
        ]
      }
    ]
  }
]);

export default router;
