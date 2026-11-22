import { useState } from 'react'
import { RotateCcw } from 'lucide-react'

type ChecklistGuiaProps = {
  itens: string[]
}

export function ChecklistGuia({ itens }: ChecklistGuiaProps) {
  const [marcados, setMarcados] = useState<Set<number>>(() => new Set())
  const total = itens.length
  const conferidos = marcados.size
  const percentual = total === 0 ? 0 : Math.round((conferidos / total) * 100)
  const concluido = total > 0 && conferidos === total

  const alternar = (indice: number) => {
    setMarcados((atual) => {
      const proximo = new Set(atual)
      if (proximo.has(indice)) proximo.delete(indice)
      else proximo.add(indice)
      return proximo
    })
  }

  return (
    <div className="guia-checklist">
      <div className="guia-checklist-topo">
        <div className="guia-checklist-status" aria-live="polite">
          <strong>{conferidos}</strong> de {total} itens conferidos
        </div>
        <button
          className="guia-botao guia-botao-secundario guia-botao-compacto"
          type="button"
          onClick={() => setMarcados(new Set())}
          disabled={conferidos === 0}
        >
          <RotateCcw size={15} aria-hidden="true" />
          Limpar
        </button>
      </div>

      <div
        className="guia-progresso"
        role="progressbar"
        aria-label="Itens do checklist conferidos"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={conferidos}
        aria-valuetext={`${conferidos} de ${total} itens conferidos`}
      >
        <span className="guia-progresso-barra" style={{ width: `${percentual}%` }} />
      </div>

      <ul className="guia-checklist-lista">
        {itens.map((item, indice) => {
          const marcado = marcados.has(indice)
          return (
            <li key={item}>
              <label className={`guia-check-item${marcado ? ' is-checked' : ''}`}>
                <input
                  type="checkbox"
                  checked={marcado}
                  onChange={() => alternar(indice)}
                />
                <span className="guia-check-marca" aria-hidden="true">
                  <svg viewBox="0 0 16 16" width="12" height="12" focusable="false">
                    <path
                      d="M3.2 8.4 6.3 11.4 12.8 4.8"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="guia-check-texto">{item}</span>
              </label>
            </li>
          )
        })}
      </ul>

      <p className={`guia-checklist-rodape${concluido ? ' is-done' : ''}`} role="status">
        {concluido
          ? 'Checklist completo. Revise as condições do serviço antes de enviar.'
          : 'O checklist fica apenas nesta página; nada é salvo.'}
      </p>
    </div>
  )
}
