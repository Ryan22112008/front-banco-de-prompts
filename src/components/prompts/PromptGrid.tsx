import { PromptCard } from './PromptCard'
import type { PromptItem } from './types'

export function PromptGrid({ prompts }: { prompts: PromptItem[] }) {
  return <div className="catalog-grid">{prompts.map((prompt) => <PromptCard key={prompt.id} prompt={prompt} />)}</div>
}
