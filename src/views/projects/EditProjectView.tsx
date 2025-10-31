import EditProjectForm from "@/components/projects/EditProjectForm"
import { getProjectsById } from "@/services/ProjectAPI"
import { useQuery } from "@tanstack/react-query"
import React from "react"
import { useParams } from "react-router-dom"

function EditProjectView() {
  //hook para acceder a los params -- accede a los params del url
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

  if (isLoading) return "cargando..."

  if (isError) {
    return "Hubo un error"
  }

  if (data) return <EditProjectForm data={data} projectId={projectId} />
}

export default EditProjectView
