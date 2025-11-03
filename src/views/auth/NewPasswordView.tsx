import NewPasswordForm from "@/components/auth/NewPasswordForm"
import NewPasswordToken from "@/components/auth/NewPasswordToken"
import type { ConfirmToken } from "@/types"
import React from "react"

function NewPasswordView() {
  const [token, setToken] = React.useState<ConfirmToken["token"]>("")

  const [isValidToken, setIsValidToken] = React.useState(false)

  return (
    <React.Fragment>
      <h2 className="text-5xl font-black text-white">Reestablecer Password</h2>
      <p className="text-2xl mb-5 font-light text-white mt-5">
        Ingresa el codigo que recibiste {""}
        <span className=" text-fuchsia-500 font-bold"> por E-mail</span>
      </p>
      {!isValidToken ? (
        <NewPasswordToken
          token={token}
          setToken={setToken}
          setIsValidToken={setIsValidToken}
        />
      ) : (
        <NewPasswordForm token={token} />
      )}
    </React.Fragment>
  )
}

export default NewPasswordView
