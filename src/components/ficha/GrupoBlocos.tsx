import { ChevronDown } from 'lucide-react'
import { BlocoFicha, type BlockStatus } from './BlocoFicha'
import type { FichaBlock, FichaField, FichaGroup } from './fichaSistemaIA'

export type GroupStatus = 'always' | 'applicable' | 'not-applicable' | 'pending'

export type GroupItem = {
  block: FichaBlock
  fields: FichaField[]
}

type GrupoBlocosProps = {
  group: FichaGroup
  items: GroupItem[]
  status: GroupStatus
  statuses: Map<string, BlockStatus>
  openBlocks: Set<string>
  isCollapsed: boolean
  onToggleGroup: () => void
  onToggleBlock: (blockId: string) => void
}

const statusLabels: Record<GroupStatus, string> = {
  always: 'Sempre aplicável',
  applicable: 'Aplica-se',
  'not-applicable': 'Não se aplica',
  pending: 'Aguardando resposta',
}

export function GrupoBlocos({
  group,
  items,
  status,
  statuses,
  openBlocks,
  isCollapsed,
  onToggleGroup,
  onToggleBlock,
}: GrupoBlocosProps) {
  const headingId = `${group.id}-grupo-titulo`
  const contentId = `${group.id}-grupo-conteudo`
  const blockCountLabel = `${items.length} ${items.length === 1 ? 'bloco' : 'blocos'}`
  const applicableCount = items.filter(({ block }) => statuses.get(block.id) === 'applicable').length
  const statusLabel = group.id === 'base'
    ? statusLabels.always
    : status === 'applicable' && applicableCount < items.length
      ? `${applicableCount} de ${items.length} aplicam-se`
      : statusLabels[status]

  return (
    <section className="ficha-group" data-group={group.id} data-status={status} aria-labelledby={headingId}>
      <h3 className="ficha-group-heading">
        <button
          className="ficha-group-trigger"
          type="button"
          id={`${group.id}-grupo-trigger`}
          aria-expanded={!isCollapsed}
          aria-controls={contentId}
          onClick={onToggleGroup}
        >
          <span className="ficha-group-copy">
            <span className="ficha-group-title" id={headingId}>{group.label}</span>
            <span className="ficha-group-description">{group.description}</span>
            <span className="ficha-group-meta">
              {group.questionIds.length > 0 && (
                <span className="ficha-group-questions">
                  {group.questionIds.map((questionId) => (
                    <span className="ficha-tag" key={questionId}>{questionId}</span>
                  ))}
                </span>
              )}
              <span className="ficha-group-stat">{blockCountLabel}</span>
              <span className="ficha-group-stat ficha-group-status">{statusLabel}</span>
            </span>
          </span>
          <span className="ficha-group-count" aria-hidden="true">{group.shortLabel}</span>
          <ChevronDown className="ficha-group-chevron" size={20} aria-hidden="true" />
        </button>
      </h3>
      <div className="ficha-group-content" id={contentId} role="region" aria-labelledby={headingId} hidden={isCollapsed}>
        <div className="ficha-block-list">
          {items.map(({ block, fields }) => (
            <BlocoFicha
              key={block.id}
              block={block}
              fields={fields}
              status={statuses.get(block.id) ?? 'always'}
              isOpen={openBlocks.has(block.id)}
              onToggle={() => onToggleBlock(block.id)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
