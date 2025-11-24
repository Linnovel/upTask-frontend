import { isAxiosError } from "axios"
import api from "@/lib/axios"

import {
  teamMembersSchema,
  type Project,
  type TeamMember,
  type TeamMemberForm,
} from "@/types"

export async function findUserByEmail({
  projectId,
  formData,
}: {
  projectId: Project["_id"]
  formData: TeamMemberForm
}) {
  try {
    const { data } = await api.post(
      `/projects/${projectId}/team/find`,
      formData
    )
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response?.data.error)
    }
  }
}

export async function addUserByEmail({
  projectId,
  id,
}: {
  projectId: Project["_id"]
  id: TeamMember["_id"]
}) {
  try {
    // The backend validation expects the field name `userId` in the request body.
    const { data } = await api.post(`/projects/${projectId}/team`, { id })
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response?.data.error)
    }
  }
}

export async function getProjectTeam(
  projectId: Project["_id"]
): Promise<TeamMember[]> {
  try {
    const { data } = await api.get(`/projects/${projectId}/team`)
    const parsed = teamMembersSchema.safeParse(data)
    if (!parsed.success) {
      // opcional: loguear parsed.error para debugging
      throw new Error("Invalid team data from server")
    }
    return parsed.data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response?.data.error)
    }
    throw error
  }
}
