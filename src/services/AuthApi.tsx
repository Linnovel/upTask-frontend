/* eslint-disable react-refresh/only-export-components */
import api from "@/lib/axios"
import { isAxiosError } from "axios"
import {
  userSchema,
  type ConfirmToken,
  type ForgotPasswordForm,
  type NewPasswordForm,
  type RequestConfirmationCodeForm,
  type User,
  type UserLoginForm,
  type UserRegistrationForm,
} from "@/types"

//Query para hacer el Login
export async function createAccount(formData: UserRegistrationForm) {
  try {
    const url = `/auth/create-account`
    const { data } = await api.post<string>(url, formData)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response?.data.error)
    }
  }
}

export async function confirmAccount(formData: ConfirmToken) {
  try {
    const url = `/auth/confirm-account`
    const { data } = await api.post<string>(url, formData)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response?.data.error)
    }
  }
}

export async function requestConfirmationCode(
  formData: RequestConfirmationCodeForm
) {
  try {
    const url = `/auth/request-code`
    const { data } = await api.post<string>(url, formData)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response?.data.error)
    }
  }
}

export async function AuthenticateUSer(formData: UserLoginForm) {
  try {
    const url = `/auth/login`
    const { data } = await api.post<string>(url, formData)
    localStorage.setItem("AUTH_TOKENZXY", data)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response?.data.error)
    }
  }
}

export async function forgotPassword(formData: ForgotPasswordForm) {
  try {
    const url = `/auth/forgot-password`
    const { data } = await api.post<string>(url, formData)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response?.data.error)
    }
  }
}

export async function validateToken(formData: ConfirmToken) {
  try {
    const url = `/auth/validate-token`
    const { data } = await api.post<string>(url, formData)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response?.data.error)
    }
  }
}

export async function updatePasswordWithToken({
  formData,
  token,
}: {
  formData: NewPasswordForm
  token: ConfirmToken["token"]
}) {
  try {
    const url = `/auth/update-password/${token}`
    const { data } = await api.post<string>(url, formData)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response?.data.error)
    }
  }
}

export async function getUser() {
  try {
    const data = await api.get<User>("/auth/user")
    const response = userSchema.safeParse(data.data)

    if (!response.success) {
      throw new Error("Error al validar el usuario")
    }

    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response?.data.error)
    }
  }
}
