import { ArrowLeft, FileQuestion } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { PromptCard } from '../components/prompts/PromptCard'
import { prompts } from '../components/prompts/data'

export default function PromptDetail() {
  const { id } = useParams()
  const prompt = prompts.find((item) => item.id === id)

  if (!prompt) {
    return (
      <div className="catalog-page prompt-detail-page">
        <section className="detail-empty" role="status">
          <FileQuestion size={32} aria-hidden="true" />
          <h1>Este prompt não foi encontrado</h1>
          <p>O endereço pode estar incorreto ou o prompt não está mais disponível.</p>
          <Link to="/#catalogo" className="detail-back"><ArrowLeft size={16} /> Voltar à biblioteca</Link>
        </section>
      </div>
    )
  }

  return (
    <div className="catalog-page prompt-detail-page">
      <div className="prompt-detail-wrap">
        <Link to="/#catalogo" className="detail-back"><ArrowLeft size={16} aria-hidden="true" /> Voltar à biblioteca</Link>
        <header className="detail-heading">
          <span className="catalog-eyebrow">Instruções do prompt</span>
          <h1>Escolha o formato ideal</h1>
          <p>Consulte a instrução, alterne entre os formatos e copie o texto para usar.</p>
        </header>
        <PromptCard prompt={prompt} initialExpanded showDetailsLink={false} />
      </div>
    </div>
  )
}
