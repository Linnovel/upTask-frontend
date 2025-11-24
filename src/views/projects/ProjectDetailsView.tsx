import AddTaskModal from "@/components/tasks/AddTaskModal"
import EditTaskData from "@/components/tasks/EditTaskData"
import TaskList from "@/components/tasks/TaskList"
import TaskModalDetails from "@/components/tasks/TaskModalDetails"
import { useAuth } from "@/hooks/useAuth"
import { getProjectsById } from "@/services/ProjectAPI"
import { isManager } from "@/utils/policies"
import { useQuery } from "@tanstack/react-query"
import React, { useMemo } from "react"
import { Link, Navigate, useNavigate, useParams } from "react-router-dom"

function ProjectDetailsView() {
  const { data: user, isLoading: authLoading } = useAuth()

  const navigate = useNavigate()
  //hook para acceder a los params -- accede a los params del url
  //los params te dan el id, y luego le haces el query para traer el objeto referente a ese id con el query
  const params = useParams()

  const projectId = params.projectId!

  const { data, isLoading, isError } = useQuery({
    // El queryKey debe ser unico
    //como es un arreglo pasarle un segundo parametro para que no mande siempre el mismo key y no haga la consulta al mismo id por el cache
    queryKey: ["editProject", projectId],
    // poner un callback en la function cuando necesita un parametro
    queryFn: () => getProjectsById(projectId),
    retry: false,
  })

  const canEdit = useMemo(() => data?.manager === user?.data._id, [data, user])

  if (isLoading && authLoading) return "cargando..."

  if (isError) return <Navigate to={"/404"} />

  if (data && user)
    return (
      <React.Fragment>
        <h1 className="text-5xl font-black">{data.projectName}</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          {data.description}
        </p>
        {/* usando la funcion para validar  */}
        {isManager(data.manager, user.data._id) && (
          <nav className="my-5 flex gap-3">
            <button
              //VENTAJA DE PONER ESTO EN LA URL ES QUE ALGUIEN PUEDE COPIARLO Y COMPARTIRLO Y SI TIENE LAS
              //CREDENCIALES PUEDE VERLO
              onClick={() => navigate(`${location.pathname}?newTask=true`)}
              className="bg-purple-400 hover:bg-purple-500 px-10 py-3 rounded-sm text-white text-xl font-bold cursor-pointer transition-colors"
              type="button"
            >
              Agregar Tarea
            </button>
            <Link
              className="bg-fuchsia-400 hover:bg-purple-500 px-10 py-3 rounded-sm text-white text-xl font-bold cursor-pointer transition-colors"
              to={"team"}
            >
              Colaboradores
            </Link>
          </nav>
        )}
        <TaskList canEdit={canEdit} tasks={data.tasks} />
        <AddTaskModal />
        <EditTaskData />
        <TaskModalDetails />
      </React.Fragment>
    )
}

export default ProjectDetailsView
