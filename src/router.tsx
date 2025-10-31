import { BrowserRouter, Routes, Route } from "react-router-dom"
import AppLayout from "@/layout/AppLayout"
import DashboardView from "@/views/DashboardView"
import CreateProjectView from "./views/projects/CreateProjectView"
import EditProjectView from "./views/projects/EditProjectView"
import ProjectDetailsView from "./views/projects/ProjectDetailsView"

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta y layout para dashboard*/}
        <Route element={<AppLayout />}>
          <Route index path="/" element={<DashboardView />} />
          <Route path="/projects/create" element={<CreateProjectView />} />
          <Route
            path="/projects/:projectId/edit"
            element={<EditProjectView />}
          />
          <Route path="/projects/:projectId" element={<ProjectDetailsView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
