import { useMemo, useState } from 'react'
import { BookOpen, ListChecks, Search, SearchX, X } from 'lucide-react'
import type { BlockStatus } from '../components/ficha/BlocoFicha'
import { GrupoBlocos, type GroupStatus } from '../components/ficha/GrupoBlocos'
import { Questionario } from '../components/ficha/Questionario'
import {
  fichaBlocks,
  fichaGroups,
  fichaQuestions,
  fichaTotalFields,
  groupForTag,
  type FichaAnswers,
  type FichaBlock,
  type FichaField,
  type FichaGroup,
  type QuestionId,
} from '../components/ficha/fichaSistemaIA'

type FilterId = 'todos' | 'obrigatorios' | 'condicionais'

type VisibleBlock = {
  block: FichaBlock
  fields: FichaField[]
}

const filters: { id: FilterId; label: string }[] = [
  { id: 'todos', label: 'Todos' },
  { id: 'obrigatorios', label: 'Obrigatórios para qualquer sistema' },
  { id: 'condicionais', label: 'Condicionais' },
]

const emptyAnswers: FichaAnswers = {
  Q1: null,
  Q2: null,
  Q3: null,
  Q4: null,
  Q5: null,
  Q6: null,
  Q7: null,
}

function normalize(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR').trim()
}

function matchesFilter(block: FichaBlock, filter: FilterId) {
  return filter === 'todos'
    || (filter === 'obrigatorios' && block.tag === 'TODOS')
    || (filter === 'condicionais' && block.tag !== 'TODOS')
}

function blockMatchesQuery(block: FichaBlock, normalizedQuery: string) {
  return normalize([block.title, block.tag, block.activation, block.instruction].join(' ')).includes(normalizedQuery)
}

function fieldMatchesQuery(field: FichaField, normalizedQuery: string) {
  return normalize(`${field.title} ${field.summary}`).includes(normalizedQuery)
}

function joinNumbers(numbers: number[]) {
  if (numbers.length === 1) return String(numbers[0])
  return `${numbers.slice(0, -1).join(', ')} e ${numbers[numbers.length - 1]}`
}

function formatRange(numbers: number[]) {
  if (numbers.length === 1) return String(numbers[0])
  return `${numbers[0]}–${numbers[numbers.length - 1]}`
}

function resolveGroupStatus(group: FichaGroup, answers: FichaAnswers): GroupStatus {
  if (group.questionIds.length === 0) return 'always'
  const values = group.questionIds.map((questionId) => answers[questionId])
  if (values.some((value) => value === true)) return 'applicable'
  if (values.every((value) => value === false)) return 'not-applicable'
  return 'pending'
}

export default function FichaSistemaIA() {
  const [answers, setAnswers] = useState<FichaAnswers>(emptyAnswers)
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<FilterId>('todos')
  const [openBlocks, setOpenBlocks] = useState<Set<string>>(() => new Set())
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(() => new Set())

  const normalizedQuery = normalize(query)
  const statuses = useMemo(() => {
    const result = new Map<string, BlockStatus>()
    fichaBlocks.forEach((block) => {
      if (!block.question) {
        result.set(block.id, 'always')
        return
      }
      const answer = answers[block.question]
      result.set(block.id, answer === null ? 'pending' : answer ? 'applicable' : 'not-applicable')
    })
    return result
  }, [answers])

  const visibleBlocks = useMemo(() => {
    return fichaBlocks.flatMap<VisibleBlock>((block) => {
      if (!matchesFilter(block, filter)) return []

      const blockMatches = !normalizedQuery || blockMatchesQuery(block, normalizedQuery)
      const fields = blockMatches
        ? block.fields
        : block.fields.filter((field) => fieldMatchesQuery(field, normalizedQuery))

      if (normalizedQuery && !blockMatches && fields.length === 0) return []
      return [{ block, fields }]
    })
  }, [filter, normalizedQuery])

  const groupedBlocks = useMemo(() => {
    return fichaGroups.flatMap((group) => {
      const items = visibleBlocks.filter((item) => group.tags.includes(item.block.tag))
      return items.length > 0 ? [{ group, items }] : []
    })
  }, [visibleBlocks])

  const expandGroupsFor = (blockIds: string[]) => {
    if (!blockIds.length) return
    setCollapsedGroups((current) => {
      if (current.size === 0) return current
      const next = new Set(current)
      blockIds.forEach((id) => {
        const block = fichaBlocks.find((item) => item.id === id)
        if (block) next.delete(groupForTag(block.tag).id)
      })
      return next.size === current.size ? current : next
    })
  }

  const openMatchingBlocks = (value: string, activeFilter: FilterId) => {
    const normalized = normalize(value)
    if (!normalized) return

    const ids = fichaBlocks
      .filter((block) => matchesFilter(block, activeFilter)
        && (blockMatchesQuery(block, normalized) || block.fields.some((field) => fieldMatchesQuery(field, normalized))))
      .map((block) => block.id)
    if (!ids.length) return

    expandGroupsFor(ids)

    setOpenBlocks((current) => {
      let changed = false
      const next = new Set(current)
      ids.forEach((id) => {
        if (!next.has(id)) {
          next.add(id)
          changed = true
        }
      })
      return changed ? next : current
    })
  }

  const handleQueryChange = (value: string) => {
    setQuery(value)
    openMatchingBlocks(value, filter)
  }

  const handleFilterChange = (nextFilter: FilterId) => {
    setFilter(nextFilter)
    openMatchingBlocks(query, nextFilter)
  }

  const alwaysBlocks = fichaBlocks.filter((block) => block.tag === 'TODOS')
  const applicableConditionalBlocks = fichaBlocks.filter((block) => statuses.get(block.id) === 'applicable')
  const pendingCount = fichaQuestions.filter((question) => answers[question.id] === null).length
  const answeredCount = fichaQuestions.length - pendingCount
  const alwaysLabel = formatRange(alwaysBlocks.map((block) => block.number))
  const conditionalNumbers = applicableConditionalBlocks.map((block) => block.number)
  const summary = conditionalNumbers.length
    ? `Você deve preencher os blocos ${alwaysLabel}, ${joinNumbers(conditionalNumbers)}.`
    : `Você deve preencher os blocos ${alwaysLabel}.`
  const summaryNote = pendingCount > 0
    ? `Ainda há ${pendingCount} ${pendingCount === 1 ? 'pergunta sem resposta' : 'perguntas sem resposta'}; os blocos condicionais correspondentes não foram incluídos no resumo.`
    : conditionalNumbers.length === 0
      ? 'Nenhum bloco condicional se aplica às respostas informadas.'
      : `${applicableConditionalBlocks.length} ${applicableConditionalBlocks.length === 1 ? 'bloco condicional se aplica' : 'blocos condicionais se aplicam'} às respostas informadas.`

  const visibleFieldCount = visibleBlocks.reduce((total, item) => total + item.fields.length, 0)

  const handleAnswer = (questionId: QuestionId, value: boolean) => {
    setAnswers((current) => ({ ...current, [questionId]: current[questionId] === value ? null : value }))
  }

  const clearAnswers = () => {
    setAnswers({ ...emptyAnswers })
  }

  const toggleBlock = (blockId: string) => {
    setOpenBlocks((current) => {
      const next = new Set(current)
      if (next.has(blockId)) next.delete(blockId)
      else next.add(blockId)
      return next
    })
  }

  const toggleGroup = (groupId: string) => {
    setCollapsedGroups((current) => {
      const next = new Set(current)
      if (next.has(groupId)) next.delete(groupId)
      else next.add(groupId)
      return next
    })
  }

  const allGroupsCollapsed = groupedBlocks.every(({ group }) => collapsedGroups.has(group.id))

  const toggleAllGroups = () => {
    setCollapsedGroups(allGroupsCollapsed
      ? new Set()
      : new Set(groupedBlocks.map(({ group }) => group.id)))
  }

  const clearSearchAndFilters = () => {
    setQuery('')
    setFilter('todos')
  }

  return (
    <div className="catalog-page ficha-page">
      <section className="catalog-intro ficha-intro" aria-labelledby="ficha-title">
        <span className="catalog-eyebrow"><span className="eyebrow-mark" aria-hidden="true" />Ficha de Sistema de IA</span>
        <h1 id="ficha-title">Transparência estruturada para sistemas de <span className="hero-highlight">inteligência artificial.</span></h1>
        <p>A Ficha de Sistema de IA (AI System Card) reúne, em um único documento, informações sobre identificação, escopo, dados, riscos, governança e desempenho de um sistema de IA no serviço público. O modelo foi elaborado pela Secretaria de Governo Digital (SGD/MGI) para padronizar a transparência desses sistemas. As sete perguntas iniciais indicam quais dos 13 blocos devem ser preenchidos em cada caso.</p>
        <div className="catalog-metrics" aria-label="Resumo da ficha">
          <div><strong>{fichaBlocks.length}</strong><span>blocos</span></div>
          <span className="metric-separator" aria-hidden="true" />
          <div><strong>{fichaTotalFields}</strong><span>campos</span></div>
          <span className="metric-separator" aria-hidden="true" />
          <div><strong>{fichaQuestions.length}</strong><span>perguntas de entrada</span></div>
        </div>
      </section>

      <div className="ficha-content">
        <Questionario answers={answers} onAnswer={handleAnswer} onClear={clearAnswers} />

        <section className="ficha-summary" aria-labelledby="resumo-title" aria-live="polite">
          <div className="ficha-summary-icon" aria-hidden="true"><ListChecks size={24} strokeWidth={1.7} /></div>
          <div className="ficha-summary-copy">
            <span className="ficha-kicker">Passo 2</span>
            <h2 id="resumo-title">Resumo da aplicabilidade</h2>
            <p className="ficha-summary-text">{summary}</p>
            <p className="ficha-summary-note">{summaryNote}</p>
            <div className="ficha-summary-tags" aria-label="Blocos aplicáveis">
              <span className="ficha-tag" data-tag="TODOS">TODOS · {alwaysLabel}</span>
              {applicableConditionalBlocks.map((block) => (
                <span className="ficha-tag" data-tag={block.tag} key={block.id}>{block.tag} · {block.number}</span>
              ))}
            </div>
          </div>
          <span className="ficha-summary-count">{answeredCount}/7 respondidas</span>
        </section>

        <section className="ficha-library" aria-labelledby="blocos-title">
          <div className="ficha-library-heading">
            <div>
              <span className="ficha-kicker">Passo 3</span>
              <h2 id="blocos-title">Blocos e campos da ficha</h2>
              <p>Os 13 blocos estão agrupados pelas famílias de tecnologia do questionário. Veja quais se aplicam ao seu sistema e explore os campos de cada um.</p>
            </div>
            <div className="ficha-search" role="search">
              <Search size={19} strokeWidth={1.8} aria-hidden="true" />
              <label className="sr-only" htmlFor="ficha-search">Buscar campos e blocos da ficha</label>
              <input
                id="ficha-search"
                type="search"
                placeholder="Buscar campos ou blocos..."
                value={query}
                onChange={(event) => handleQueryChange(event.target.value)}
              />
              {query && (
                <button type="button" aria-label="Limpar busca" onClick={() => setQuery('')}>
                  <X size={18} aria-hidden="true" />
                </button>
              )}
            </div>
          </div>

          <div className="ficha-toolbar">
            <div className="ficha-filters" role="group" aria-label="Filtrar blocos por aplicabilidade">
              {filters.map((item) => (
                <button
                  className={`ficha-filter${filter === item.id ? ' is-active' : ''}`}
                  type="button"
                  aria-pressed={filter === item.id}
                  key={item.id}
                  onClick={() => handleFilterChange(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <span className="ficha-result-count" aria-live="polite">
              {visibleBlocks.length} de {fichaBlocks.length} blocos · {groupedBlocks.length} de {fichaGroups.length} grupos · {visibleFieldCount} de {fichaTotalFields} campos
            </span>
            <button
              className="ficha-groups-toggle"
              type="button"
              onClick={toggleAllGroups}
              aria-controls="ficha-groups"
            >
              {allGroupsCollapsed ? 'Expandir grupos' : 'Recolher grupos'}
            </button>
          </div>

          {visibleBlocks.length ? (
            <div className="ficha-groups" id="ficha-groups">
              {groupedBlocks.map(({ group, items }) => (
                <GrupoBlocos
                  key={group.id}
                  group={group}
                  items={items}
                  status={resolveGroupStatus(group, answers)}
                  statuses={statuses}
                  openBlocks={openBlocks}
                  isCollapsed={collapsedGroups.has(group.id)}
                  onToggleGroup={() => toggleGroup(group.id)}
                  onToggleBlock={toggleBlock}
                />
              ))}
            </div>
          ) : (
            <div className="ficha-empty" role="status">
              <SearchX size={30} aria-hidden="true" />
              <h3>Nenhum campo encontrado</h3>
              <p>Não há campos ou blocos que correspondam à busca e ao filtro selecionados. Tente outro termo ou amplie o filtro.</p>
              <button type="button" onClick={clearSearchAndFilters}>Limpar busca e filtros</button>
            </div>
          )}
        </section>

        <footer className="ficha-source">
          <BookOpen size={20} aria-hidden="true" />
          <p>
            <strong>Fonte:</strong> Secretaria de Governo Digital – Ministério da Gestão e da Inovação em Serviços Públicos.
            <span>Baseado no Modelo de Ficha de Sistema de IA (AI System Card) para o serviço público brasileiro.</span>
          </p>
        </footer>
      </div>
    </div>
  )
}
