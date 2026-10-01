import { useMemo, useState } from 'react'
import { Search, X } from 'lucide-react'
import { prompts } from '../components/prompts/data'
import { PromptGrid } from '../components/prompts/PromptGrid'

function normalize(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR').trim()
}

export default function Home() {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('Todas')
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

  return (
    <div className="catalog-page">
      <section className="catalog-intro" aria-labelledby="catalog-title">
        <span className="catalog-eyebrow">Banco de Prompts</span>
        <h1 id="catalog-title">Encontre o prompt ideal para sua necessidade.</h1>
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
      </section>
      <section className="catalog-content" id="catalogo" aria-label="Biblioteca de prompts">
        <div className="catalog-toolbar">
          <div className="catalog-meta"><span>Explore a biblioteca</span><span aria-live="polite">{filteredPrompts.length} {filteredPrompts.length === 1 ? 'prompt' : 'prompts'}</span></div>
          <div className="category-filters" id="categorias" role="group" aria-label="Filtrar por categoria">
            {categories.map((category) => (
              <button
                className={`category-filter${activeCategory === category ? ' is-active' : ''}`}
                type="button"
                aria-pressed={activeCategory === category}
                key={category}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
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
