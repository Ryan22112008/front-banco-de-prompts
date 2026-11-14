import { Search, X } from 'lucide-react'

type GlossarioBuscaProps = {
  value: string
  onChange: (value: string) => void
}

export function GlossarioBusca({ value, onChange }: GlossarioBuscaProps) {
  return (
    <div className="glossario-search-shell">
      <form
        className="catalog-search glossario-search"
        id="glossario-busca"
        role="search"
        onSubmit={(event) => event.preventDefault()}
      >
        <span className="glossario-search-icon" aria-hidden="true"><Search size={20} strokeWidth={1.8} /></span>
        <label className="sr-only" htmlFor="glossario-search">Buscar termo ou definição no glossário</label>
        <input
          id="glossario-search"
          type="search"
          placeholder="Buscar por termo ou definição..."
          value={value}
          onChange={(event) => onChange(event.target.value)}
          autoComplete="off"
          aria-describedby="glossario-search-hint"
        />
        {value ? (
          <button
            className="glossario-search-clear"
            type="button"
            aria-label="Limpar pesquisa do glossário"
            onClick={() => onChange('')}
          >
            <X size={18} aria-hidden="true" />
          </button>
        ) : (
          <button className="glossario-search-submit" type="submit" aria-label="Pesquisar no glossário">
            <Search size={16} aria-hidden="true" />
            <span>Buscar</span>
          </button>
        )}
      </form>
      <p className="glossario-search-hint" id="glossario-search-hint">
        Busca instantânea em termos e definições, sem diferenciar acentos ou maiúsculas.
        <span className="glossario-search-shortcut"><kbd>/</kbd> para focar</span>
      </p>
    </div>
  )
}
