import { useEffect, useRef, useState } from 'react'
import { Check, ChevronDown } from 'lucide-react'
import { CATEGORIA_TODAS, slugCategoria } from './glossario'

type FiltroCategoriaProps = {
  categorias: string[]
  contagens: Record<string, number>
  total: number
  value: string
  onChange: (value: string) => void
}

function categoriaSlug(categoria: string) {
  return categoria === CATEGORIA_TODAS ? 'todas' : slugCategoria(categoria)
}

export function FiltroCategoria({ categorias, contagens, total, value, onChange }: FiltroCategoriaProps) {
  const [isOpen, setIsOpen] = useState(false)
  const selectorRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const options = [CATEGORIA_TODAS, ...categorias]

  useEffect(() => {
    if (!isOpen) return

    const handlePointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !selectorRef.current?.contains(event.target)) {
        setIsOpen(false)
      }
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
        triggerRef.current?.focus()
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const label = value === CATEGORIA_TODAS ? 'Categorias' : value

  return (
    <div className="category-selector glossario-category-selector" ref={selectorRef}>
      <button
        className={`category-selector-trigger${isOpen ? ' is-open' : ''}`}
        type="button"
        ref={triggerRef}
        aria-label={`Categoria selecionada: ${label}`}
        aria-expanded={isOpen}
        aria-controls="glossario-category-options"
        onClick={() => setIsOpen((open) => !open)}
      >
        <span className="glossario-category-trigger-label">
          <span className="glossario-category-dot" data-categoria={categoriaSlug(value)} aria-hidden="true" />
          <span>{label}</span>
        </span>
        <ChevronDown size={16} aria-hidden="true" />
      </button>
      <div
        className={`category-selector-popover${isOpen ? ' is-open' : ''}`}
        id="glossario-category-options"
        role="group"
        aria-label="Filtrar termos por categoria"
        aria-hidden={!isOpen}
        inert={!isOpen}
      >
        {options.map((categoria) => {
          const count = categoria === CATEGORIA_TODAS ? total : contagens[categoria] ?? 0
          return (
            <button
              className={`category-selector-option${value === categoria ? ' is-active' : ''}`}
              type="button"
              key={categoria}
              aria-pressed={value === categoria}
              onClick={() => {
                onChange(categoria)
                setIsOpen(false)
                triggerRef.current?.focus()
              }}
            >
              <Check className="category-selector-check" size={15} aria-hidden="true" />
              <span className="glossario-category-dot" data-categoria={categoriaSlug(categoria)} aria-hidden="true" />
              <span className="category-selector-label">{categoria}</span>
              <span className="glossario-category-count" aria-hidden="true">{count}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
