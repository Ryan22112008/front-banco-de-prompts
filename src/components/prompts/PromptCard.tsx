import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Check, ChevronDown, Clipboard, FileDown, FileSpreadsheet, FileText, Link2 } from 'lucide-react'
import type { InstructionFormat, PromptItem } from './types'

const formats: { id: InstructionFormat; label: string; Icon: typeof FileText }[] = [
  { id: 'excel', label: 'Excel', Icon: FileSpreadsheet },
  { id: 'word', label: 'Word', Icon: FileText },
  { id: 'pdf', label: 'PDF', Icon: FileDown },
  { id: 'link', label: 'Link', Icon: Link2 },
]

function HighlightedInstruction({ text }: { text: string }) {
  const chunks = text.split(/(\[[^\]]+\])/g)

  return <>{chunks.map((chunk, index) => chunk.startsWith('[') && chunk.endsWith(']')
    ? <mark className="instruction-placeholder" key={`${index}-${chunk}`}>{chunk}</mark>
    : <span key={`${index}-${chunk}`}>{chunk}</span>)}</>
}

export function PromptCard({ prompt, initialExpanded = false, showDetailsLink = true }: { prompt: PromptItem; initialExpanded?: boolean; showDetailsLink?: boolean }) {
  const [isOpen, setIsOpen] = useState(initialExpanded)
  const [activeFormat, setActiveFormat] = useState<InstructionFormat>('excel')
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'error'>('idle')
  const tabRefs = useRef<Partial<Record<InstructionFormat, HTMLButtonElement | null>>>({})
  const copyTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const generatedId = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const cardId = `${prompt.id}-${generatedId}`
  const triggerId = `${cardId}-instructions-trigger`
  const Icon = prompt.icon

  useEffect(() => () => {
    if (copyTimer.current) clearTimeout(copyTimer.current)
  }, [])

  const selectTab = (format: InstructionFormat, focus = false) => {
    setActiveFormat(format)
    setCopyState('idle')
    if (focus) tabRefs.current[format]?.focus()
  }

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const currentIndex = formats.findIndex((format) => format.id === activeFormat)
    let nextIndex: number | undefined
    if (event.key === 'ArrowRight') nextIndex = (currentIndex + 1) % formats.length
    if (event.key === 'ArrowLeft') nextIndex = (currentIndex - 1 + formats.length) % formats.length
    if (event.key === 'Home') nextIndex = 0
    if (event.key === 'End') nextIndex = formats.length - 1
    if (nextIndex === undefined) return
    event.preventDefault()
    selectTab(formats[nextIndex].id, true)
  }

  const copyInstruction = async () => {
    try {
      await navigator.clipboard.writeText(prompt.instructions[activeFormat])
      setCopyState('copied')
    } catch {
      setCopyState('error')
    }
    if (copyTimer.current) clearTimeout(copyTimer.current)
    copyTimer.current = setTimeout(() => setCopyState('idle'), 2000)
  }

  return (
    <article className="catalog-card" data-category={prompt.id}>
      <div className="prompt-card-top">
        <span className="catalog-badge">{prompt.category}</span>
        <div className="catalog-icon" aria-hidden="true"><Icon size={31} strokeWidth={1.7} /></div>
        <h2>{prompt.title}</h2>
      </div>
      <div className="prompt-card-description">
        <p>{prompt.description}</p>
        {showDetailsLink && (
          <Link className="prompt-detail-link" to={`/prompts/${prompt.id}`} aria-label={`Abrir página do prompt: ${prompt.title}`}>
            Abrir página do prompt <ArrowRight size={14} aria-hidden="true" />
          </Link>
        )}
      </div>
      <div className={`prompt-instructions${isOpen ? ' is-open' : ''}`}>
        <button
          className="instructions-toggle"
          type="button"
          id={triggerId}
          aria-expanded={isOpen}
          aria-controls={`${cardId}-instruction-panels`}
          onClick={() => setIsOpen((open) => !open)}
        >
          <span>Ver instruções</span>
          <ChevronDown size={17} aria-hidden="true" />
        </button>
        <div className="instruction-expansion" id={`${cardId}-instruction-panels`} aria-hidden={!isOpen} inert={!isOpen}>
          <div className="instruction-expansion-inner">
            <div className="instruction-tabs" role="tablist" aria-label={`Formatos de instrução para ${prompt.title}`}>
              {formats.map(({ id, label, Icon: FormatIcon }) => (
                <button
                  className={`instruction-tab format-${id}${activeFormat === id ? ' is-active' : ''}`}
                  type="button"
                  role="tab"
                  id={`${cardId}-tab-${id}`}
                  aria-selected={activeFormat === id}
                  aria-controls={`${cardId}-panel-${id}`}
                  tabIndex={activeFormat === id ? 0 : -1}
                  key={id}
                  ref={(element) => { tabRefs.current[id] = element }}
                  onClick={() => selectTab(id)}
                  onKeyDown={handleTabKeyDown}
                >
                  <FormatIcon size={15} aria-hidden="true" />{label}
                </button>
              ))}
            </div>
            {formats.map(({ id, label }) => (
              <section
                className="instruction-panel"
                role="tabpanel"
                id={`${cardId}-panel-${id}`}
                aria-labelledby={`${cardId}-tab-${id}`}
                aria-label={`Instrução ${label}`}
                hidden={activeFormat !== id}
                key={id}
                tabIndex={0}
              >
                <p className="instruction-text"><HighlightedInstruction text={prompt.instructions[id]} /></p>
                <div className="instruction-actions">
                  <span className="copy-feedback" role="status" aria-live="polite">
                    {copyState === 'copied' ? 'Instrução copiada.' : copyState === 'error' ? 'Não foi possível copiar.' : ''}
                  </span>
                  <button className={`copy-button${copyState === 'copied' ? ' is-copied' : ''}`} type="button" onClick={copyInstruction}>
                    {copyState === 'copied' ? <Check size={15} /> : <Clipboard size={15} />}
                    {copyState === 'copied' ? 'Copiado!' : copyState === 'error' ? 'Tentar novamente' : 'Copiar'}
                  </button>
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}
