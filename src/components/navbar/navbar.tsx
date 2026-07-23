import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <header className="border-b border-[#1F3B54] px-6 py-4">
      <nav className="mx-auto flex max-w-5xl items-center justify-between">
        <span className="font-semibold">EM.</span>
        <div className="flex gap-6 text-sm text-[#8FA9BC]">
          <Link to="/">Home</Link>
          <Link to="/sobre">Sobre</Link>
          <Link to="/projetos">Projetos</Link>
          <Link to="/percurso">Percurso</Link>
          <Link to="/contacto">Contacto</Link>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
