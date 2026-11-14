import { ALFABETO } from './glossario'

type AlfabetoNavProps = {
  contagensPorLetra: Map<string, number>
  letraAtiva: string | null
  letraVisivel: string | null
  onSelecionar: (letra: string) => void
}

export function AlfabetoNav({ contagensPorLetra, letraAtiva, letraVisivel, onSelecionar }: AlfabetoNavProps) {
  return (
    <nav className="glossario-alfabeto" aria-label="Navegação alfabética">
      <div className="glossario-alfabeto-list" role="group" aria-label="Filtrar termos pela letra inicial">
        {ALFABETO.map((letra) => {
          const total = contagensPorLetra.get(letra) ?? 0
          const disponivel = total > 0
          const filtrada = letraAtiva === letra
          const ativa = letraAtiva ? filtrada : letraVisivel === letra

          return (
            <button
              className={`glossario-letra${ativa ? ' is-ativa' : ''}`}
              type="button"
              key={letra}
              disabled={!disponivel}
              aria-pressed={filtrada}
              aria-label={
                disponivel
                  ? filtrada
                    ? `Mostrar termos de todas as letras, removendo o filtro da letra ${letra}`
                    : `Filtrar termos pela letra ${letra}, ${total} ${total === 1 ? 'termo' : 'termos'}`
                  : `Nenhum termo na letra ${letra}`
              }
              onClick={() => onSelecionar(letra)}
            >
              <span className="glossario-letra-simbolo">{letra}</span>
              {disponivel && <span className="glossario-letra-count" aria-hidden="true">{total}</span>}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
