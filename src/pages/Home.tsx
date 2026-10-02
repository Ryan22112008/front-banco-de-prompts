import { useEffect, useMemo, useRef, useState } from 'react'
import { Check, ChevronDown, Search, X } from 'lucide-react'
import { prompts } from '../components/prompts/data'
import { PromptGrid } from '../components/prompts/PromptGrid'

function normalize(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR').trim()
}

function formatCategoryLabel(category: string) {
  return category.toLocaleLowerCase('pt-BR').replace(/(^|\s)\p{L}/gu, (letter) => letter.toLocaleUpperCase('pt-BR'))
}

export default function Home() {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('Todas')
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)
  const categorySelectorRef = useRef<HTMLDivElement>(null)
  const categoryTriggerRef = useRef<HTMLButtonElement>(null)
  const categories = useMemo(() => ['Todas', ...new Set(prompts.map((prompt) => prompt.category))], [])
  const filteredPrompts = useMemo(() => {
    const normalizedQuery = normalize(query)
    return prompts.filter((prompt) => {
      const matchesCategory = activeCategory === 'Todas' || prompt.category === activeCategory
      const searchableText = normalize([
        prompt.category,
        prompt.title,
        prompt.description,
        ...Object.values(prompt.instructions),
      ].join(' '))
      return matchesCategory && (!normalizedQuery || searchableText.includes(normalizedQuery))
    })
  }, [activeCategory, query])

  useEffect(() => {
    if (!isCategoryOpen) return

    const handlePointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !categorySelectorRef.current?.contains(event.target)) {
        setIsCategoryOpen(false)
      }
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsCategoryOpen(false)
        categoryTriggerRef.current?.focus()
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isCategoryOpen])

  const categoryCount = new Set(prompts.map((prompt) => prompt.category)).size
  const formatCount = new Set(prompts.flatMap((prompt) => Object.keys(prompt.instructions))).size

  return (
    <div className="catalog-page">
      <section className="catalog-intro" aria-labelledby="catalog-title">
        <h1 id="catalog-title">Encontre o prompt ideal para sua <span className="hero-highlight">necessidade.</span></h1>
        <p>Inspiração prática para transformar suas ideias em bons resultados.</p>
        <form className="catalog-search" id="busca" role="search" onSubmit={(event) => event.preventDefault()}>
          <label className="sr-only" htmlFor="catalog-search">Pesquisar por prompts, categorias ou tecnologias</label>
          <input
            id="catalog-search"
            type="search"
            placeholder="Pesquisar por prompts, categorias ou tecnologias..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          {query ? (
            <button type="button" aria-label="Limpar pesquisa" onClick={() => setQuery('')}><X size={20} /></button>
          ) : (
            <button type="submit" aria-label="Pesquisar"><Search size={21} /></button>
          )}
        </form>
        <div className="catalog-metrics" aria-label="Resumo da biblioteca">
          <div><strong>{prompts.length}</strong><span>prompts prontos</span></div>
          <span className="metric-separator" aria-hidden="true" />
          <div><strong>{categoryCount}</strong><span>categorias</span></div>
          <span className="metric-separator" aria-hidden="true" />
          <div><strong>{formatCount}</strong><span>formatos de saída</span></div>
        </div>
      </section>
      <section className="catalog-content" id="catalogo" aria-label="Biblioteca de prompts">
        <div className="catalog-toolbar">
          <div className="catalog-meta"><span>Explore a biblioteca</span><span aria-live="polite">{filteredPrompts.length} {filteredPrompts.length === 1 ? 'prompt' : 'prompts'}</span></div>
          <div className="category-selector" ref={categorySelectorRef}>
            <button
              className={`category-selector-trigger${isCategoryOpen ? ' is-open' : ''}`}
              type="button"
              id="category-selector-trigger"
              ref={categoryTriggerRef}
              aria-label={`Categoria selecionada: ${formatCategoryLabel(activeCategory)}`}
              aria-expanded={isCategoryOpen}
              aria-controls="category-selector-options"
              onClick={() => setIsCategoryOpen((open) => !open)}
            >
              <span>{activeCategory === 'Todas' ? 'Categorias' : formatCategoryLabel(activeCategory)}</span>
              <ChevronDown size={16} aria-hidden="true" />
            </button>
            <div
              className={`category-selector-popover${isCategoryOpen ? ' is-open' : ''}`}
              id="category-selector-options"
              role="group"
              aria-label="Filtrar por categoria"
              aria-hidden={!isCategoryOpen}
              inert={!isCategoryOpen}
            >
              {categories.map((category) => (
                <button
                  className={`category-selector-option${activeCategory === category ? ' is-active' : ''}`}
                  type="button"
                  aria-pressed={activeCategory === category}
                  key={category}
                  onClick={() => {
                    setActiveCategory(category)
                    setIsCategoryOpen(false)
                    categoryTriggerRef.current?.focus()
                  }}
                >
                  <Check className="category-selector-check" size={15} aria-hidden="true" />
                  <span className="category-selector-label">{formatCategoryLabel(category)}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        {filteredPrompts.length ? (
          <PromptGrid prompts={filteredPrompts} />
        ) : (
          <div className="empty-results" role="status">
            <h2>Nenhum prompt encontrado</h2>
            <p>Tente outro termo ou escolha uma categoria diferente.</p>
            <button type="button" onClick={() => { setQuery(''); setActiveCategory('Todas') }}>Limpar busca e filtros</button>
          </div>
        )}
      </section>
    </div>
  )
}
