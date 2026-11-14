export type GlossarioTermo = {
  id: string
  termo: string
  letra: string
  categoria: string
  definicao: string
  fonte: string | null
}

export type GlossarioData = {
  titulo: string
  publicadoEm: string
  atualizadoEm: string
  termos: GlossarioTermo[]
}
