import { getTaskById } from "@/services/TaskApi"
import { useQuery } from "@tanstack/react-query"
import { Navigate, useLocation, useParams } from "react-router-dom"
import EditTaskModal from "./EditTaskModal"

function EditTaskData() {
  //leer el id del proyecto
  const params = useParams()
  const projectId = params.projectId!
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  //Una ves que obtenemos este valor ya podemos hacer la function para hacer la consulta
  //MOStramos el modal y llenamos el formulario
  const taskId = queryParams.get("editTask")!

  //Leer en postman que necesita para hacer el query
  const { data, isError } = useQuery({
    queryKey: ["task", taskId],
    //Se le pasa el id del proyecto y el id de la tarea
    queryFn: () =>
      getTaskById({
        projectId,
        taskId: taskId!,
      }),
    //En base a una condicion si esa consulta se ejecuta o no
    // el doble !! convierte a true si tiene algo o convierte a false si no tiene nada !!
    //Ayuda a elegir cuando hacer una consulta y cuando no
    enabled: !!taskId,
  })

  if (isError) return <Navigate to={"/404"} />

  if (data) return <EditTaskModal data={data} taskId={taskId} />
}

export default EditTaskData
