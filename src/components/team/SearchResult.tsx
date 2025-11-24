import { addUserByEmail } from "@/services/TeamApi"
import type { TeamMember } from "@/types"
import { useMutation } from "@tanstack/react-query"
import React from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"

type SearchResultProps = {
  user: TeamMember
  reset: () => void
}

function SearchResult({ user, reset }: SearchResultProps) {
  const navigate = useNavigate()
  const params = useParams()
  const projectId = params.projectId!

  const { mutate } = useMutation({
    mutationFn: addUserByEmail,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
      reset()
      navigate(location.pathname, { replace: true })
    },
  })

  function addMemberToProject() {
    const data = {
      id: user._id,
      projectId,
    }
    mutate(data)
  }

  return (
    <React.Fragment>
      <p className="mt-10 text-center font-bold">Resultado: </p>
      <div className="flex justify-between items-center">
        <p className="font-bold text-black">{user.name}</p>
        <button
          onClick={addMemberToProject}
          className="text-purple-600 hover:bg-purple-300 px-10 py-3 font-bold cursor-pointer"
        >
          Agrega a {user.name} al proyecto
        </button>
      </div>
    </React.Fragment>
  )
}

export default SearchResult
