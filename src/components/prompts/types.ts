import type { LucideIcon } from 'lucide-react'

export type InstructionFormat = 'excel' | 'word' | 'pdf' | 'link'

export type PromptItem = {
  id: string
  category: string
  title: string
  description: string
  icon: LucideIcon
  instructions: Record<InstructionFormat, string>
}
