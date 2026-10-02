export function InstructionText({ text }: { text: string }) {
  const chunks = text.split(/(\[[^\]]+\])/g)

  return <>{chunks.map((chunk, index) => chunk.startsWith('[') && chunk.endsWith(']')
    ? <mark className="instruction-placeholder" key={`${index}-${chunk}`}>{chunk}</mark>
    : <span key={`${index}-${chunk}`}>{chunk}</span>)}</>
}
