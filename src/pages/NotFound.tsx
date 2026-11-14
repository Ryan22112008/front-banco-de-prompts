import { ArrowLeft, FileQuestion } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="catalog-page not-found-page">
      <section className="detail-empty" role="status">
        <FileQuestion size={34} aria-hidden="true" />
        <span className="catalog-eyebrow">Erro 404</span>
        <h1>Página não encontrada</h1>
        <p>O endereço pode estar incorreto ou a página não está mais disponível.</p>
        <Link to="/" className="detail-back"><ArrowLeft size={16} aria-hidden="true" /> Voltar para Prompts</Link>
      </section>
    </div>
  )
}
