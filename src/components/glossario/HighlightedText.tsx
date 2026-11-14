import { useMemo } from 'react'
import { destacarTexto } from './highlight'

type HighlightedTextProps = {
  text: string
  query: string
}

export function HighlightedText({ text, query }: HighlightedTextProps) {
  const segments = useMemo(() => destacarTexto(text, query), [text, query])

  return (
    <>
      {segments.map((segment, index) => (
        segment.destaque
          ? <mark className="glossario-mark" key={index}>{segment.texto}</mark>
          : <span key={index}>{segment.texto}</span>
      ))}
    </>
  )
}
