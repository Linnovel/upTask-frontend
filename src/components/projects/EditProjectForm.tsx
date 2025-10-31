import React from "react"
import { Link, useNavigate } from "react-router-dom"
import ProjectForm from "../ProjectForm"
import { useForm } from "react-hook-form"
import type { Project, ProjectFormData } from "@/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateProject } from "@/services/ProjectAPI"
import { toast } from "react-toastify"

interface EditProjectFormProps {
  data: ProjectFormData
  projectId: Project["_id"]
}

function EditProjectForm({ data, projectId }: EditProjectFormProps) {
  const navigate = useNavigate()
  //se le pone lo el data.projectName de donde viene la data y este es el objeto que se va a mandar y crear cuando se actualice los datos
  const initialValues: ProjectFormData = {
    projectName: data.projectName,
    clientName: data.clientName,
    description: data.description,
  }
  //Elimina la informacion casheada y que repite la consulta
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues })

  const { mutate } = useMutation({
    mutationFn: updateProject,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      //Elimina la informacion casheada y que repite la consulta
      //invalida los queries de ambos, que son los que nos trae problemas en la edicion y la creacion
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      })
      queryClient.invalidateQueries({
        queryKey: ["editProject", projectId],
      })
      toast.success(data)
      navigate("/")
    },
  })

  const handleForm = (formData: ProjectFormData) => {
    //se le manda un objeto porque mutate solo puede recivir un valor
    const data = {
      projectId,
      formData,
    }

    mutate(data)
  }

  return (
    <React.Fragment>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-black my-4">Edita el Proyecto</h1>
        <p className="text-2xl font-light my-4  text-gray-500">
          Llena el siguiente formulario para editar el proyecto
        </p>
        <nav className="my-5">
          <Link
            className="bg-purple-400 my-4 rounded-sm hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
            to={"/"}
          >
            Volver a Proyectos
          </Link>
        </nav>
        <form
          className="mt-10 bg-white shadow-lg p-10 rounded-lg"
          onSubmit={handleSubmit(handleForm)}
          noValidate
        >
          <ProjectForm register={register} errors={errors} />
          <input
            type="submit"
            value="Guardar Cambios"
            className="bg-fuchsia-600 hover:bg-fuchsia-700 rounded-sm transition-colors w-full p-3 text-white uppercase "
          />
        </form>
      </div>
    </React.Fragment>
  )
}

export default EditProjectForm
