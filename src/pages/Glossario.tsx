import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { BookOpen, CalendarDays, SearchX, X } from 'lucide-react'
import { AlfabetoNav } from '../components/glossario/AlfabetoNav'
import { FiltroCategoria } from '../components/glossario/FiltroCategoria'
import { GlossarioBusca } from '../components/glossario/GlossarioBusca'
import { TermoCard } from '../components/glossario/TermoCard'
import {
  CATEGORIA_TODAS,
  categoriasGlossario,
  glossario,
  normalizar,
  termosGlossario,
  TOTAL_TERMOS,
} from '../components/glossario/glossario'
import type { GlossarioTermo } from '../components/glossario/types'

type GrupoTermos = {
  letra: string
  termos: GlossarioTermo[]
}

function agruparPorLetra(termos: GlossarioTermo[]): GrupoTermos[] {
  const grupos = new Map<string, GlossarioTermo[]>()

  termos.forEach((termo) => {
    const grupo = grupos.get(termo.letra)
    if (grupo) grupo.push(termo)
    else grupos.set(termo.letra, [termo])
  })

  return [...grupos.entries()]
    .sort(([letraA], [letraB]) => letraA.localeCompare(letraB, 'pt-BR', { sensitivity: 'base' }))
    .map(([letra, termosDoGrupo]) => ({ letra, termos: termosDoGrupo }))
}

function rolarSemAnimacao() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export default function Glossario() {
  const [query, setQuery] = useState('')
  const [categoria, setCategoria] = useState(CATEGORIA_TODAS)
  const [letraAtiva, setLetraAtiva] = useState<string | null>(null)
  const [letraVisivel, setLetraVisivel] = useState<string | null>(null)
  const [alturaControles, setAlturaControles] = useState(0)
  const resultadosRef = useRef<HTMLElement>(null)
  const controlesRef = useRef<HTMLDivElement>(null)

  const contagensPorLetra = useMemo(() => {
    const contagens = new Map<string, number>()
    glossario.termos.forEach((termo) => {
      contagens.set(termo.letra, (contagens.get(termo.letra) ?? 0) + 1)
    })
    return contagens
  }, [])

  const contagensPorCategoria = useMemo(() => {
    const contagens: Record<string, number> = {}
    glossario.termos.forEach((termo) => {
      contagens[termo.categoria] = (contagens[termo.categoria] ?? 0) + 1
    })
    return contagens
  }, [])

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if (event.key !== '/' || event.metaKey || event.ctrlKey || event.altKey) return
      const target = event.target
      if (target instanceof HTMLElement && (
        target.isContentEditable
        || target.tagName === 'INPUT'
        || target.tagName === 'TEXTAREA'
        || target.tagName === 'SELECT'
      )) return

      event.preventDefault()
      const input = document.getElementById('glossario-search') as HTMLInputElement | null
      input?.scrollIntoView({ behavior: rolarSemAnimacao() ? 'auto' : 'smooth', block: 'center' })
      input?.focus({ preventScroll: true })
    }

    window.addEventListener('keydown', handleShortcut)
    return () => window.removeEventListener('keydown', handleShortcut)
  }, [])

  const termosFiltrados = useMemo(() => {
    const busca = normalizar(query)

    return termosGlossario.filter((termo) => {
      const correspondeCategoria = categoria === CATEGORIA_TODAS || termo.categoria === categoria
      const correspondeLetra = letraAtiva === null || termo.letra === letraAtiva
      const correspondeBusca = !busca || normalizar(`${termo.termo} ${termo.definicao}`).includes(busca)
      return correspondeCategoria && correspondeLetra && correspondeBusca
    })
  }, [categoria, letraAtiva, query])

  const grupos = useMemo(() => agruparPorLetra(termosFiltrados), [termosFiltrados])
  const temFiltrosAtivos = query !== '' || categoria !== CATEGORIA_TODAS || letraAtiva !== null

  useEffect(() => {
    const controles = controlesRef.current
    if (!controles) return

    const atualizar = () => {
      setAlturaControles(Math.round(controles.getBoundingClientRect().height))
    }

    atualizar()
    if (typeof ResizeObserver === 'undefined') return

    const observer = new ResizeObserver(atualizar)
    observer.observe(controles)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const secoes = resultadosRef.current?.querySelectorAll<HTMLElement>('[data-glossario-grupo]')
    if (!secoes?.length) {
      setLetraVisivel(null)
      return
    }

    const visiveis = new Map<string, number>()
    let observer: IntersectionObserver | null = null

    const configurar = () => {
      observer?.disconnect()
      visiveis.clear()

      const alturaHeader =
        Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 76
      const layoutCompacto = window.matchMedia('(max-width: 760px)').matches
      const offsetTopo = layoutCompacto
        ? alturaHeader + 44
        : alturaHeader + 8 + alturaControles + 16

      observer = new IntersectionObserver(
        (entradas) => {
          entradas.forEach((entrada) => {
            const letra = (entrada.target as HTMLElement).dataset.letra
            if (!letra) return
            if (entrada.isIntersecting) visiveis.set(letra, entrada.boundingClientRect.top)
            else visiveis.delete(letra)
          })

          if (!visiveis.size) return
          const ordenadas = [...visiveis.entries()].sort((a, b) => a[1] - b[1])
          const letra = ordenadas[0]?.[0]
          if (letra) setLetraVisivel(letra)
        },
        {
          rootMargin: `-${Math.round(offsetTopo)}px 0px -55% 0px`,
          threshold: 0,
        },
      )

      secoes.forEach((secao) => observer?.observe(secao))
    }

    configurar()
    window.addEventListener('resize', configurar)
    return () => {
      window.removeEventListener('resize', configurar)
      observer?.disconnect()
    }
  }, [grupos, alturaControles])

  const selecionarLetra = (letra: string) => {
    const desativando = letraAtiva === letra
    setLetraAtiva(desativando ? null : letra)
    const comportamento = rolarSemAnimacao() ? 'auto' : 'smooth'

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        const alvo = desativando
          ? resultadosRef.current
          : document.getElementById(`glossario-letra-${letra.toLocaleLowerCase('pt-BR')}`) ?? resultadosRef.current
        if (!alvo) return

        const alturaHeader =
          Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 76
        const alturaControlesAtual = controlesRef.current?.getBoundingClientRect().height ?? alturaControles
        const layoutCompacto = window.matchMedia('(max-width: 760px)').matches
        const offsetSticky = layoutCompacto
          ? alturaHeader
          : alturaHeader + 8 + alturaControlesAtual + 12
        const deslocamento = desativando ? alturaHeader + 16 : offsetSticky
        const topo = alvo.getBoundingClientRect().top + window.scrollY - deslocamento

        window.scrollTo({ top: Math.max(0, topo), behavior: comportamento })
      })
    })
  }

  const limparFiltros = () => {
    setQuery('')
    setCategoria(CATEGORIA_TODAS)
    setLetraAtiva(null)
  }

  return (
    <div
      className="catalog-page glossario-page"
      style={{ '--glossario-controls-height': `${alturaControles}px` } as CSSProperties}
    >
      <section className="catalog-intro glossario-intro" aria-labelledby="glossario-title">
        <span className="catalog-eyebrow"><span className="eyebrow-mark" aria-hidden="true" />Glossário de IA</span>
        <h1 id="glossario-title">Glossário de Termos Relacionados à <span className="hero-highlight">IA</span></h1>
        <p>
          Reúne, em linguagem clara, os termos usados no serviço público a partir do material oficial do
          MGI/SGD e do Serpro.
        </p>
        <div className="glossario-hero-meta" aria-label="Resumo do glossário">
          <div className="glossario-hero-stat"><strong>{TOTAL_TERMOS}</strong><span>termos</span></div>
          <span className="glossario-hero-separator" aria-hidden="true" />
          <div className="glossario-hero-stat"><strong>{categoriasGlossario.length}</strong><span>categorias</span></div>
          <span className="glossario-hero-separator" aria-hidden="true" />
          <div className="glossario-hero-update">
            <CalendarDays size={15} strokeWidth={1.8} aria-hidden="true" />
            <span>Atualizado em <strong>{glossario.atualizadoEm}</strong></span>
          </div>
        </div>
        <GlossarioBusca value={query} onChange={setQuery} />
      </section>

      <section
        className="catalog-content glossario-content"
        id="glossario-resultados"
        ref={resultadosRef}
        aria-label="Termos do glossário"
      >
        <div className="glossario-controls" ref={controlesRef}>
          <div className="glossario-toolbar">
            <div className="glossario-toolbar-top">
              <p className="catalog-meta glossario-meta">
                <span>Explore o glossário</span>
                <span className="glossario-meta-count" aria-live="polite" aria-atomic="true">
                  <strong>{termosFiltrados.length}</strong> de {TOTAL_TERMOS} termos
                  <span className="glossario-meta-groups" aria-hidden="true">
                    {' '}· {grupos.length} {grupos.length === 1 ? 'letra' : 'letras'}
                  </span>
                </span>
              </p>
              <FiltroCategoria
                categorias={categoriasGlossario}
                contagens={contagensPorCategoria}
                total={TOTAL_TERMOS}
                value={categoria}
                onChange={setCategoria}
              />
            </div>
            <AlfabetoNav
              contagensPorLetra={contagensPorLetra}
              letraAtiva={letraAtiva}
              letraVisivel={letraVisivel}
              onSelecionar={selecionarLetra}
            />
          </div>

          {temFiltrosAtivos && (
            <div className="glossario-chips" aria-label="Filtros ativos">
              {query && (
                <button
                  className="glossario-chip"
                  type="button"
                  onClick={() => setQuery('')}
                  aria-label={`Remover filtro de busca: ${query}`}
                >
                  <span>Busca: “{query}”</span>
                  <X size={12} aria-hidden="true" />
                </button>
              )}
              {categoria !== CATEGORIA_TODAS && (
                <button
                  className="glossario-chip"
                  type="button"
                  onClick={() => setCategoria(CATEGORIA_TODAS)}
                  aria-label={`Remover filtro de categoria: ${categoria}`}
                >
                  <span>{categoria}</span>
                  <X size={12} aria-hidden="true" />
                </button>
              )}
              {letraAtiva && (
                <button
                  className="glossario-chip"
                  type="button"
                  onClick={() => setLetraAtiva(null)}
                  aria-label={`Remover filtro da letra ${letraAtiva}`}
                >
                  <span>Letra {letraAtiva}</span>
                  <X size={12} aria-hidden="true" />
                </button>
              )}
              <button className="glossario-chip-reset" type="button" onClick={limparFiltros}>
                Limpar tudo
              </button>
            </div>
          )}
        </div>

        {grupos.length ? (
          <div className="glossario-lista">
            {grupos.map((grupo) => {
              const tituloId = `glossario-letra-${grupo.letra.toLocaleLowerCase('pt-BR')}`
              const total = grupo.termos.length
              const totalLabel = `${total} ${total === 1 ? 'termo' : 'termos'}`
              const amostra = grupo.termos
                .slice(0, 3)
                .map((termo) => termo.termo)
                .join(', ')
              const resumo = total > 3 ? `${amostra}…` : amostra

              return (
                <section
                  className="glossario-grupo"
                  id={tituloId}
                  key={grupo.letra}
                  data-glossario-grupo
                  data-letra={grupo.letra}
                  aria-labelledby={`${tituloId}-titulo`}
                >
                  <h2 className="glossario-grupo-titulo" id={`${tituloId}-titulo`}>
                    <span className="glossario-grupo-titulo-letra" aria-hidden="true">{grupo.letra}</span>
                    <span className="glossario-grupo-titulo-count" aria-hidden="true">{totalLabel}</span>
                    <span className="sr-only">Termos com a letra {grupo.letra}, {totalLabel}</span>
                  </h2>
                  <div className="glossario-grupo-corpo">
                    <div className="glossario-grupo-aside" aria-hidden="true">
                      <div className="glossario-grupo-marca">
                        <span className="glossario-grupo-letra">{grupo.letra}</span>
                        <div className="glossario-grupo-marca-meta">
                          <span className="glossario-grupo-marca-count">{totalLabel}</span>
                          <p className="glossario-grupo-marca-termos">{resumo}</p>
                        </div>
                      </div>
                    </div>
                    <div className="glossario-grid">
                      {grupo.termos.map((termo) => (
                        <TermoCard key={termo.id} termo={termo} query={query} />
                      ))}
                    </div>
                  </div>
                </section>
              )
            })}
          </div>
        ) : (
          <div className="empty-results glossario-empty" role="status">
            <div className="glossario-empty-icon" aria-hidden="true"><SearchX size={27} strokeWidth={1.7} /></div>
            <h2>Nenhum termo encontrado</h2>
            <p>Tente outra palavra, escolha uma categoria diferente ou remova o filtro de letra.</p>
            <button type="button" onClick={limparFiltros}>Limpar filtros</button>
          </div>
        )}

        <footer className="glossario-nota">
          <span className="glossario-nota-icon" aria-hidden="true"><BookOpen size={20} strokeWidth={1.7} /></span>
          <div>
            <span className="glossario-nota-kicker">Referência</span>
            <p>
              Conteúdo baseado na Cartilha “IA Generativa no Serviço Público” (MGI/SGD e Serpro) e em outras
              fontes citadas em cada termo.
            </p>
          </div>
        </footer>
      </section>
    </div>
  )
}
