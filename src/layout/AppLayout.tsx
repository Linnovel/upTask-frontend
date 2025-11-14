import React from "react"
import { Link, Outlet, Navigate } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Logo from "@/components/Logo"
import NavMenu from "@/components/NavMenu"
import { useAuth } from "@/hooks/useAuth"

function AppLayout() {
  //Aca se usa el hook de autenticacion para saber si el usuario esta autenticado

  const { data, isError, isLoading } = useAuth()

  if (isLoading) return <p>Cargando...</p>

  //Si no esta autenticado, redirige al login
  if (isError) {
    return <Navigate to={"/auth/login"} />
  }

  if (data)
    return (
      <React.Fragment>
        <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
        <header className="bg-gray-800 py-5">
          <div className="justify-between items-center max-w-screen-4xl  mx-8 flex flex-col lg:flex-row">
            <div className="w-64">
              <Link to={"/"}>
                <Logo />
              </Link>
            </div>

            <NavMenu name={data.data.name} />
          </div>
        </header>
        <section className="max-w-screen-2xl mx-auto mt-10 p-5">
          <Outlet />
        </section>
        <footer className="py-5">
          <p className="text-center">
            Todos los derechos {new Date().getFullYear()}
          </p>
        </footer>
      </React.Fragment>
    )
}

export default AppLayout
