export type ApplicabilityTag =
  | 'TODOS'
  | 'LLM'
  | 'ML/DL'
  | 'RAG'
  | 'VISÃO'
  | 'BIOMETRIA'
  | 'TRANSFER'
  | 'DL'

export type QuestionId = 'Q1' | 'Q2' | 'Q3' | 'Q4' | 'Q5' | 'Q6' | 'Q7'

export type FichaQuestion = {
  id: QuestionId
  label: string
  tag: Exclude<ApplicabilityTag, 'TODOS'>
}

export type FichaField = {
  id: string
  title: string
  summary: string
}

export type FichaBlock = {
  id: string
  number: number
  title: string
  tag: ApplicabilityTag
  activation: string
  question: QuestionId | null
  instruction: string
  fields: FichaField[]
}

export const fichaQuestions: FichaQuestion[] = [
  {
    id: 'Q1',
    label: 'O sistema utiliza um modelo de linguagem de grande escala (LLM) como base?',
    tag: 'LLM',
  },
  {
    id: 'Q2',
    label: 'O sistema treina ou realiza fine-tuning de modelos próprios (ML ou DL)?',
    tag: 'ML/DL',
  },
  {
    id: 'Q3',
    label: 'O sistema usa arquitetura de recuperação aumentada (RAG)?',
    tag: 'RAG',
  },
  {
    id: 'Q4',
    label: 'O sistema processa imagens ou vídeos?',
    tag: 'VISÃO',
  },
  {
    id: 'Q5',
    label: 'O sistema processa dados biométricos?',
    tag: 'BIOMETRIA',
  },
  {
    id: 'Q6',
    label: 'O sistema utiliza modelos pré-treinados de terceiros com ajuste fino?',
    tag: 'TRANSFER',
  },
  {
    id: 'Q7',
    label: 'O sistema usa redes neurais profundas (Deep Learning)?',
    tag: 'DL',
  },
]

export const tagToQuestion: Record<Exclude<ApplicabilityTag, 'TODOS'>, QuestionId> = {
  LLM: 'Q1',
  'ML/DL': 'Q2',
  RAG: 'Q3',
  'VISÃO': 'Q4',
  BIOMETRIA: 'Q5',
  TRANSFER: 'Q6',
  DL: 'Q7',
}

export const fichaBlocks: FichaBlock[] = [
  {
    id: 'bloco-1',
    number: 1,
    title: 'Identificação e governança',
    tag: 'TODOS',
    activation: 'Qualquer sistema',
    question: null,
    instruction: 'Preencha para qualquer sistema de IA, independente da tecnologia.',
    fields: [
      {
        id: 'b1-nome-versao',
        title: 'Nome e versão do sistema de IA',
        summary: 'Identificar a nomenclatura oficial e a versão do sistema para fins de inventário e auditoria.',
      },
      {
        id: 'b1-base-legal',
        title: 'Base legal para o uso da IA',
        summary: 'Citar formalmente a Lei, Decreto ou Portaria que fundamenta a competência do órgão para utilizar o sistema no exercício de sua função pública.',
      },
      {
        id: 'b1-interesse-publico',
        title: 'Interesse público e justificativa',
        summary: 'Descrever o benefício social esperado e justificar por que a automação via IA é preferível ao processo manual em termos de eficiência ou economicidade.',
      },
      {
        id: 'b1-data-disponibilidade',
        title: 'Data de disponibilidade',
        summary: 'Registrar o marco temporal inicial da operação do sistema em ambiente de produção.',
      },
      {
        id: 'b1-versao-card',
        title: 'Versão atual do card',
        summary: 'Identificar a iteração documental vigente para o controle de revisões de transparência.',
      },
      {
        id: 'b1-data-versao',
        title: 'Data da versão atual',
        summary: 'Informar a data da versão atual do card, para acompanhar sua vigência e revisão.',
      },
      {
        id: 'b1-historico-versoes',
        title: 'Histórico de versões do card, justificativa da atualização e previsão de próxima atualização',
        summary: 'Registrar cronologicamente as mudanças materiais e suas justificativas, além de indicar a previsão da próxima atualização do card.',
      },
      {
        id: 'b1-responsavel-tecnico',
        title: 'Responsável técnico',
        summary: 'Identificar nome, cargo e unidade do servidor responsável técnico pelo sistema de IA.',
      },
      {
        id: 'b1-etdp',
        title: 'Encarregado pelo tratamento de dados pessoais (ETDP)',
        summary: 'Identificar o encarregado pelo tratamento de dados pessoais do órgão, conforme o Art. 41 da LGPD.',
      },
      {
        id: 'b1-canal-contato',
        title: 'Canal de contato público',
        summary: 'Indicar o canal formal pelo qual os interessados podem obter informações sobre o sistema ou contestar resultados, observando a Lei nº 12.527/2011 (LAI).',
      },
    ],
  },
  {
    id: 'bloco-2',
    number: 2,
    title: 'Descrição e escopo do sistema',
    tag: 'TODOS',
    activation: 'Qualquer sistema',
    question: null,
    instruction: 'Preencha para qualquer sistema de IA, independente da tecnologia.',
    fields: [
      {
        id: 'b2-descricao',
        title: 'Descrição do sistema',
        summary: 'Fornecer uma visão de alto nível com o objetivo central, os módulos principais e a modalidade de processamento do sistema.',
      },
      {
        id: 'b2-classificacao',
        title: 'Classificação taxonômica',
        summary: 'Classificar o sistema de IA e referenciar explicitamente os instrumentos normativos brasileiros disponíveis para classificação de risco.',
      },
      {
        id: 'b2-uso-primario',
        title: 'Uso primário pretendido',
        summary: 'Definir o objetivo final e os problemas específicos que a IA visa resolver no contexto do serviço público.',
      },
      {
        id: 'b2-usuarios-primarios',
        title: 'Usuários primários pretendidos',
        summary: 'Definir o objetivo final e os problemas específicos que a IA visa resolver no contexto do serviço público, com foco nos usuários primários pretendidos.',
      },
      {
        id: 'b2-usos-nao-suportados',
        title: 'Usos não suportados',
        summary: 'Enumerar os usos não suportados pelo sistema ou declarar que todos os usos não listados como primários são proibidos e estão fora de escopo.',
      },
      {
        id: 'b2-autonomia',
        title: 'Grau de autonomia na decisão e reserva de humanidade',
        summary: 'Declarar o grau de autonomia do sistema, de 1 (apoio informativo) a 4 (decisão automatizada), e o nível de supervisão humana, detalhando a reserva de humanidade.',
      },
      {
        id: 'b2-regioes',
        title: 'Regiões de operação',
        summary: 'Especificar a abrangência geográfica do serviço prestado pelo sistema.',
      },
      {
        id: 'b2-localizacao-processamento',
        title: 'Localização do processamento',
        summary: 'Informar a localização física da hospedagem e justificar a conformidade com as normas de segurança nacional.',
      },
      {
        id: 'b2-descontinuacao',
        title: 'Plano de descontinuação do sistema',
        summary: 'Descrever as condições, os responsáveis e os procedimentos para descontinuar o sistema, incluindo o destino dos dados e a comunicação aos usuários.',
      },
    ],
  },
  {
    id: 'bloco-3',
    number: 3,
    title: 'Dados',
    tag: 'TODOS',
    activation: 'Qualquer sistema',
    question: null,
    instruction: 'Preencha para qualquer sistema de IA, independente da tecnologia.',
    fields: [
      {
        id: 'b3-inventario',
        title: 'Inventário de dados de entrada',
        summary: 'Detalhar os tipos mínimos de dados coletados dos usuários para o processamento do sistema.',
      },
      {
        id: 'b3-origem',
        title: 'Origem dos dados disponíveis',
        summary: 'Mapear as fontes governamentais, bases de dados ou blocos de informação que alimentam a IA.',
      },
      {
        id: 'b3-estruturacao',
        title: 'Estruturação e tratamento dos dados',
        summary: 'Detalhar o ciclo de vida técnico do dado, incluindo transformação de formatos, técnicas de anonimização ou mascaramento e política de retenção antes da exclusão definitiva.',
      },
      {
        id: 'b3-treinamento',
        title: 'Treinamento e melhoria do sistema',
        summary: 'Declarar formalmente se os dados de uso são reutilizados para ajuste ou melhoria do sistema.',
      },
    ],
  },
  {
    id: 'bloco-4',
    number: 4,
    title: 'Risco e performance',
    tag: 'TODOS',
    activation: 'Qualquer sistema',
    question: null,
    instruction: 'Preencha para qualquer sistema de IA, independente da tecnologia.',
    fields: [
      {
        id: 'b4-fatores-risco',
        title: 'Fatores de risco relevantes',
        summary: 'Identificar falhas potenciais que comprometam a utilidade e a segurança do sistema, como respostas imprecisas, lacunas nas bases de dados, uso indevido de dados sensíveis e decisões sem revisão humana.',
      },
      {
        id: 'b4-vulnerabilidades',
        title: 'Vulnerabilidades',
        summary: 'Listar as vulnerabilidades técnicas intrínsecas à arquitetura do sistema.',
      },
      {
        id: 'b4-mitigacao',
        title: 'Estratégias de mitigação de riscos',
        summary: 'Descrever os guardrails processuais e técnicos e incluir, de forma resumida, os resultados dos testes de segurança e resiliência que comprovem o controle do risco.',
      },
      {
        id: 'b4-metodologia-avaliacao',
        title: 'Metodologia de avaliação e testes',
        summary: 'Detalhar os procedimentos e cenários realizados para a validação técnica e funcional do sistema.',
      },
      {
        id: 'b4-metricas',
        title: 'Métricas estatísticas e de sucesso',
        summary: 'Listar indicadores quantitativos de desempenho que comprovem a eficácia do modelo, como taxa de atendimento humano, taxa de rejeição de resposta, NPS ou equivalente e métricas de segurança.',
      },
      {
        id: 'b4-baseline',
        title: 'Comparação com baseline',
        summary: 'Identificar o referencial de comparação utilizado para validar o ganho de performance trazido pela nova solução.',
      },
      {
        id: 'b4-resultados',
        title: 'Sumário de resultados técnicos',
        summary: 'Apresentar as evidências estatísticas e as taxas de sucesso obtidas nos testes.',
      },
      {
        id: 'b4-incidentes-logs',
        title: 'Registro de incidentes e logs de auditoria',
        summary: 'Descrever o registro automático de eventos relevantes, falhas de segurança e incidentes, indicando formato, retenção e acesso por órgãos de controle.',
      },
      {
        id: 'b4-limitacoes',
        title: 'Outras limitações à performance',
        summary: 'Registrar restrições residuais de idiomas, contextos, grupos populacionais sub-representados, condições de instrumentação ou qualidade dos dados.',
      },
      {
        id: 'b4-infraestrutura',
        title: 'Infraestrutura de inferência',
        summary: 'Descrever o ambiente técnico de execução do modelo, especificando se o processamento ocorre em tempo real (online) ou em lotes (batch) e os requisitos de latência.',
      },
      {
        id: 'b4-monitoramento-humano',
        title: 'Monitoramento humano (human-in-the-loop)',
        summary: 'Declarar se existe supervisão humana em tempo real ou revisões periódicas das conversas para garantir a qualidade.',
      },
    ],
  },
  {
    id: 'bloco-5',
    number: 5,
    title: 'Cadeia de suprimentos',
    tag: 'TODOS',
    activation: 'Qualquer sistema',
    question: null,
    instruction: 'Preencha para qualquer sistema de IA, independente da tecnologia.',
    fields: [
      {
        id: 'b5-cadeia-suprimentos',
        title: 'Considerações da cadeia de suprimentos',
        summary: 'Identificar fornecedores de dados e processadores (nuvem, modelos e orquestração), a versão dos modelos de terceiros e o mecanismo de atualização, incluindo quem autoriza a mudança e como ela é documentada.',
      },
      {
        id: 'b5-dependencia-tecnologica',
        title: 'Dependência tecnológica',
        summary: 'Informar o uso de tecnologia estrangeira, listando as tecnologias envolvidas e a gestão de dependência (lock-in) em relação a fornecedores externos.',
      },
    ],
  },
  {
    id: 'bloco-6',
    number: 6,
    title: 'Considerações éticas',
    tag: 'TODOS',
    activation: 'Qualquer sistema',
    question: null,
    instruction: 'Preencha para qualquer sistema de IA, independente da tecnologia.',
    fields: [
      {
        id: 'b6-acessibilidade',
        title: 'Conformidade com acessibilidade',
        summary: 'Documentar como o sistema atende à Lei Brasileira de Inclusão e aos padrões de acessibilidade digital do governo.',
      },
      {
        id: 'b6-ripd',
        title: 'RIPD — Relatório de Impacto à Proteção de Dados',
        summary: 'Indicar se foi elaborado o Relatório de Impacto à Proteção de Dados Pessoais (RIPD), nos termos do Art. 38 da LGPD, com link ou referência ao documento.',
      },
      {
        id: 'b6-equidade',
        title: 'Análise de equidade (fairness analysis)',
        summary: 'Avaliar se o sistema é usado para decisões automatizadas sobre indivíduos ou empresas e descrever as análises de disparidades entre grupos, com métricas desagregadas e resultados interseccionais.',
      },
      {
        id: 'b6-testes-seguranca',
        title: 'Testes de segurança (safety testing)',
        summary: 'Detalhar a metodologia dos testes, como red teaming, testes de intrusão e estresse de volume; para IA generativa, explicar os filtros que impedem saídas prejudiciais, alinhados aos guardrails da Extensão A.',
      },
      {
        id: 'b6-testes-resiliencia',
        title: 'Testes de resiliência (resiliency testing)',
        summary: 'Relatar os testes para cenários de alto volume de uso, uso diversificado e intrusão (penetração), a fim de avaliar vulnerabilidades sistêmicas.',
      },
      {
        id: 'b6-ciberseguranca',
        title: 'Considerações de cibersegurança',
        summary: 'Especificar os provedores de hospedagem e os controles de segurança implementados, como gestão de acesso, autenticação, políticas de segurança da informação, criptografia e monitoramento de incidentes.',
      },
      {
        id: 'b6-privacidade',
        title: 'Considerações de privacidade e proteção de dados pessoais',
        summary: 'Sumarizar o processamento de dados e como os titulares exercem seus direitos, detalhando fluxos transfronteiriços e a conformidade com a LGPD.',
      },
      {
        id: 'b6-propriedade-intelectual',
        title: 'Considerações de propriedade intelectual',
        summary: 'Definir a titularidade dos dados subjacentes e o tratamento jurídico dado aos inputs dos usuários e ao feedback coletado para melhoria do produto.',
      },
      {
        id: 'b6-feedback-contestabilidade',
        title: 'Feedback e contestabilidade',
        summary: 'Descrever o processo administrativo de contestação e como o cidadão solicita a revisão humana de uma decisão automatizada, conforme o Art. 20 da LGPD.',
      },
      {
        id: 'b6-explicabilidade',
        title: 'Considerações de explicabilidade e transparência',
        summary: 'Detalhar os recursos da interface que permitem ao usuário visualizar a lógica de produção da saída, como ferramentas acionadas ou referências utilizadas.',
      },
    ],
  },
  {
    id: 'bloco-7',
    number: 7,
    title: 'Configuração do modelo de linguagem',
    tag: 'LLM',
    activation: 'Q1 = Sim',
    question: 'Q1',
    instruction: 'Preencha se Q1 = Sim.',
    fields: [
      {
        id: 'b7-modelos-fundacao',
        title: 'Modelos de fundação (LLMs)',
        summary: 'Listar cada modelo base de geração de texto, sua versão e licença. Para modelos de terceiros, anexar os Model Cards originais; para modelos internos, elaborar um Model Card com base em Mitchell et al. (2019), com tipo, dados de treinamento, métricas por subgrupo e considerações éticas.',
      },
      {
        id: 'b7-janela-contexto',
        title: 'Janela de contexto (Context Window)',
        summary: 'Especificar a capacidade máxima de tokens processados simultaneamente, incluindo prompt, histórico e documentos anexados, e como o sistema se comporta ao atingir esse limite.',
      },
      {
        id: 'b7-orquestracao',
        title: 'Orquestração e frameworks',
        summary: 'Especificar as bibliotecas ou softwares que gerenciam o fluxo entre o usuário, o modelo e as bases de dados.',
      },
      {
        id: 'b7-system-prompts',
        title: 'Instruções do sistema (system prompts)',
        summary: 'Detalhar as diretrizes mestras fornecidas ao modelo para definir sua personalidade, tom de voz e limites de comportamento.',
      },
      {
        id: 'b7-ferramentas',
        title: 'Descrição de ferramentas (tools)',
        summary: 'Enumerar as capacidades que o assistente pode acionar, como busca em documentos, acesso a banco de dados, chamadas de API ou cálculos.',
      },
      {
        id: 'b7-idiomas-entrada',
        title: 'Idiomas de entrada (input)',
        summary: 'Listar todos os idiomas que o sistema é capaz de processar e compreender a partir das interações do usuário.',
      },
      {
        id: 'b7-idiomas-saida',
        title: 'Idiomas de saída (output)',
        summary: 'Especificar os idiomas nos quais o sistema pode gerar respostas ou conteúdos originais.',
      },
      {
        id: 'b7-limitacoes-traducao',
        title: 'Limitações conhecidas de tradução',
        summary: 'Documentar cenários em que a qualidade da resposta pode cair ou em que o sistema pode recorrer ao idioma padrão por falta de dados.',
      },
      {
        id: 'b7-guardrails',
        title: 'Guardrails de escopo e segurança',
        summary: 'Descrever os filtros técnicos que impedem o sistema de responder sobre temas proibidos, como violência, ódio ou conselhos financeiros, listando os modelos de guardrails utilizados, se houver.',
      },
      {
        id: 'b7-alucinacoes',
        title: 'Gerenciamento de alucinações',
        summary: 'Identificar os riscos de geração de informações factualmente incorretas e as técnicas usadas para minimizar esse comportamento.',
      },
      {
        id: 'b7-explicabilidade-citacoes',
        title: 'Explicabilidade por citações',
        summary: 'Detalhar como o sistema fornece links, referências ou trechos da documentação original para que o usuário valide a resposta gerada.',
      },
      {
        id: 'b7-feedback',
        title: 'Mecanismos de feedback binário e qualitativo',
        summary: 'Descrever as funcionalidades da interface usadas para coletar dados que servirão ao aprimoramento técnico do modelo e ao monitoramento de utilidade.',
      },
      {
        id: 'b7-historico-logs',
        title: 'Histórico de conversas e sessão (logs)',
        summary: 'Detalhar como o sistema mantém ou não o contexto da conversa e por quanto tempo essa memória de curto prazo é armazenada.',
      },
    ],
  },
  {
    id: 'bloco-8',
    number: 8,
    title: 'Recuperação aumentada por geração',
    tag: 'RAG',
    activation: 'Q3 = Sim',
    question: 'Q3',
    instruction: 'Preencha se Q3 = Sim.',
    fields: [
      {
        id: 'b8-embeddings',
        title: 'Modelos de vetorização (embeddings)',
        summary: 'Identificar o modelo usado para converter texto em representações numéricas para buscas semânticas e seu tipo de licença. Para terceiros, anexar os Model Cards; para modelos internos, elaborar um Model Card com base em Mitchell et al. (2019).',
      },
    ],
  },
  {
    id: 'bloco-9',
    number: 9,
    title: 'Machine Learning e Deep Learning',
    tag: 'ML/DL',
    activation: 'Q2 = Sim',
    question: 'Q2',
    instruction: 'Preencher se Q2 = Sim.',
    fields: [
      {
        id: 'b9-arquitetura',
        title: 'Arquitetura do algoritmo e/ou redes neurais',
        summary: 'Especificar a classe do algoritmo e a estrutura do modelo ou a arquitetura da rede neural. Para ML, detalhar a lógica matemática e o framework; para DL, a topologia, o número de camadas e as arquiteturas pré-definidas utilizadas.',
      },
      {
        id: 'b9-features',
        title: 'Variáveis de entrada (features)',
        summary: 'Enumerar os atributos e campos consumidos pelo modelo na inferência e justificar a seleção ou exclusão de variáveis sensíveis. Para DL, indicar se a entrada é estruturada ou composta por dados brutos, como tensores.',
      },
      {
        id: 'b9-variavel-alvo',
        title: 'Variáveis-alvo',
        summary: 'Definir o objetivo estatístico da predição ou classificação, descrevendo exatamente o que o modelo busca estimar, categorizar ou prever.',
      },
      {
        id: 'b9-hiperparametros',
        title: '(Hiper)parâmetros e funções de ativação',
        summary: 'Registrar as configurações de ajuste fino, como taxa de aprendizado, funções de ativação e algoritmos de otimização utilizados no treinamento.',
      },
      {
        id: 'b9-data-split',
        title: 'Estratégia de divisão de dados (data split)',
        summary: 'Descrever a separação da base entre treinamento, validação e teste, assegurando independência estatística e representatividade das amostras.',
      },
      {
        id: 'b9-preprocessamento',
        title: 'Pré-processamento, engenharia e aumento de dados',
        summary: 'Detalhar as transformações aplicadas aos dados brutos, como normalização, codificação de variáveis, tratamento de valores nulos e redução de dimensionalidade. Para DL, detalhar também as técnicas de Data Augmentation.',
      },
      {
        id: 'b9-erros-outliers',
        title: 'Análise de erros e outliers',
        summary: 'Documentar os padrões de falha identificados nos testes e descrever como o modelo se comporta diante de dados atípicos ou extremos.',
      },
      {
        id: 'b9-explicabilidade',
        title: 'Explicabilidade técnica (interpretability)',
        summary: 'Explicar o peso relativo de cada variável na decisão final, utilizando métodos que permitam rastrear a lógica matemática de cada predição individual.',
      },
      {
        id: 'b9-drift',
        title: 'Plano de monitoramento de desvio (drift)',
        summary: 'Estabelecer a metodologia para detectar perda de performance ao longo do tempo causada por mudanças nos dados.',
      },
      {
        id: 'b9-retreinamento',
        title: 'Gatilhos de retreinamento',
        summary: 'Definir a periodicidade ou os critérios técnicos, como limiares de erro, que tornam obrigatória a atualização do modelo com novos dados de treinamento.',
      },
      {
        id: 'b9-metodologia-treinamento',
        title: 'Metodologia de treinamento',
        summary: 'Descrever as técnicas de controle e estabilização do treinamento, incluindo critérios de parada antecipada (early stopping), redução dinâmica da taxa de aprendizado e métodos de regularização.',
      },
      {
        id: 'b9-robustez',
        title: 'Avaliação de robustez e estabilidade',
        summary: 'Registrar os resultados dos testes de sensibilidade que garantem que pequenas variações nos dados de entrada não causem alterações drásticas na saída.',
      },
    ],
  },
  {
    id: 'bloco-10',
    number: 10,
    title: 'Deep Learning',
    tag: 'DL',
    activation: 'Q7 = Sim',
    question: 'Q7',
    instruction: 'Preencha se Q7 = Sim (subconjunto de ML/DL).',
    fields: [
      {
        id: 'b10-infraestrutura',
        title: 'Infraestrutura e hardware de treinamento',
        summary: 'Especificar os recursos computacionais utilizados e o tempo estimado de processamento para a convergência do modelo.',
      },
    ],
  },
  {
    id: 'bloco-11',
    number: 11,
    title: 'Transfer Learning / Fine-tuning',
    tag: 'TRANSFER',
    activation: 'Q6 = Sim',
    question: 'Q6',
    instruction: 'Preencha se Q6 = Sim.',
    fields: [
      {
        id: 'b11-transfer-learning',
        title: 'Uso de modelos pré-treinados (transfer learning)',
        summary: 'Declarar se o sistema utiliza um modelo base já treinado por terceiros e quais camadas foram submetidas a ajuste fino (fine-tuning) para a tarefa específica.',
      },
    ],
  },
  {
    id: 'bloco-12',
    number: 12,
    title: 'Visão Computacional',
    tag: 'VISÃO',
    activation: 'Q4 = Sim',
    question: 'Q4',
    instruction: 'Preencha se Q4 = Sim.',
    fields: [
      {
        id: 'b12-fontes-visuais',
        title: 'Natureza das fontes visuais',
        summary: 'Especificar a origem das imagens ou vídeos, como câmeras de monitoramento, escaneamento de documentos ou fotos enviadas pelo cidadão.',
      },
      {
        id: 'b12-condicoes-ambientais',
        title: 'Condições ambientais de operação',
        summary: 'Descrever os limites técnicos de funcionamento, como necessidade de iluminação mínima, resolução de imagem ou ângulo de captura para garantir a precisão.',
      },
      {
        id: 'b12-erros-subgrupos',
        title: 'Taxas de erro por subgrupos (viés)',
        summary: 'Apresentar métricas de falso positivo e falso negativo segmentadas por características demográficas, como etnia, gênero e idade, para evitar discriminação.',
      },
      {
        id: 'b12-anotacao',
        title: 'Metodologia de anotação de dados',
        summary: 'Explicar como as imagens de treinamento foram rotuladas, por humanos ou sinteticamente, e como foi garantida a qualidade dessa rotulagem.',
      },
      {
        id: 'b12-deteccao-objetos',
        title: 'Detecção de objetos e segmentação',
        summary: 'Caso o sistema não identifique pessoas, descrever quais classes de objetos ele está treinado para reconhecer e com qual nível de confiança.',
      },
      {
        id: 'b12-mascaramento',
        title: 'Mascaramento e anonimização',
        summary: 'Detalhar se o sistema aplica técnicas de descaracterização antes do armazenamento ou processamento dos dados.',
      },
      {
        id: 'b12-hardware-sensores',
        title: 'Hardware e sensores relacionados',
        summary: 'Especificar os requisitos de hardware, como câmeras, GPUs e sensores, necessários para que a IA tenha o desempenho esperado.',
      },
    ],
  },
  {
    id: 'bloco-13',
    number: 13,
    title: 'Processamento biométrico',
    tag: 'BIOMETRIA',
    activation: 'Q5 = Sim',
    question: 'Q5',
    instruction: 'Preencha se Q5 = Sim.',
    fields: [
      {
        id: 'b13-biometria',
        title: 'Processamento de biometria',
        summary: 'Declarar explicitamente se o sistema realiza identificação ou autenticação biométrica e qual é a base legal específica para esse tratamento sensível, observado o Art. 11 da LGPD.',
      },
    ],
  },
]

export type FichaAnswers = Record<QuestionId, boolean | null>

export const fichaTotalFields = fichaBlocks.reduce((total, block) => total + block.fields.length, 0)
