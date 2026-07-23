import { Routes, Route } from 'react-router-dom'
import Layout from '../components/layout/layout'

function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<h1 className="p-10 text-3xl">Home</h1>} />
        <Route path="/sobre" element={<h1 className="p-10 text-3xl">Sobre</h1>} />
        <Route path="/projetos" element={<h1 className="p-10 text-3xl">Projetos</h1>} />
        <Route path="/percurso" element={<h1 className="p-10 text-3xl">Percurso</h1>} />
        <Route path="/contacto" element={<h1 className="p-10 text-3xl">Contacto</h1>} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
