import { useEffect, useRef, useState } from 'react'
import { Check, Clipboard, TriangleAlert } from 'lucide-react'

type CopyState = 'idle' | 'copied' | 'error'

type BotaoCopiarProps = {
  texto: string
  rotulo?: string
  rotuloCopiado?: string
  className?: string
}

export function BotaoCopiar({
  texto,
  rotulo = 'Copiar',
  rotuloCopiado = 'Copiado!',
  className = '',
}: BotaoCopiarProps) {
  const [estado, setEstado] = useState<CopyState>('idle')
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current)
  }, [])

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(texto)
      setEstado('copied')
    } catch {
      setEstado('error')
    }

    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => setEstado('idle'), 2200)
  }

  const label = estado === 'copied' ? rotuloCopiado : estado === 'error' ? 'Erro ao copiar' : rotulo

  return (
    <span className={`guia-copiar-wrap ${className}`.trim()}>
      <button
        className={`guia-botao guia-botao-secundario guia-copiar${estado === 'copied' ? ' is-copied' : ''}${estado === 'error' ? ' is-error' : ''}`}
        type="button"
        onClick={copiar}
        aria-label={
          estado === 'copied'
            ? 'Texto copiado para a área de transferência'
            : estado === 'error'
              ? 'Não foi possível copiar. Tentar novamente'
              : 'Copiar exemplo de declaração de uso de IA'
        }
      >
        {estado === 'copied' ? (
          <Check size={16} aria-hidden="true" />
        ) : estado === 'error' ? (
          <TriangleAlert size={16} aria-hidden="true" />
        ) : (
          <Clipboard size={16} aria-hidden="true" />
        )}
        <span>{label}</span>
      </button>
      <span className="sr-only" role="status" aria-live="polite">
        {estado === 'copied'
          ? 'Texto copiado.'
          : estado === 'error'
            ? 'Não foi possível copiar o texto.'
            : ''}
      </span>
    </span>
  )
}
