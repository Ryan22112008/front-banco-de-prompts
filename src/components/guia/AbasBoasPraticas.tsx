import { useRef, useState, type KeyboardEvent } from 'react'
import type { AbaGuia } from '../../data/guiaIA'
import { Icone } from './Icone'

type AbasBoasPraticasProps = {
  abas: AbaGuia[]
}

export function AbasBoasPraticas({ abas }: AbasBoasPraticasProps) {
  const [ativa, setAtiva] = useState(abas[0]?.id ?? '')
  const botoesRef = useRef<Array<HTMLButtonElement | null>>([])

  const focarAba = (indice: number) => {
    const alvo = botoesRef.current[indice]
    if (!alvo) return
    setAtiva(abas[indice].id)
    alvo.focus()
  }

  const aoTeclar = (event: KeyboardEvent<HTMLButtonElement>, indice: number) => {
    const ultimo = abas.length - 1
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      focarAba(indice === ultimo ? 0 : indice + 1)
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      focarAba(indice === 0 ? ultimo : indice - 1)
    } else if (event.key === 'Home') {
      event.preventDefault()
      focarAba(0)
    } else if (event.key === 'End') {
      event.preventDefault()
      focarAba(ultimo)
    }
  }

  return (
    <div className="guia-abas">
      <div className="guia-abas-lista" role="tablist" aria-label="Boas práticas por tema">
        {abas.map((aba, indice) => {
          const selecionada = aba.id === ativa
          return (
            <button
              className={`guia-aba${selecionada ? ' is-active' : ''}`}
              type="button"
              role="tab"
              id={`aba-${aba.id}`}
              key={aba.id}
              aria-selected={selecionada}
              aria-controls={`painel-${aba.id}`}
              tabIndex={selecionada ? 0 : -1}
              ref={(elemento) => {
                botoesRef.current[indice] = elemento
              }}
              onClick={() => setAtiva(aba.id)}
              onKeyDown={(event) => aoTeclar(event, indice)}
            >
              <Icone nome={aba.icone} size={17} />
              <span>{aba.titulo}</span>
            </button>
          )
        })}
      </div>

      {abas.map((aba) => {
        const selecionada = aba.id === ativa
        return (
          <div
            className="guia-aba-painel"
            role="tabpanel"
            id={`painel-${aba.id}`}
            key={aba.id}
            aria-labelledby={`aba-${aba.id}`}
            tabIndex={0}
            hidden={!selecionada}
          >
            {aba.paragrafos.map((paragrafo) => (
              <p key={paragrafo}>{paragrafo}</p>
            ))}
            {aba.destaque && (
              <p className="guia-destaque" data-tom="atencao">
                <Icone nome="lightbulb" size={18} />
                <span>{aba.destaque}</span>
              </p>
            )}
          </div>
        )
      })}
    </div>
  )
}
