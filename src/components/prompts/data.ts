import {
  BriefcaseBusiness,
  FileSpreadsheet,
  GraduationCap,
  Megaphone,
  ShieldCheck,
  FileText,
  Lightbulb,
  ChartNoAxesCombined,
} from 'lucide-react'
import type { PromptItem } from './types'

export const prompts: PromptItem[] = [
  {
    id: 'higienizador-lgpd', category: 'SEGURANÇA DA INFORMAÇÃO', title: 'Higienizador de Dados LGPD',
    description: 'Remova CPFs, nomes e dados sensíveis de documentos públicos antes de processá-los ou arquivá-los no sistema.', icon: ShieldCheck,
    instructions: {
      excel: 'Atue como analista de privacidade e proteção de dados na Administração Pública. Analise o texto abaixo, identifique e remova todos os dados pessoais e sensíveis (CPF, RG, nome completo, endereço, telefone, e-mail, dados de saúde, entre outros), em conformidade com a LGPD (Lei nº 13.709/2018). Organize o resultado em uma tabela com as colunas: ID, Órgão e Conteúdo Público. Substitua cada dado removido por um marcador padronizado (ex.: [CPF REMOVIDO]) e não mantenha nenhum dado pessoal na tabela. Texto: [COLE AQUI O TEXTO]',
      word: 'Atue como assessor técnico com conhecimento em LGPD. Elabore uma minuta padrão de relatório técnico com o conteúdo revisado e anonimizado, seguindo a estrutura: 1) Identificação; 2) Objetivo; 3) Critérios de anonimização aplicados; 4) Conteúdo revisado; 5) Pontos de atenção para validação jurídica. Use linguagem formal e impessoal, sem qualquer dado pessoal. Conteúdo original: [COLE AQUI O TEXTO]',
      pdf: 'Atue como especialista em transparência e proteção de dados. Gere a versão integralmente higienizada do documento abaixo, preservando estrutura, ordem e sentido originais. Substitua cada dado sensível por uma tarja textual (ex.: [██ DADO PROTEGIDO ██]). Formate o texto para publicação, com título, parágrafos bem definidos e identificação do documento. Ao final, inclua um quadro-resumo com a quantidade de dados ocultados por categoria. Documento: [COLE AQUI O TEXTO]',
      link: 'Indique links oficiais e atualizados sobre: (1) o Guia de Boas Práticas da LGPD na Administração Pública; (2) os portais da ANPD; (3) o texto integral da Lei nº 13.709/2018. Para cada link, informe título, órgão responsável e uma linha explicando quando consultá-lo. Forneça apenas fontes oficiais (gov.br) e não invente URLs: se não tiver certeza de um endereço, informe o nome exato do documento e o órgão para busca.',
    },
  },
  {
    id: 'tradutor-linguagem-cidada', category: 'ATENDIMENTO AO CIDADÃO', title: 'Tradutor de Linguagem Cidadã',
    description: 'Transforma o "juridiquês" pesado de decretos e editais em uma comunicação simples, clara e acessível para a população.', icon: Megaphone,
    instructions: {
      excel: 'Atue como especialista em Linguagem Simples no setor público. Analise o texto normativo abaixo e monte uma tabela comparativa com três colunas: "Termo Técnico Original", "Significado Simplificado" e "Impacto no Cidadão". Use frases curtas, ordem direta e vocabulário do cotidiano, sem perder a precisão do conteúdo. Texto: [COLE AQUI O DECRETO OU EDITAL]',
      word: 'Atue como redator institucional especializado em Linguagem Simples. Redija um comunicado para o site do órgão a partir do texto abaixo, eliminando jargões e priorizando a clareza. Estrutura: título objetivo, resumo em uma frase, quem é afetado, o que muda, o que o cidadão precisa fazer, prazos e canais de atendimento. Tom acolhedor e respeitoso, frases de até 20 palavras. Texto: [COLE AQUI O TEXTO]',
      pdf: 'Atue como designer de conteúdo público. Estruture uma cartilha digital explicativa a partir do texto abaixo, com tópicos curtos, perguntas e respostas e ações diretas (ex.: "Quem pode participar?", "O que fazer agora?"). Use títulos claros, listas e destaques para prazos e documentos necessários. Nível de leitura acessível a qualquer cidadão. Texto: [COLE AQUI O TEXTO]',
      link: 'Forneça links de referência oficiais para: (1) o Manual de Redação da Presidência da República; (2) as diretrizes e guias de Linguagem Simples do governo. Para cada link, informe título, órgão responsável e uma linha sobre sua aplicação prática. Use apenas fontes oficiais e não invente URLs: se não tiver certeza, indique o nome do documento e o órgão para busca.',
    },
  },
  {
    id: 'redator-oficios', category: 'ADMINISTRAÇÃO PÚBLICA', title: 'Redator de Ofícios Oficiais',
    description: 'Automatiza a redação de comunicações internas e externas entre secretarias seguindo o padrão e os pronomes de tratamento oficiais do Estado.', icon: FileText,
    instructions: {
      excel: 'Atue como assistente de protocolo administrativo. Crie uma planilha de controle de envio de documentos com as colunas: Tipo de Documento, Destinatário, Assunto e Mensagem Principal. Preencha as linhas com base nas informações abaixo, usando redação oficial, objetiva e padronizada. Informações: [DESCREVA OS DOCUMENTOS A CONTROLAR]',
      word: 'Atue como redator oficial do Poder Executivo estadual. Redija o documento abaixo seguindo o padrão de Redação Oficial: vocativo e pronome de tratamento adequados ao destinatário, texto impessoal, formal e objetivo, fecho e identificação do signatário. Entregue o texto em formato editável (.docx), com margens padrão, fonte Arial 12 e espaçamento 1,5. Dados: tipo de documento [OFÍCIO/MEMORANDO/etc.], remetente [ÓRGÃO], destinatário [CARGO E ÓRGÃO], assunto [ASSUNTO], conteúdo [PONTOS PRINCIPAIS]',
      pdf: 'Atue como diagramador de documentos oficiais. Formate o documento final simulando a folha timbrada oficial, com cabeçalho institucional, espaço reservado para a numeração (Nº ____/ANO), local e data, corpo do texto e bloco de assinatura com nome e cargo. Mantenha margens e alinhamentos conforme o padrão de Redação Oficial. Conteúdo: [COLE AQUI O TEXTO]',
      link: 'Apresente o link oficial do Manual de Redação Oficial do Poder Executivo de Mato Grosso para validação das normas, e, se existir, do Manual de Redação da Presidência da República como referência complementar. Informe título e órgão responsável. Não invente URLs: se não tiver certeza do endereço, indique o nome exato do documento e o órgão para busca.',
    },
  },
  {
    id: 'mediador-ouvidoria', category: 'GESTÃO DE CRISES', title: 'Mediador de Ouvidoria',
    description: 'Reduz o tempo de resposta ao cidadão na Ouvidoria do Estado, gerando textos neutros, empáticos e focados na solução.', icon: BriefcaseBusiness,
    instructions: {
      excel: 'Atue como ouvidor(a) experiente da Administração Pública estadual. Construa um banco de respostas rápidas em tabela com as colunas: Tipo de Reclamação, Resposta Neutra e Prazo Legal. As respostas devem ser neutras, empáticas e objetivas, sem prometer o que o órgão não possa cumprir e com direcionamento claro ao cidadão. Em Prazo Legal, cite o prazo e a base normativa aplicável (ex.: Lei nº 13.460/2017 e Lei de Acesso à Informação), sinalizando quando for necessário confirmar. Tipos de reclamação a cobrir: [LISTE AQUI]',
      word: 'Atue como ouvidor(a) institucional. Escreva uma minuta de e-mail ao cidadão com: assunto claro, saudação, reconhecimento da manifestação, esclarecimento objetivo, providências adotadas, próximos passos com prazo, canal de contato e despedida cordial. Equilibre cordialidade e direcionamento correto, em linguagem simples e com até 200 palavras. Situação: [DESCREVA A MANIFESTAÇÃO]',
      pdf: 'Atue como ouvidor(a) responsável por casos complexos. Elabore um relatório de resposta conclusiva com as seções: Identificação da Manifestação, Histórico Cronológico, Análise do Caso, Providências Adotadas, Conclusão e Encaminhamentos. Tom formal, imparcial e empático, sem juízos de valor. Caso: [DESCREVA O CASO E O HISTÓRICO]',
      link: 'Insira o link direto da página oficial da Ouvidoria Geral do Estado de Mato Grosso (OGE-MT) e, se houver, dos canais oficiais de registro de manifestações. Informe o título e a finalidade de cada link. Não invente URLs: se não tiver certeza do endereço, indique o nome da página e o órgão para busca.',
    },
  },
  {
    id: 'validador-termos-referencia', category: 'COMPRAS PÚBLICAS', title: 'Validador de Termos de Referência',
    description: 'Analisa escopos de contratação e minutas de compras, cruzando as exigências com as leis de licitação vigentes.', icon: FileSpreadsheet,
    instructions: {
      excel: 'Atue como analista de contratações públicas, especialista na Lei nº 14.133/2021. Analise o Termo de Referência abaixo e gere um checklist de auditoria em tabela com as colunas: Item Analisado, Status de Conformidade (Conforme / Parcialmente conforme / Não conforme) e Justificativa Legal (citando o artigo aplicável). Não invente dispositivos legais: se houver dúvida, sinalize "verificar". Documento: [COLE AQUI O TERMO DE REFERÊNCIA]',
      word: 'Atue como consultor jurídico-administrativo em licitações. Redija uma justificativa técnica formal detalhando as alterações necessárias nas cláusulas do documento abaixo. Para cada alteração, apresente: cláusula original, alteração proposta, fundamento legal e justificativa. Linguagem formal, pronta para inserção no sistema. Documento: [COLE AQUI O TEXTO]',
      pdf: 'Atue como parecerista técnico em compras públicas. Emita um parecer técnico estruturado com as seções: Objeto Analisado, Metodologia, Riscos Identificados (classificados em alto, médio e baixo), Recomendações Urgentes e Conclusão. Fundamente cada risco na Lei nº 14.133/2021 e em normas correlatas. Documento: [COLE AQUI O TEXTO]',
      link: 'Forneça links oficiais para: (1) o texto atualizado da Lei nº 14.133/2021; (2) o Portal Nacional de Contratações Públicas (PNCP); (3) o portal de compras do Estado de Mato Grosso. Informe título e órgão responsável de cada um. Use apenas fontes oficiais e não invente URLs: se não tiver certeza, indique o nome do portal e o órgão para busca.',
    },
  },
  {
    id: 'idealizador-projetos-publicos', category: 'INOVAÇÃO E ESTRATÉGIA', title: 'Idealizador de Projetos Públicos',
    description: 'Apoia secretarias em sessões de brainstorming, sugerindo soluções tecnológicas baseadas em governo digital.', icon: Lightbulb,
    instructions: {
      excel: 'Atue como consultor de inovação no setor público. Para o desafio abaixo, proponha de 5 a 8 ideias de solução baseadas em governo digital e organize-as em uma matriz de viabilidade com as colunas: Nome da Ideia, Custo Estimado (baixo, médio ou alto, com breve justificativa), Complexidade (baixa, média ou alta) e Impacto Social (nota de 1 a 5). Ao final, indique as duas ideias mais promissoras. Desafio: [DESCREVA O DESAFIO DA SECRETARIA]',
      word: 'Atue como gerente de projetos públicos. Desenvolva um plano de ação completo no modelo 5W2H (What, Why, Where, When, Who, How, How much) para a ideia abaixo, detalhando as etapas de execução, responsáveis, prazos, recursos necessários e riscos com medidas de mitigação. Linguagem formal e objetiva. Ideia: [DESCREVA A IDEIA]',
      pdf: 'Atue como especialista em formulação de projetos públicos. Formate uma proposta simplificada de uma página (One-Pager) com: Título, Problema, Objetivo Geral, Público-Alvo, Solução Proposta, Cronograma (por fases), Resultados Esperados e Indicadores de Sucesso. Texto direto, sem excesso de detalhes, pronto para apresentação à liderança. Ideia: [DESCREVA A IDEIA]',
      link: 'Liste links de cases de sucesso, nacionais e internacionais, de inovação no setor público aplicáveis à ideia abaixo. Para cada case, informe país ou órgão, o resultado alcançado e como pode ser adaptado à realidade do órgão. Priorize fontes oficiais ou reconhecidas e não invente URLs: se não tiver certeza, indique o nome do case e a instituição para busca. Ideia: [DESCREVA A IDEIA]',
    },
  },
  {
    id: 'extrator-insights-executivos', category: 'RELATÓRIOS E DADOS', title: 'Extrator de Insights Executivos',
    description: 'Resume relatórios de desempenho e auditorias extensas em dados-chave para tomadas de decisão rápidas.', icon: ChartNoAxesCombined,
    instructions: {
      excel: 'Atue como analista de dados do setor público. Extraia as métricas numéricas do documento abaixo e organize-as em uma tabela com as colunas: Indicador, Valor e Variação (indicando o período de comparação). Use apenas dados presentes no documento, sem estimar ou inventar valores, e sinalize os indicadores sem informação suficiente. Documento: [COLE AQUI O RELATÓRIO]',
      word: 'Atue como assessor da alta gestão. Redija um briefing de reunião (ponto de pauta) com: Objetivo, Contexto, Principais Pontos, Argumentos de Apoio com dados, Pontos de Atenção e Decisões Necessárias. Texto objetivo, de até duas páginas, para subsidiar a liderança. Documento: [COLE AQUI O RELATÓRIO]',
      pdf: 'Atue como analista de inteligência estratégica. Gere um Sumário Executivo de alta gestão com até duas páginas, contendo: Contexto, Principais Conclusões, Indicadores-chave (sugerindo o gráfico mais adequado para cada um), Riscos e Próximos Passos recomendados. Priorize clareza e objetividade. Documento: [COLE AQUI O RELATÓRIO]',
      link: 'Apresente links de portais oficiais de dados estatísticos que complementem o contexto do documento, como os painéis da SEPLAN-MT, o IBGE e o Portal da Transparência do Estado. Para cada link, informe título, órgão responsável e o tipo de dado disponível. Não invente URLs: se não tiver certeza, indique o nome do portal e o órgão para busca. Tema: [INFORME O TEMA DO RELATÓRIO]',
    },
  },
  {
    id: 'tutor-onboarding', category: 'CAPACITAÇÃO INTERNA', title: 'Tutor de Onboarding de Servidores',
    description: 'Facilita a integração de novos servidores e comissionados na repartição, funcionando como um manual dinâmico.', icon: GraduationCap,
    instructions: {
      excel: 'Atue como especialista em desenvolvimento de pessoas no setor público. Estruture uma trilha de aprendizagem em formato de cronograma semanal com as colunas: Dia, Processo e Sistema Utilizado. Organize do mais básico ao mais complexo, distribuindo a carga de forma realista ao longo da semana. Setor e rotinas: [DESCREVA O SETOR E AS PRINCIPAIS ROTINAS]',
      word: 'Atue como analista de processos. Redija a documentação técnica passo a passo (Instrução de Trabalho) para a rotina abaixo, com: Objetivo, Escopo, Responsáveis, Pré-requisitos, Passo a Passo numerado, Resultado Esperado, Pontos de Atenção e Base Normativa. Linguagem clara, para quem nunca executou a tarefa. Rotina: [DESCREVA A ROTINA]',
      pdf: 'Atue como tutor de integração de servidores. Crie o "Guia de Sobrevivência do Novo Servidor" com: boas-vindas, estrutura do órgão, principais fluxos internos explicados passo a passo (descrevendo cada fluxograma em etapas), sistemas e acessos, contatos importantes, dicas práticas e erros comuns a evitar. Tom acolhedor e objetivo. Órgão e fluxos: [DESCREVA O ÓRGÃO E OS FLUXOS]',
      link: 'Direcione o usuário para links da Escola de Governo de Mato Grosso e de plataformas virtuais de aprendizagem para servidores públicos (ex.: Escola Virtual de Governo da Enap). Para cada link, informe título, órgão responsável e o tipo de curso disponível. Use apenas fontes oficiais e não invente URLs: se não tiver certeza, indique o nome da plataforma e o órgão para busca.',
    },
  },
]
