import { Search } from 'lucide-react'
import { prompts } from '../components/prompts/data'
import { PromptGrid } from '../components/prompts/PromptGrid'

export default function Home() {
  return (
    <div className="catalog-page">
      <section className="catalog-intro" aria-labelledby="catalog-title">
        <span className="catalog-eyebrow">Banco de Prompts</span>
        <h1 id="catalog-title">Encontre o prompt ideal para sua necessidade.</h1>
        <p>Inspiração prática para transformar suas ideias em bons resultados.</p>
        <form className="catalog-search" id="busca" role="search" onSubmit={(event) => event.preventDefault()}>
          <label className="sr-only" htmlFor="catalog-search">Pesquisar por prompts, categorias ou tecnologias</label>
          <input id="catalog-search" type="search" placeholder="Pesquisar por prompts, categorias ou tecnologias..." />
          <button type="submit" aria-label="Pesquisar"><Search size={21} /></button>
        </form>
      </section>
      <section className="catalog-content" aria-label="Biblioteca de prompts">
        <div className="catalog-meta"><span>Explore a biblioteca</span><span>{prompts.length} prompts</span></div>
        <PromptGrid prompts={prompts} />
      </section>
    </div>
  )
}
