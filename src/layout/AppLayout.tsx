import React from "react"
import { Link, Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Logo from "@/components/Logo"
import NavMenu from "@/components/NavMenu"

function AppLayout() {
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
          <NavMenu />
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
