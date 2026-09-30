import { BriefcaseBusiness, Code2, GraduationCap, ListChecks, Megaphone, Palette, Sparkles } from 'lucide-react'
import type { PromptItem } from './types'

export const prompts: PromptItem[] = [
  { category: 'Programação', title: 'Desenvolvedor React Sênior', description: 'Atue como um desenvolvedor sênior especializado em React e TypeScript. Analise problemas técnicos e proponha soluções escaláveis.', icon: Code2 },
  { category: 'Programação', title: 'Code Review Profissional', description: 'Analise o código fornecido, identifique problemas, riscos e oportunidades de melhoria e apresente uma solução profissional.', icon: Code2 },
  { category: 'Inteligência Artificial', title: 'Especialista em Prompts', description: 'Analise uma solicitação e transforme-a em um prompt claro, estruturado e otimizado para modelos de inteligência artificial.', icon: Sparkles },
  { category: 'Estudos', title: 'Professor Particular', description: 'Explique qualquer assunto de maneira progressiva, utilizando exemplos práticos e linguagem adequada ao nível do estudante.', icon: GraduationCap },
  { category: 'Trabalho', title: 'Assistente Profissional', description: 'Ajude a organizar tarefas, documentos, reuniões e atividades profissionais de maneira clara e eficiente.', icon: BriefcaseBusiness },
  { category: 'Marketing', title: 'Estrategista de Conteúdo', description: 'Crie estratégias de conteúdo para redes sociais considerando público, objetivo, posicionamento e formato de publicação.', icon: Megaphone },
  { category: 'Design', title: 'Diretor de Arte', description: 'Analise uma ideia visual e desenvolva uma direção criativa considerando composição, tipografia, cores e experiência.', icon: Palette },
  { category: 'Produtividade', title: 'Organizador de Tarefas', description: 'Transforme uma lista de tarefas e objetivos em um plano de execução organizado, priorizado e fácil de acompanhar.', icon: ListChecks },
]
