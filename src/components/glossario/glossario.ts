import glossarioJson from '../../data/glossario-ia.json'
import type { GlossarioData } from './types'

export const glossario = glossarioJson as GlossarioData

export const TOTAL_TERMOS = glossario.termos.length

export const CATEGORIA_TODAS = 'Todas'

export const ALFABETO = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

export const termosGlossario = [...glossario.termos].sort((a, b) =>
  a.termo.localeCompare(b.termo, 'pt-BR', { sensitivity: 'base' }),
)

const ordemCategorias = [
  'Conceitos de IA',
  'Classificação de risco',
  'Proteção de dados',
  'Vieses e discriminação',
  'RAG',
  'Ética e governança',
  'Princípios da administração pública',
]

export const categoriasGlossario = [...new Set(glossario.termos.map((termo) => termo.categoria))].sort(
  (a, b) => {
    const posicaoA = ordemCategorias.indexOf(a)
    const posicaoB = ordemCategorias.indexOf(b)
    const ordemA = posicaoA === -1 ? ordemCategorias.length : posicaoA
    const ordemB = posicaoB === -1 ? ordemCategorias.length : posicaoB
    return ordemA - ordemB || a.localeCompare(b, 'pt-BR', { sensitivity: 'base' })
  },
)

export function normalizar(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('pt-BR')
    .trim()
}

export function slugCategoria(categoria: string) {
  return normalizar(categoria)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
