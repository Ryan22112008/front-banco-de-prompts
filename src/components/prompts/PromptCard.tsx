import { ArrowRight } from 'lucide-react'
import type { PromptItem } from './types'

export function PromptCard({ prompt }: { prompt: PromptItem }) {
  const Icon = prompt.icon

  return (
    <article className="catalog-card">
      <span className="catalog-badge">{prompt.category}</span>
      <div className="catalog-icon" aria-hidden="true"><Icon size={32} strokeWidth={1.7} /></div>
      <h2>{prompt.title}</h2>
      <p>{prompt.description}</p>
      <a className="catalog-button" href="#prompt" onClick={(event) => event.preventDefault()} aria-label={`Ver prompt: ${prompt.title}`}>
        Ver prompt <ArrowRight size={17} />
      </a>
    </article>
  )
}
