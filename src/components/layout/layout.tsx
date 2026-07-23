import { Outlet } from 'react-router-dom'
import Navbar from '@/components/navbar/navbar'
import Footer from '@/components/footer/footer'

function Layout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout
