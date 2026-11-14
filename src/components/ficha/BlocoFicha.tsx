import { ChevronDown } from 'lucide-react'
import type { FichaBlock, FichaField } from './fichaSistemaIA'

export type BlockStatus = 'always' | 'applicable' | 'not-applicable' | 'pending'

type BlocoFichaProps = {
  block: FichaBlock
  fields: FichaField[]
  status: BlockStatus
  isOpen: boolean
  onToggle: () => void
}

const statusLabels: Record<BlockStatus, string> = {
  always: 'Sempre aplicável',
  applicable: 'Aplica-se',
  'not-applicable': 'Não se aplica',
  pending: 'Aguardando resposta',
}

export function BlocoFicha({ block, fields, status, isOpen, onToggle }: BlocoFichaProps) {
  const contentId = `${block.id}-conteudo`
  const triggerId = `${block.id}-trigger`
  const fieldCount = fields.length === block.fields.length
    ? `${block.fields.length} ${block.fields.length === 1 ? 'campo' : 'campos'}`
    : `${fields.length} de ${block.fields.length} campos`

  return (
    <article className={`ficha-block${isOpen ? ' is-open' : ''}`} data-status={status}>
      <h3 className="ficha-block-heading">
        <button
          className="ficha-block-trigger"
          type="button"
          id={triggerId}
          aria-expanded={isOpen}
          aria-controls={contentId}
          onClick={onToggle}
        >
          <span className="ficha-block-number" aria-hidden="true">{String(block.number).padStart(2, '0')}</span>
          <span className="ficha-block-copy">
            <span className="ficha-block-title">{block.title}</span>
            <span className="ficha-block-meta">
              <span className="ficha-tag" data-tag={block.tag}>{block.tag}</span>
              <span>{fieldCount}</span>
              <span>{block.activation}</span>
              <span className="ficha-block-status">{statusLabels[status]}</span>
            </span>
          </span>
          <ChevronDown className="ficha-block-chevron" size={19} aria-hidden="true" />
        </button>
      </h3>
      <div className="ficha-block-content" id={contentId} role="region" aria-labelledby={triggerId} hidden={!isOpen}>
        <p className="ficha-block-instruction">{block.instruction}</p>
        <div className="ficha-fields">
          {fields.map((field) => (
            <article className="ficha-field" key={field.id}>
              <h4>{field.title}</h4>
              <p>{field.summary}</p>
            </article>
          ))}
        </div>
      </div>
    </article>
  )
}
