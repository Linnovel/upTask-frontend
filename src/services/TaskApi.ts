import api from "@/lib/axios"
import type { TaskFormData } from "@/types"
import { isAxiosError } from "axios"

export function createTask(formData: TaskFormData) {
  console.log(formData)
}
