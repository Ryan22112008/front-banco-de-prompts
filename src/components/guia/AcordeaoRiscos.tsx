import { useState } from 'react'
import { ChevronDown, ChevronsDownUp, ChevronsUpDown } from 'lucide-react'
import type { RiscoGuia } from '../../data/guiaIA'
import { Icone } from './Icone'

type AcordeaoRiscosProps = {
  riscos: RiscoGuia[]
}

export function AcordeaoRiscos({ riscos }: AcordeaoRiscosProps) {
  const [abertos, setAbertos] = useState<Set<string>>(() => new Set())
  const todosAbertos = abertos.size === riscos.length

  const alternar = (id: string) => {
    setAbertos((atual) => {
      const proximo = new Set(atual)
      if (proximo.has(id)) proximo.delete(id)
      else proximo.add(id)
      return proximo
    })
  }

  const alternarTodos = () => {
    setAbertos(todosAbertos ? new Set() : new Set(riscos.map((risco) => risco.id)))
  }

  return (
    <div className="guia-acordeao">
      <div className="guia-acordeao-acoes">
        <button
          className="guia-botao guia-botao-secundario guia-botao-compacto"
          type="button"
          onClick={alternarTodos}
          aria-controls="guia-riscos-lista"
        >
          {todosAbertos ? (
            <ChevronsDownUp size={16} aria-hidden="true" />
          ) : (
            <ChevronsUpDown size={16} aria-hidden="true" />
          )}
          {todosAbertos ? 'Recolher todos' : 'Expandir todos'}
        </button>
      </div>

      <div className="guia-acordeao-lista" id="guia-riscos-lista">
        {riscos.map((risco, indice) => {
          const aberto = abertos.has(risco.id)
          const botaoId = `risco-botao-${risco.id}`
          const painelId = `risco-painel-${risco.id}`

          return (
            <article className={`guia-acordeao-item${aberto ? ' is-open' : ''}`} key={risco.id}>
              <h3 className="guia-acordeao-cabecalho">
                <button
                  className="guia-acordeao-botao"
                  type="button"
                  id={botaoId}
                  aria-expanded={aberto}
                  aria-controls={painelId}
                  onClick={() => alternar(risco.id)}
                >
                  <span className="guia-acordeao-icone" aria-hidden="true">
                    <Icone nome={risco.icone} size={19} />
                  </span>
                  <span className="guia-acordeao-titulo">
                    <span className="guia-acordeao-numero" aria-hidden="true">
                      {String(indice + 1).padStart(2, '0')}
                    </span>
                    {risco.titulo}
                  </span>
                  <ChevronDown className="guia-acordeao-seta" size={19} aria-hidden="true" />
                </button>
              </h3>
              <div
                className="guia-acordeao-painel"
                id={painelId}
                role="region"
                aria-labelledby={botaoId}
                hidden={!aberto}
              >
                <div className="guia-acordeao-campo">
                  <span className="guia-acordeao-rotulo">O que é</span>
                  <p>{risco.oQueE}</p>
                </div>
                <div className="guia-acordeao-campo">
                  <span className="guia-acordeao-rotulo">Como agir</span>
                  <p>{risco.comoAgir}</p>
                </div>
                {risco.destaque && (
                  <p className="guia-destaque" data-tom="risco">
                    <Icone nome="triangle-alert" size={18} />
                    <span>{risco.destaque}</span>
                  </p>
                )}
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
