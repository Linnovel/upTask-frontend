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

/* AUTH USERS*/

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const authSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  password_confirmation: z.string(),
  token: z.string(),
})

export type ConfirmToken = Pick<Auth, "token">
export type RequestConfirmationCodeForm = Pick<Auth, "email">
export type ForgotPasswordForm = Pick<Auth, "email">
export type NewPasswordForm = Pick<Auth, "password" | "password_confirmation">

type Auth = z.infer<typeof authSchema>

export type UserLoginForm = Pick<Auth, "email" | "password">
export type UserRegistrationForm = Pick<
  Auth,
  "name" | "email" | "password" | "password_confirmation"
>

/*USERS */
export const userSchema = authSchema
  .pick({
    name: true,
    email: true,
  })
  .extend({
    _id: z.string(),
  })

export type User = z.infer<typeof userSchema>

/*TEAM MEMBERS*/

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const teamMemberSchema = userSchema.pick({
  name: true,
  email: true,
  _id: true,
})
export const teamMembersSchema = z.array(teamMemberSchema)

export type TeamMember = z.infer<typeof teamMemberSchema>
//usar pick para solo el email para el formulario
export type TeamMemberForm = Pick<TeamMember, "email">
