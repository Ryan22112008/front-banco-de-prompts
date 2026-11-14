import { Link } from 'react-router-dom'
import { BrainCircuit } from 'lucide-react'

const footerLinks = {
  Navegação: [
    { label: 'Prompts', to: '/' },
    { label: 'Glossário de IA', to: '/glossario' },
    { label: 'Ficha de Sistema de IA', to: '/ficha-sistema-ia' },
  ],
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand-block">
          <Link className="brand footer-brand" to="/"><span className="brand-mark" aria-hidden="true"><BrainCircuit size={24} strokeWidth={1.25} /></span><span className="brand-name">CEIA.mt</span></Link>
          <p>Uma biblioteca de prompts<br />para transformar ideias em resultados.</p>
        </div>
        {Object.entries(footerLinks).map(([heading, links]) => (
          <div className="footer-column" key={heading}>
            <h2>{heading}</h2>
            {links.map((link) => <Link key={link.label} to={link.to}>{link.label}</Link>)}
          </div>
        ))}
        <div className="footer-note"><span className="footer-dot" />Uma ideia melhor começa com<br />uma boa pergunta.</div>
      </div>
      <div className="footer-bottom"><span>© 2026 CEIA.mt</span><span>Feito para quem transforma ideias em ação.</span></div>
    </footer>
  )
}
