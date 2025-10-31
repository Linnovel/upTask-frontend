import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify"
import ProjectForm from "@/components/ProjectForm"
import type { ProjectFormData } from "@/types"
import { createProject } from "@/services/ProjectAPI"

function CreateProjectView() {
  const navigate = useNavigate()
  const initialValues: ProjectFormData = {
    projectName: "",
    clientName: "",
    description: "",
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues })

  const { mutate } = useMutation({
    mutationFn: createProject,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
      navigate("/")
    },
  })

  //Obtener los datos del formulario
  const handleForm = async (formData: ProjectFormData) => {
    mutate(formData)
  }

  return (
    <React.Fragment>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-black my-4">Crear Proyectos</h1>
        <p className="text-2xl font-light my-4  text-gray-500">
          Llena el siguiente formulario para crear proyecto
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
            value="Crar Proyecto"
            className="bg-fuchsia-600 hover:bg-fuchsia-700 rounded-sm transition-colors w-full p-3 text-white uppercase "
          />
        </form>
      </div>
    </React.Fragment>
  )
}

export default CreateProjectView
