import { useEffect, useRef, useState } from 'react'
import {
  BookOpen,
  BrainCircuit,
  Check,
  Clipboard,
  Database,
  Landmark,
  Link2,
  Scale,
  ShieldAlert,
  ShieldCheck,
  TriangleAlert,
  Users,
  type LucideIcon,
} from 'lucide-react'
import { HighlightedText } from './HighlightedText'
import { slugCategoria } from './glossario'
import type { GlossarioTermo } from './types'

type TermoCardProps = {
  termo: GlossarioTermo
  query: string
}

type CopyState = 'idle' | 'copied' | 'error'

const categoriaIcones: Record<string, LucideIcon> = {
  'conceitos-de-ia': BrainCircuit,
  'classificacao-de-risco': ShieldAlert,
  'protecao-de-dados': ShieldCheck,
  'vieses-e-discriminacao': Users,
  rag: Database,
  'etica-e-governanca': Scale,
  'principios-da-administracao-publica': Landmark,
}

export function TermoCard({ termo, query }: TermoCardProps) {
  const [copyState, setCopyState] = useState<CopyState>('idle')
  const copyTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const categoria = slugCategoria(termo.categoria)
  const IconeCategoria = categoriaIcones[categoria] ?? BookOpen

  useEffect(() => () => {
    if (copyTimer.current) clearTimeout(copyTimer.current)
  }, [])

  const copyTermo = async () => {
    const texto = termo.fonte
      ? `${termo.termo}: ${termo.definicao} (Fonte: ${termo.fonte})`
      : `${termo.termo}: ${termo.definicao}`

    try {
      await navigator.clipboard.writeText(texto)
      setCopyState('copied')
    } catch {
      setCopyState('error')
    }

    if (copyTimer.current) clearTimeout(copyTimer.current)
    copyTimer.current = setTimeout(() => setCopyState('idle'), 2000)
  }

  const copyLabel = copyState === 'copied' ? 'Copiado!' : copyState === 'error' ? 'Erro' : 'Copiar'

  return (
    <article className="glossario-card" data-categoria={categoria} data-letra={termo.letra}>
      <div className="glossario-card-top">
        <span className="glossario-badge">
          <IconeCategoria size={12} strokeWidth={2} aria-hidden="true" />
          <span>{termo.categoria}</span>
        </span>
        <button
          className={`glossario-copy${copyState === 'copied' ? ' is-copied' : ''}${copyState === 'error' ? ' is-error' : ''}`}
          type="button"
          onClick={copyTermo}
          aria-label={
            copyState === 'copied'
              ? `Definição de ${termo.termo} copiada`
              : copyState === 'error'
                ? `Não foi possível copiar a definição de ${termo.termo}. Tentar novamente`
                : `Copiar definição de ${termo.termo}`
          }
        >
          {copyState === 'copied' ? (
            <Check size={14} aria-hidden="true" />
          ) : copyState === 'error' ? (
            <TriangleAlert size={14} aria-hidden="true" />
          ) : (
            <Clipboard size={14} aria-hidden="true" />
          )}
          <span>{copyLabel}</span>
        </button>
      </div>
      <div className="glossario-card-body">
        <h3><HighlightedText text={termo.termo} query={query} /></h3>
        <p className="glossario-definicao"><HighlightedText text={termo.definicao} query={query} /></p>
      </div>
      {termo.fonte && (
        <p className="glossario-fonte">
          <Link2 size={13} strokeWidth={1.9} aria-hidden="true" />
          <span><strong>Fonte:</strong> {termo.fonte}</span>
        </p>
      )}
      <span className="sr-only" role="status" aria-live="polite">
        {copyState === 'copied' ? 'Definição copiada.' : copyState === 'error' ? 'Não foi possível copiar a definição.' : ''}
      </span>
    </article>
  )
}
