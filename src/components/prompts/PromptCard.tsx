import { useEffect, useId, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Check, ChevronDown, Clipboard, X } from 'lucide-react'
import type { InstructionFormat, PromptItem } from './types'
import { instructionFormats } from './formats'
import { InstructionText } from './InstructionText'

export function PromptCard({ prompt, initialExpanded = false, showDetailsLink = true }: { prompt: PromptItem; initialExpanded?: boolean; showDetailsLink?: boolean }) {
  const [isOpen, setIsOpen] = useState(initialExpanded)
  const [selectedFormat, setSelectedFormat] = useState<InstructionFormat | null>(null)
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'error'>('idle')
  const dialogRef = useRef<HTMLDialogElement>(null)
  const copyTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const cardId = `${prompt.id}-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`
  const triggerId = `${cardId}-instructions-trigger`
  const Icon = prompt.icon
  const activeFormat = instructionFormats.find(({ id }) => id === selectedFormat)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (selectedFormat) {
      if (!dialog.open) dialog.showModal()
      const previousOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = previousOverflow }
    }

    if (dialog.open) dialog.close()
  }, [selectedFormat])

  useEffect(() => () => {
    if (copyTimer.current) clearTimeout(copyTimer.current)
  }, [])

  const copyInstruction = async () => {
    if (!selectedFormat) return
    try {
      await navigator.clipboard.writeText(prompt.instructions[selectedFormat])
      setCopyState('copied')
    } catch {
      setCopyState('error')
    }
    if (copyTimer.current) clearTimeout(copyTimer.current)
    copyTimer.current = setTimeout(() => setCopyState('idle'), 2000)
  }

  const closeDialog = () => {
    if (dialogRef.current?.open) dialogRef.current.close()
    else setSelectedFormat(null)
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
          aria-controls={`${cardId}-format-options`}
          onClick={() => setIsOpen((open) => !open)}
        >
          <span>Ver instruções</span>
          <ChevronDown size={17} aria-hidden="true" />
        </button>
        <div
          className="format-options-expansion"
          id={`${cardId}-format-options`}
          role="group"
          aria-label={`Escolher formato das instruções para ${prompt.title}`}
          aria-hidden={!isOpen}
          inert={!isOpen}
        >
          <div className="format-options-inner">
            {instructionFormats.map(({ id, label, Icon: FormatIcon }) => (
              <button
                className={`format-option format-${id}`}
                type="button"
                onClick={() => { setCopyState('idle'); setSelectedFormat(id) }}
                key={id}
              >
                <FormatIcon size={15} aria-hidden="true" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <dialog
        ref={dialogRef}
        className="instruction-dialog"
        aria-label={activeFormat ? `Instrução ${activeFormat.label} para ${prompt.title}` : undefined}
        aria-describedby={`${cardId}-instruction-copy`}
        onClose={() => { setSelectedFormat(null); setCopyState('idle') }}
        onClick={(event) => {
          const bounds = event.currentTarget.getBoundingClientRect()
          const clickIsInside = event.clientX >= bounds.left && event.clientX <= bounds.right
            && event.clientY >= bounds.top && event.clientY <= bounds.bottom
          if (!clickIsInside) closeDialog()
        }}
      >
        {activeFormat && (
          <>
            <div className="format-detail-card-heading">
              <div className={`format-detail-icon format-${activeFormat.id}`}><activeFormat.Icon size={20} aria-hidden="true" /></div>
              <div>
                <span>Instrução selecionada</span>
                <h2>{activeFormat.label}</h2>
              </div>
              <button className="dialog-close" type="button" onClick={closeDialog} aria-label="Fechar instrução" autoFocus>
                <X size={18} aria-hidden="true" />
              </button>
            </div>
            <div className="format-detail-editor" id={`${cardId}-instruction-copy`}>
              <p><InstructionText text={prompt.instructions[activeFormat.id]} /></p>
            </div>
            <div className="format-detail-actions">
              <span className={`copy-feedback${copyState === 'error' ? ' is-error' : ''}`} role="status" aria-live="polite">
                {copyState === 'copied' ? 'Instrução copiada.' : copyState === 'error' ? 'Não foi possível copiar.' : ''}
              </span>
              <button className={`copy-button${copyState === 'copied' ? ' is-copied' : ''}`} type="button" onClick={copyInstruction}>
                {copyState === 'copied' ? <Check size={15} aria-hidden="true" /> : <Clipboard size={15} aria-hidden="true" />}
                {copyState === 'copied' ? 'Copiado!' : copyState === 'error' ? 'Tentar novamente' : 'Copiar instrução'}
              </button>
            </div>
          </>
        )}
      </dialog>
    </article>
  )
}
