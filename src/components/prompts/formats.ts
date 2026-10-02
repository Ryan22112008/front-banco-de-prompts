import { FileDown, FileSpreadsheet, FileText, Link2 } from 'lucide-react'
import type { InstructionFormat } from './types'

export const instructionFormats: { id: InstructionFormat; label: string; Icon: typeof FileText }[] = [
  { id: 'excel', label: 'Excel', Icon: FileSpreadsheet },
  { id: 'word', label: 'Word', Icon: FileText },
  { id: 'pdf', label: 'PDF', Icon: FileDown },
  { id: 'link', label: 'Link', Icon: Link2 },
]
