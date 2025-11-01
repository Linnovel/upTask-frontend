import { z } from "zod"

/**Projects**/

export const projectSchema = z.object({
  _id: z.string(),
  projectName: z.string(),
  clientName: z.string(),
  description: z.string(),
})

//Schema de Proyectos para poder validarlo
export const dashboardProjectSchema = z.array(
  projectSchema.pick({
    _id: true,
    projectName: true,
    clientName: true,
    description: true,
  })
)

export type Project = z.infer<typeof projectSchema>
//usa pick no omit
export type ProjectFormData = Pick<
  Project,
  "projectName" | "clientName" | "description"
>

/*Tasks*/

export const taskStatusSchema = z.enum([
  "pending",
  "onHold",
  "inProgress",
  "underReview",
  "completed",
])

export type TasktStatus = z.infer<typeof taskStatusSchema>

export const taskSchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  project: z.string(),
  status: taskStatusSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
})

export type Task = z.infer<typeof taskSchema>
export type TaskFormData = Pick<Task, "name" | "description">
