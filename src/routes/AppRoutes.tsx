import { Routes, Route } from 'react-router-dom'
import Layout from '../components/layout/layout'
import Home from "@/pages/home/home"
import Projects from "@/pages/projects/projects"
import ProjetoDetalhe from "@/pages/projects/projetoDetalhe"
import About from "@/pages/about/about"
import Contact from "@/pages/contact/contact"
function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<About />} />
        <Route path="/projetos" element={<Projects />} />
        <Route path="/projetos/:slug" element={<ProjetoDetalhe />} />
        <Route path="/contacto" element={<Contact />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
