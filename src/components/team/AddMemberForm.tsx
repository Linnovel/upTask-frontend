import { useForm } from "react-hook-form"
import { useParams } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import ErrorMessage from "../ErrorMessage"
import type { TeamMemberForm } from "@/types"
import { findUserByEmail } from "@/services/TeamApi"
import SearchResult from "./SearchResult"

export default function AddMemberForm() {
  //Recuerda el initialValues siempre debe tener todas las propiedades del formulario
  const initialValues: TeamMemberForm = {
    email: "",
  }
  const params = useParams()
  const projectId = params.projectId!

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues })

  //mutate es para mandar a llamar la funcion y mutation tiene toda la info del estado
  //Con mutation tenemos el resultado de una consulta cuando se hace una mutation y que
  // al llamarla podemos imprirla su estado (loading, error, data, etc)
  const mutation = useMutation({
    mutationFn: findUserByEmail,
  })

  //no se le pasa el projectId porque ya lo tiene en el closure
  const handleSearchUser = async (formData: TeamMemberForm) => {
    const data = {
      projectId,
      formData,
    }

    // Aquí se completa el código para llamar a la mutación
    // y manejar la respuesta
    // mutation.mutate(data, {
    //   onSuccess(result) {
    //     console.log(result) // aquí sí llega la respuesta
    //   },
    // })

    mutation.mutate(data)
  }

  const resetData = () => {
    reset()
    mutation.reset()
  }

  return (
    <>
      <form
        className="mt-10 space-y-5"
        onSubmit={handleSubmit(handleSearchUser)}
        noValidate
      >
        <div className="flex flex-col gap-3">
          <label className="font-normal text-2xl" htmlFor="name">
            E-mail de Usuario
          </label>
          <input
            id="name"
            type="text"
            placeholder="E-mail del usuario a Agregar"
            className="w-full p-3  border-gray-300 border"
            {...register("email", {
              required: "El Email es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        <input
          type="submit"
          className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
          value="Buscar Usuario"
        />
      </form>
      {/* La razon por la cual usamos mutation es para poder acceder a los datos del objeto */}
      {mutation.status === "pending" && (
        <p className="text-center mt-5">Cargando Usuario...</p>
      )}
      {mutation.error && (
        <p className="text-center mt-5">{mutation.error.message}</p>
      )}
      {mutation.data?.user && (
        <SearchResult user={mutation.data.user} reset={resetData} />
      )}
    </>
  )
}
