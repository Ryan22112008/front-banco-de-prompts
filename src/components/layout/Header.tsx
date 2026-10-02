import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { BrainCircuit, Menu, Search, X } from 'lucide-react'

const navigation = [
  { label: 'Início', to: '/' },
  { label: 'Prompts', to: '/#catalogo' },
  { label: 'Categorias', to: '/#categorias' },
  { label: 'Sobre', to: '/sobre' },
]

function isNavigationActive(to: string, pathname: string, hash: string) {
  if (to === '/') return pathname === '/' && !hash
  if (to === '/#catalogo') return pathname === '/' && hash === '#catalogo'
  if (to === '/#categorias') return pathname === '/' && hash === '#categorias'
  return false
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

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
            <Link key={item.label} to={item.to} onClick={() => setMenuOpen(false)} className={`nav-link${isNavigationActive(item.to, location.pathname, location.hash) ? ' active' : ''}`}>
              {item.label}
            </Link>
          ))}
        </nav>
        <Link className="header-search" to="/#busca" aria-label="Pesquisar prompts">
          <Search size={19} strokeWidth={1.8} />
          <span className="header-search-label">Buscar</span>
        </Link>
      </div>
    </header>
  )
}
