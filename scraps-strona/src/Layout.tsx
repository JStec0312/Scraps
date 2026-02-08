import { Outlet, ScrollRestoration } from "react-router-dom"
import Navbar from "./banners/Navbar"
import Footer from "./banners/Footer"

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 w-full">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />

    </div>
  )
}
