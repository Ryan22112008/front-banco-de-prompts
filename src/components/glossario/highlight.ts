import { normalizar } from './glossario'

export type TextoSegmento = {
  texto: string
  destaque: boolean
}

function normalizarComMapa(texto: string) {
  let normalizado = ''
  const mapa: number[] = []

  for (let index = 0; index < texto.length; index += 1) {
    const caractere = texto[index]
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLocaleLowerCase('pt-BR')

    for (let parte = 0; parte < caractere.length; parte += 1) {
      normalizado += caractere[parte]
      mapa.push(index)
    }
  }

  return { normalizado, mapa }
}

export function destacarTexto(texto: string, busca: string): TextoSegmento[] {
  const alvo = normalizar(busca)
  if (!alvo) return [{ texto, destaque: false }]

  const { normalizado, mapa } = normalizarComMapa(texto)
  const segmentos: TextoSegmento[] = []
  let cursor = 0
  let posicao = normalizado.indexOf(alvo)

  while (posicao !== -1) {
    const inicio = mapa[posicao]
    const fim = mapa[posicao + alvo.length - 1] + 1

    if (inicio > cursor) segmentos.push({ texto: texto.slice(cursor, inicio), destaque: false })
    segmentos.push({ texto: texto.slice(inicio, fim), destaque: true })
    cursor = fim
    posicao = normalizado.indexOf(alvo, posicao + alvo.length)
  }

  if (cursor < texto.length) segmentos.push({ texto: texto.slice(cursor), destaque: false })
  return segmentos
}
