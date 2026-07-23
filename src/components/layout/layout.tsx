import { Outlet } from 'react-router-dom'
import Navbar from '../navbar/navbar'
import Footer from '../footer/footer'

function Layout() {
  return (
    <div className="min-h-screen bg-[#0A1723] text-[#EAF2F6]">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout
