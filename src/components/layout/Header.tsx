import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { BrainCircuit, Menu, Search, X } from 'lucide-react'

const navigation = [
  { label: 'Prompts', to: '/' },
  { label: 'Glossário de IA', to: '/glossario' },
  { label: 'Ficha de Sistema de IA', to: '/ficha-sistema-ia' },
]

function isNavigationActive(to: string, pathname: string) {
  if (to === '/') return pathname === '/' || pathname.startsWith('/prompts/')
  return pathname === to
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const handleSearch = () => {
    setMenuOpen(false)
    const searchId = location.pathname === '/ficha-sistema-ia'
      ? 'ficha-search'
      : location.pathname === '/glossario'
        ? 'glossario-search'
        : location.pathname === '/' || location.pathname.startsWith('/prompts/')
          ? 'catalog-search'
          : null

    if (searchId) {
      const input = document.getElementById(searchId) as HTMLInputElement | null
      if (input) {
        input.scrollIntoView({ behavior: 'smooth', block: 'center' })
        input.focus({ preventScroll: true })
        return
      }
    }

    navigate('/#busca')
  }

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" to="/" aria-label="CEIA.mt, ir para Prompts" onClick={() => setMenuOpen(false)}>
          <span className="brand-mark" aria-hidden="true"><BrainCircuit size={25} strokeWidth={1.25} /></span>
          <span className="brand-name">CEIA.mt</span>
        </Link>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
        <nav className={`main-nav${menuOpen ? ' is-open' : ''}`} aria-label="Navegação principal">
          {navigation.map((item) => {
            const active = isNavigationActive(item.to, location.pathname)
            return (
              <Link
                key={item.label}
                to={item.to}
                className={`nav-link${active ? ' active' : ''}`}
                aria-current={active ? 'page' : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
        <button className="header-search" type="button" aria-label="Pesquisar nesta página" onClick={handleSearch}>
          <Search size={19} strokeWidth={1.8} aria-hidden="true" />
          <span className="header-search-label">Buscar</span>
        </button>
      </div>
    </header>
  )
}
