import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { BrainCircuit, Menu, Search, X } from 'lucide-react'

const navigation = [
  { label: 'Início', to: '/' },
  { label: 'Prompts', to: '/prompts' },
  { label: 'Categorias', to: '/categorias' },
  { label: 'Sobre', to: '/sobre' },
]

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" to="/" aria-label="Banco de Prompts, início" onClick={() => setMenuOpen(false)}>
          <span className="brand-mark" aria-hidden="true"><BrainCircuit size={25} strokeWidth={1.25} /></span>
          <span className="brand-name">CEIA.mt</span>
        </Link>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
        <nav className={`main-nav${menuOpen ? ' is-open' : ''}`} aria-label="Navegação principal">
          {navigation.map((item) => (
            <NavLink key={item.label} to={item.to} end={item.to === '/'} onClick={() => setMenuOpen(false)} className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <a className="header-search" href="#busca" aria-label="Pesquisar prompts">
          <Search size={19} strokeWidth={1.8} />
        </a>
      </div>
    </header>
  )
}
