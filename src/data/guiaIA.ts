// Conteúdo do resumo do Guia de Boas Práticas de IA Generativa para Servidores
// Públicos (SGD/MGI + Serpro). Texto reescrito para leitura rápida; a página
// apenas renderiza estes dados.

export type IconeGuia =
  | 'shield-check'
  | 'lock'
  | 'file-check'
  | 'user-check'
  | 'clipboard-check'
  | 'siren'
  | 'brain'
  | 'bot'
  | 'triangle-alert'
  | 'info'
  | 'lightbulb'
  | 'boxes'
  | 'scale'
  | 'users'
  | 'landmark'
  | 'eye'
  | 'gauge'
  | 'file-question'
  | 'calendar-clock'
  | 'users-round'
  | 'shield-alert'
  | 'syringe'
  | 'copyright'
  | 'bot-check'
  | 'terminal'
  | 'key-round'
  | 'paperclip'
  | 'settings'
  | 'database'
  | 'history'
  | 'memory'
  | 'code'
  | 'list-checks'
  | 'clock'
  | 'megaphone'
  | 'message-warning'
  | 'fingerprint'
  | 'archive'
  | 'search-check'
  | 'scroll-text'
  | 'file-warning'

export type TomDestaque = 'info' | 'atencao' | 'risco'

export type SecaoGuia = {
  id: string
  rotulo: string
  titulo: string
  lead?: string
}

export type CartaoGuia = {
  id: string
  titulo: string
  descricao: string
  icone: IconeGuia
}

export type RiscoGuia = {
  id: string
  titulo: string
  icone: IconeGuia
  oQueE: string
  comoAgir: string
  destaque?: string
}

export type AbaGuia = {
  id: string
  titulo: string
  icone: IconeGuia
  paragrafos: string[]
  destaque?: string
}

export type LinhaComparativa = {
  conceito: string
  oQueE: string
  naPratica: string
}

export type PassoGuia = {
  titulo: string
  descricao: string
}

export type CartaoTexto = {
  id: string
  titulo: string
  icone: IconeGuia
  paragrafos: string[]
  lista?: string[]
  nota?: string
}

export type PerguntaCriterio = {
  titulo: string
  descricao: string
}

export const secoesGuia: SecaoGuia[] = [
  {
    id: 'antes-de-comecar',
    rotulo: 'Antes de começar',
    titulo: 'Antes de começar',
    lead: 'Seis cuidados para começar bem.',
  },
  {
    id: 'o-que-sao',
    rotulo: 'Assistentes de IA',
    titulo: 'O que são assistentes de IA',
  },
  {
    id: 'principios',
    rotulo: 'Princípios',
    titulo: 'Princípios da administração pública',
    lead: 'Os cinco princípios aplicados ao uso de IA no trabalho.',
  },
  {
    id: 'riscos',
    rotulo: 'Riscos e como agir',
    titulo: 'Riscos e como agir',
    lead: 'Quanto maior o possível impacto sobre pessoas e sobre o serviço público, maior deve ser o cuidado.',
  },
  {
    id: 'avaliacao-de-risco',
    rotulo: 'Avalie o risco',
    titulo: 'Avalie o risco da tarefa',
    lead: 'Três perguntas antes de escolher o que enviar.',
  },
  {
    id: 'boas-praticas',
    rotulo: 'Boas práticas',
    titulo: 'Boas práticas',
    lead: 'Orientações por tema para o uso cotidiano.',
  },
  {
    id: 'treinamento-contexto',
    rotulo: 'Treinamento e retenção',
    titulo: 'Treinamento, contexto, memória e retenção',
    lead: 'Entenda o que cada conceito significa na prática.',
  },
  {
    id: 'configuracoes',
    rotulo: 'Configurações de privacidade',
    titulo: 'Como conferir as configurações de privacidade',
    lead: 'Um roteiro para verificar o que a conta realmente permite.',
  },
  {
    id: 'memoria-historico',
    rotulo: 'Memória e histórico',
    titulo: 'Memória, histórico e retenção',
    lead: 'O que fica guardado e como revisar.',
  },
  {
    id: 'revisao',
    rotulo: 'Revise as respostas',
    titulo: 'Revise as respostas antes de usar',
    lead: 'A resposta é um rascunho até passar pela sua conferência.',
  },
  {
    id: 'responsabilidade',
    rotulo: 'Responsabilidade',
    titulo: 'Responsabilidade, transparência e registro',
    lead: 'Quem responde, como informar e o que registrar.',
  },
  {
    id: 'ferramentas',
    rotulo: 'Escolher ferramentas',
    titulo: 'Critérios para escolher ferramentas',
    lead: 'Sete perguntas para avaliar uma ferramenta.',
  },
  {
    id: 'checklist',
    rotulo: 'Checklist',
    titulo: 'Checklist: antes de enviar ao assistente',
    lead: 'Marque cada item antes de enviar informações ao assistente.',
  },
  {
    id: 'fonte',
    rotulo: 'Fonte e créditos',
    titulo: 'Fonte e créditos',
  },
]

export const heroGuia = {
  titulo: 'Guia de IA Generativa',
  tituloPrefixo: 'Guia de ',
  tituloDestaque: 'IA Generativa',
  subtitulo: 'Boas práticas para o uso de assistentes de IA no trabalho do servidor público',
  selo: 'Resumo do guia oficial da SGD/MGI + Serpro',
  aviso: 'Observe também as normas e orientações da sua instituição.',
}

export const antesDeComecar: CartaoGuia[] = [
  {
    id: 'ferramenta-autorizada',
    titulo: 'Use uma ferramenta autorizada',
    descricao: 'Confirme se a ferramenta e o ambiente foram liberados pelo seu órgão para aquela tarefa.',
    icone: 'shield-check',
  },
  {
    id: 'proteja-informacoes',
    titulo: 'Proteja as informações',
    descricao: 'Compartilhe só o necessário. Antes de inserir dados pessoais ou protegidos, veja se o ambiente permite.',
    icone: 'lock',
  },
  {
    id: 'confira-revise',
    titulo: 'Confira e revise',
    descricao: 'Verifique fontes e revise tudo antes de usar. Em código, revise e teste.',
    icone: 'file-check',
  },
  {
    id: 'responsabilidade-humana',
    titulo: 'Mantenha a responsabilidade humana',
    descricao: 'A IA é apoio; quem produz, revisa, aprova ou decide continua responsável.',
    icone: 'user-check',
  },
  {
    id: 'registre-uso',
    titulo: 'Registre o uso quando necessário',
    descricao: 'Se a IA contribuiu de forma relevante, documente conforme as regras do órgão.',
    icone: 'clipboard-check',
  },
  {
    id: 'comunique-incidentes',
    titulo: 'Comunique incidentes',
    descricao: 'Em caso de suspeita de vazamento ou ação indevida, avise o canal institucional.',
    icone: 'siren',
  },
]

export const alcanceGuia = {
  titulo: 'Alcance do guia',
  texto:
    'Uso de assistentes como apoio ao trabalho cotidiano. Implantação de sistemas, atendimento automatizado ao cidadão e contratação de soluções exigem avaliação institucional específica.',
}

export const assistentesIA = {
  intro:
    'Ferramentas que recebem instruções, perguntas ou arquivos e ajudam a redigir, resumir, organizar ideias e apoiar pesquisas. Conforme o ambiente, também analisam arquivos e geram imagens, áudio ou vídeo.',
  comparativo: [
    {
      titulo: 'Modelo de IA',
      descricao: 'A tecnologia que processa a informação e gera respostas com base em padrões aprendidos no treinamento.',
    },
    {
      titulo: 'Assistente de IA',
      descricao: 'A ferramenta com a qual você conversa; pode combinar modelos com leitura de arquivos, busca na internet e execução de ações.',
    },
  ],
  destaqueAtencao:
    'Uma resposta gerada NÃO significa que foi conferida nem que está correta. Pode ter erros, omissões, dados desatualizados ou referências inexistentes, mesmo parecendo convincente.',
  destaqueInfo: 'Usar uma informação na conversa não quer dizer que o modelo foi treinado com ela.',
  dica:
    'Use a IA em tarefas cujo resultado você consegue avaliar. Peça fontes e critérios, confirme se as fontes existem e sustentam a resposta, e refaça cálculos em ferramenta apropriada.',
  sobreModelos: {
    titulo: 'Sobre modelos e RAG',
    intro: 'Bloco voltado a quem avalia ou escolhe soluções.',
    itens: [
      {
        titulo: 'Modelo fechado',
        texto:
          'Acesso via serviço do fornecedor; exige avaliar dependência, custos, onde os dados são processados e por quanto tempo ficam guardados.',
      },
      {
        titulo: 'Modelo com pesos disponíveis',
        texto:
          'Pode rodar em infraestrutura própria ou contratada, mas exige equipe técnica, atualização, monitoramento e proteção de dados. “Pesos disponíveis” não é sinônimo de “código aberto”, e ser fechado não significa ser mais seguro ou melhor.',
      },
      {
        titulo: 'RAG',
        texto:
          'O assistente busca informações em documentos ou bases e as usa como contexto; isso não retreina o modelo nem garante resposta correta.',
      },
    ],
  },
}

export const principios: CartaoGuia[] = [
  {
    id: 'legalidade',
    titulo: 'Legalidade',
    descricao: 'Usar conforme a lei, incluindo a LGPD, as normas e as autorizações do órgão.',
    icone: 'scale',
  },
  {
    id: 'impessoalidade',
    titulo: 'Impessoalidade',
    descricao: 'Checar se critérios e resultados são justos, sem favorecimento ou discriminação.',
    icone: 'users',
  },
  {
    id: 'moralidade',
    titulo: 'Moralidade',
    descricao: 'Usar a tecnologia com integridade e compromisso com o interesse público.',
    icone: 'landmark',
  },
  {
    id: 'publicidade',
    titulo: 'Publicidade',
    descricao:
      'Dar transparência ao uso de IA de forma adequada à atividade, preservando informações protegidas.',
    icone: 'eye',
  },
  {
    id: 'eficiencia',
    titulo: 'Eficiência',
    descricao:
      'Escolher a ferramenta certa e considerar qualidade, custo, risco e tempo total, incluindo ajustes no pedido e revisão.',
    icone: 'gauge',
  },
]

export const riscosIntro =
  'Quanto maior o possível impacto sobre pessoas e sobre o serviço público, maior deve ser o cuidado.'

export const riscos: RiscoGuia[] = [
  {
    id: 'alucinacoes',
    titulo: 'Respostas incorretas ou inventadas (“alucinações”)',
    icone: 'file-question',
    oQueE:
      'Números errados, normas que não existem, fontes citadas com algo que elas não dizem; texto bem escrito ou link não provam nada.',
    comoAgir:
      'Abra a fonte original, confira datas, números e referências, refaça cálculos em ferramenta apropriada.',
    destaque: 'Se não conseguir confirmar uma informação relevante, não use como fundamento do trabalho.',
  },
  {
    id: 'desatualizacao',
    titulo: 'Informações desatualizadas ou incompletas',
    icone: 'calendar-clock',
    oQueE:
      'O modelo pode ter sido treinado com dados antigos; busca e consulta a documentos também podem trazer fontes defasadas ou ignorar ressalvas.',
    comoAgir:
      'Confira data, versão e contexto; em normas, consulte o texto vigente na fonte oficial.',
    destaque: 'Um resumo não substitui a leitura dos dispositivos relevantes.',
  },
  {
    id: 'vieses',
    titulo: 'Vieses e discriminação',
    icone: 'users-round',
    oQueE:
      'Respostas podem repetir estereótipos ou ignorar grupos e diferenças sociais, regionais, culturais e de acessibilidade.',
    comoAgir:
      'Avalie generalizações indevidas e critérios injustos (ex.: associar automaticamente uma profissão a um gênero); corrija o material e avise a equipe responsável sobre problemas recorrentes.',
  },
  {
    id: 'exposicao-dados',
    titulo: 'Exposição de dados e informações',
    icone: 'shield-alert',
    oQueE:
      'Perguntas, arquivos e históricos podem ser guardados ou compartilhados conforme o serviço; imagens, áudios, prints e informações combinadas também podem revelar dados protegidos ou a rotina institucional.',
    comoAgir: 'Use o ambiente autorizado e envie só o necessário.',
    destaque: 'Estar na internet não significa que a informação possa ser enviada a qualquer ferramenta.',
  },
  {
    id: 'prompt-injection',
    titulo: 'Instruções maliciosas (prompt injection)',
    icone: 'syringe',
    oQueE:
      'Páginas, mensagens ou arquivos podem conter comandos escondidos para desviar o assistente, revelar dados ou executar ações indevidas.',
    comoAgir:
      'Desconfie de pedidos para revelar dados, dar senhas, mudar permissões ou abrir links inesperados; trate conteúdo de terceiros como material de análise; não dê acesso a contas, pastas e sistemas sem autorização; exija confirmação humana para ações.',
    destaque: 'Pedir à IA que procure manipulações não garante proteção.',
  },
  {
    id: 'direitos-autorais',
    titulo: 'Direitos autorais, imagem e voz',
    icone: 'copyright',
    oQueE:
      'O resultado pode reproduzir conteúdo de terceiros ou simular pessoas reais; gerar por IA não garante originalidade nem autorização.',
    comoAgir:
      'Verifique licenças e permissões, mantenha atribuição de fontes, confira identidade visual e autorizações de marca, imagem e voz, não divulgue simulação como fato real, informe o uso de IA quando evitar confusão e inclua texto alternativo em imagens informativas.',
  },
  {
    id: 'confianca-excessiva',
    titulo: 'Confiança excessiva (viés de automação)',
    icone: 'bot-check',
    oQueE:
      'Tendência a acreditar demais em sistemas automatizados mesmo com erros evidentes.',
    comoAgir:
      'Use seu conhecimento para questionar; avalie se está correto, completo e adequado; revise linguagem e gramática.',
    destaque:
      'Se a tarefa ultrapassa sua capacidade de validar, busque apoio especializado antes de aproveitar o resultado.',
  },
  {
    id: 'ia-programacao',
    titulo: 'IA em programação',
    icone: 'terminal',
    oQueE:
      'Código que parece funcionar mas tem falhas de segurança, usa bibliotecas inexistentes ou versões antigas, ou traz condições de licença; enviar código e credenciais pode expor a instituição.',
    comoAgir:
      'Não coloque senhas e chaves em conversas ou anexos; envie código só em ambiente autorizado; confira dependências e licenças; faça revisão técnica e testes de funcionamento e segurança em ambiente controlado.',
  },
]

export const avaliacaoRisco = {
  perguntas: [
    'Que dados serão enviados?',
    'Quem pode ser afetado?',
    'O que acontece se a resposta estiver errada?',
  ],
  texto:
    'Uma minuta com informações públicas e uma análise que pode influenciar o acesso de alguém a um benefício pedem cuidados bem diferentes. Não classifique o risco só pelo nome da tarefa ou pela ferramenta.',
  criteriosTitulo: 'Procure a área responsável ANTES de começar quando o uso puder:',
  criterios: [
    'Afetar direitos ou o acesso a serviços públicos.',
    'Envolver dados protegidos.',
    'Envolver atendimento automatizado.',
    'Envolver ações em sistemas institucionais.',
  ],
}

export const boasPraticas: AbaGuia[] = [
  {
    id: 'bp-antes',
    titulo: 'Antes de começar',
    icone: 'shield-check',
    paragrafos: [
      'Defina a tarefa e o resultado esperado; confira regras do órgão, soluções disponibilizadas e autorizações; veja se consegue revisar e se o tempo de revisão compensa; não use outra ferramenta ou conta pessoal para driblar restrições.',
    ],
    destaque:
      'Sem orientação do órgão? Consulte a área responsável antes de enviar informações institucionais ou conectar o assistente a serviços de trabalho.',
  },
  {
    id: 'bp-dados',
    titulo: 'Dados pessoais',
    icone: 'lock',
    paragrafos: [
      'Antes de inserir texto, imagem ou arquivo, veja o que contém e se pode ser compartilhado com aquela ferramenta. Envie só o necessário; para testar recursos, use exemplos fictícios.',
      'Tirar nomes ou esconder parte do CPF pode não impedir a identificação. Nunca compartilhe senhas ou chaves.',
      'Conheça as condições do serviço: quem acessa, por quanto tempo fica guardado, se pode melhorar modelos, como excluir.',
    ],
  },
  {
    id: 'bp-arquivos',
    titulo: 'Arquivos anexados',
    icone: 'paperclip',
    paragrafos: [
      'Anexar também é compartilhar o conteúdo. Verifique o documento inteiro (comentários, alterações registradas, abas ocultas). Prefira trechos públicos ou exemplos fictícios.',
      'Depois confira se o assistente leu corretamente tabelas, imagens e trechos digitalizados: enviar não garante leitura completa.',
    ],
  },
  {
    id: 'bp-contas',
    titulo: 'Contas e configurações',
    icone: 'settings',
    paragrafos: [
      'Siga a orientação do órgão sobre criação de contas e autenticação; não compartilhe senhas nem use contas genéricas.',
      'Conta pessoal não autoriza enviar informação de trabalho a serviço não autorizado.',
    ],
  },
  {
    id: 'bp-treinamento',
    titulo: 'Treinamento desativado não basta',
    icone: 'database',
    paragrafos: [
      'É um cuidado importante, mas não torna a ferramenta adequada para dados protegidos. Pode não mudar armazenamento nem acesso do fornecedor.',
      'Na dúvida, consulte a área responsável.',
    ],
  },
]

export const comparativoTreinamento: LinhaComparativa[] = [
  {
    conceito: 'Treinamento do modelo',
    oQueE: 'Ajuste dos parâmetros do modelo com dados e exemplos.',
    naPratica:
      'O fornecedor pode usar conversas em treinamentos posteriores, conforme as condições; não acontece a cada mensagem.',
  },
  {
    conceito: 'Contexto da tarefa',
    oQueE: 'O que o modelo recebe para responder naquele momento.',
    naPratica:
      'Pedido, mensagens anteriores, instruções, trechos de arquivos e resultados de busca; o tempo de guarda depende do serviço.',
  },
  {
    conceito: 'Histórico',
    oQueE: 'Registro das conversas para consulta posterior.',
    naPratica: 'A conversa pode continuar no histórico mesmo com treinamento desativado.',
  },
  {
    conceito: 'Memória e personalização',
    oQueE: 'Guarda preferências e detalhes para conversas futuras.',
    naPratica: 'Podem reaparecer em outros assuntos; memória não é treinamento.',
  },
  {
    conceito: 'Retenção',
    oQueE: 'Prazo e condições em que dados e registros ficam armazenados.',
    naPratica:
      'Pode incluir arquivos, cópias e registros técnicos mesmo depois de sumirem da interface.',
  },
  {
    conceito: 'Busca e RAG',
    oQueE: 'Recuperação de fontes para compor o contexto.',
    naPratica:
      'Consultar um documento não é treinar o modelo com ele; ainda é preciso verificar a informação.',
  },
]

export const treinamentoDestaque = {
  titulo: 'Usar na conversa, armazenar e treinar são coisas diferentes',
  texto:
    'Anexar um documento ou escrever “lembre-se disto” não significa, por si só, que o modelo será treinado com aquilo. Pode ser usado só na conversa atual ou, conforme os recursos e configurações, ser guardado para outras conversas. Antes de enviar, confira as condições do serviço e da conta.',
  dica:
    'Perguntar ao assistente “o que você sabe sobre mim?” ajuda a ver o que está sendo usado na personalização, mas não mostra necessariamente tudo que o serviço guarda. Confira os controles de memória, histórico e configurações da conta.',
}

export const passosPrivacidade: PassoGuia[] = [
  {
    titulo: 'Confirme a conta e o ambiente',
    descricao: 'Veja o perfil e, se houver, a organização ou espaço de trabalho selecionado.',
  },
  {
    titulo: 'Abra as configurações',
    descricao: 'Procure áreas como Privacidade, Dados, Controles de dados ou Melhoria do modelo.',
  },
  {
    titulo: 'Identifique a finalidade do controle',
    descricao:
      'Procure a opção sobre uso de conversas e arquivos para melhorar ou treinar modelos; não confunda com memória, histórico ou anúncios.',
  },
  {
    titulo: 'Desative o uso quando for o ajuste necessário',
    descricao:
      'Leia a confirmação e veja se há controles separados para voz, imagens e comentários de avaliação.',
  },
  {
    titulo: 'Confira o alcance da mudança',
    descricao:
      'Vale só para novas conversas, para a conta toda ou para um navegador? Veja a documentação sobre dados já enviados.',
  },
  {
    titulo: 'Registre o necessário',
    descricao:
      'Em verificação profissional, anote serviço, plano, data, configuração e condição documentada, sem capturar informação protegida.',
  },
]

export const privacidadeNaoResolve = {
  titulo: 'O que essa mudança NÃO resolve',
  paragrafos: [
    'Desligar o treinamento não prova segurança, confidencialidade, exclusão nem controle de retenção, e não autoriza enviar dados pessoais, sigilosos ou não públicos.',
    'Escrever “não use meus dados para treinamento” na conversa não substitui uma configuração real, uma condição contratual ou uma verificação documentada.',
    'Botões de “gostei/não gostei” podem ter regras próprias para a conversa enviada como feedback; vale o mesmo cuidado com gravações, compartilhamento de tela e apps conectados.',
    'Opção indisponível? Não prova que há treinamento nem que está impedido: pode ser controle do administrador ou condição contratual; consulte a documentação e a área responsável.',
  ],
  nota:
    'Contas pessoais e institucionais do mesmo fornecedor podem ter condições diferentes. Os exemplos do guia original descrevem contas pessoais (Copilot, ChatGPT, Claude, Gemini) e não são recomendação nem autorização; no trabalho, use só ferramentas e contas autorizadas. Em contas institucionais, retenção, acesso, memória e compartilhamento costumam ser definidos pelo administrador.',
}

export const memoriaHistorico: CartaoTexto[] = [
  {
    id: 'memoria',
    titulo: 'Memória e personalização',
    icone: 'memory',
    paragrafos: [
      'Veja o que está salvo, corrija e exclua o que não deve ser reutilizado. Desativar a memória pode não apagar o que já foi salvo, e a preferência pode estar na lista de memórias e também na conversa original: verifique os dois.',
      'Cheque também arquivos, projetos, instruções personalizadas e apps conectados.',
      'Evite guardar dados de pessoas ou detalhes restritos de processos como preferência permanente; ao mudar de tarefa, avalie se a personalização traz pressupostos indevidos.',
    ],
  },
  {
    id: 'historico',
    titulo: 'Histórico e arquivos',
    icone: 'history',
    paragrafos: [
      'Converse por assunto e use só o material necessário. Arquivar não é necessariamente excluir, e a cópia no fornecedor não substitui o registro institucional.',
      'Antes de excluir, guarde nos sistemas do órgão o que precisa ser preservado; depois confira separadamente conversas, anexos e arquivos em outras áreas do serviço. Se houve link de compartilhamento, verifique quem tem acesso e revogue se preciso.',
    ],
  },
  {
    id: 'retencao',
    titulo: 'Retenção',
    icone: 'clock',
    paragrafos: [
      'É o tempo em que o serviço mantém perguntas, respostas, anexos e registros de uso, e pode continuar depois de você encerrar a conversa.',
    ],
    lista: [
      'Por quanto tempo conversas e arquivos ficam.',
      'Se dá para configurar exclusão automática ou pedir exclusão.',
      'Se apagar a conversa remove anexos e memórias.',
      'Se alguma cópia permanece após a exclusão e por quê.',
    ],
    nota: 'Desconectar um app interrompe acessos futuros, mas não apaga dados já copiados.',
  },
]

export const revisao = {
  cards: [
    {
      titulo: 'Textos e documentos',
      icone: 'scroll-text' as IconeGuia,
      descricao:
        'Confira fatos, datas, nomes, valores e citações nos originais; em resumos e traduções, veja se exceções, condições e ressalvas foram preservadas.',
    },
    {
      titulo: 'Imagens, áudios e vídeos',
      icone: 'eye' as IconeGuia,
      descricao:
        'Veja se o conteúdo é adequado ao público e ao contexto, se há estereótipos ou elementos enganosos, e se cumpre requisitos de acessibilidade.',
    },
    {
      titulo: 'Análises e cálculos',
      icone: 'gauge' as IconeGuia,
      descricao: 'Confira dados de entrada e critérios; refaça as contas e valide fórmulas em ferramenta adequada.',
    },
    {
      titulo: 'Código e programas',
      icone: 'code' as IconeGuia,
      descricao:
        'Revise o que o código faz, dependências e licenças; teste funcionamento e segurança em ambiente controlado antes de incorporar a um repositório ou sistema do órgão.',
    },
  ],
  dica:
    'Diferencie o que o documento afirma, o que ele comprova e o que o assistente inferiu. A revisão deve ser feita por quem tem conhecimento e tempo suficientes.',
  erro: {
    titulo: 'Encontrou um erro?',
    paragrafos: [
      'Corrija e confira os pontos relacionados. Pedir ao mesmo assistente que confirme não substitui verificar em fonte independente.',
      'Se o material já foi usado ou divulgado, siga o procedimento do órgão para correção e aviso aos responsáveis.',
    ],
  },
}

export const responsabilidade = {
  blocos: [
    {
      id: 'resp-humana',
      titulo: 'Responsabilidade humana',
      icone: 'user-check' as IconeGuia,
      paragrafos: [
        'A ferramenta não assume responsabilidade pelo conteúdo final. Não adote a resposta como decisão administrativa nem como fundamento suficiente de ato que exija análise e motivação próprias; quem tem competência deve avaliar informações, critérios e efeitos.',
      ],
    },
    {
      id: 'resp-transparencia',
      titulo: 'Transparência',
      icone: 'megaphone' as IconeGuia,
      paragrafos: [
        'Siga as regras do órgão; como boa prática, informe o uso de IA quando contribuir de forma relevante para análises, conclusões ou conteúdos divulgados.',
      ],
    },
    {
      id: 'resp-registro',
      titulo: 'Registro',
      icone: 'clipboard-check' as IconeGuia,
      paragrafos: [
        'O registro deve mostrar como a IA foi usada e como o resultado foi conferido. Anote: ferramenta, data, finalidade, fontes consultadas, revisão realizada.',
        'Guarde instruções, materiais e resultados necessários, respeitando regras de acesso, guarda e proteção de dados.',
      ],
    },
    {
      id: 'resp-compartilhar',
      titulo: 'Compartilhar boas práticas',
      icone: 'search-check' as IconeGuia,
      paragrafos: [
        'Ao compartilhar prompts reutilizáveis, remova dados pessoais e restritos; informe finalidade, limitações e data do teste; reavalie em cada nova tarefa.',
      ],
    },
    {
      id: 'resp-incidentes',
      titulo: 'Incidentes',
      icone: 'message-warning' as IconeGuia,
      paragrafos: [
        'Em suspeita de exposição de dados ou ação indevida, interrompa o uso afetado, comunique o canal institucional, preserve o necessário para apuração sem ampliar a exposição, e relate erros recorrentes e resultados discriminatórios.',
      ],
    },
  ],
  exemploDeclaracao:
    'Foi utilizado um assistente de IA para apoiar a organização e a elaboração inicial deste texto. O conteúdo foi revisado pela equipe responsável.',
  exemploNota: 'Adapte ao uso real.',
}

export const criteriosFerramentas = {
  intro:
    'Consulte primeiro as ferramentas disponibilizadas ou avaliadas pela instituição. A avaliação técnica, jurídica e contratual cabe às áreas competentes e não precisa ser refeita por cada usuário.',
  perguntas: [
    {
      titulo: 'Autorização',
      descricao: 'O uso atende às regras do órgão e às condições para esse tipo de informação?',
    },
    {
      titulo: 'Adequação à tarefa',
      descricao:
        'Gera resultados adequados, nos formatos e prazos necessários, e dá para validar?',
    },
    {
      titulo: 'Tratamento de dados',
      descricao:
        'Há clareza sobre armazenamento, retenção, treinamento, compartilhamento e exclusão?',
    },
    {
      titulo: 'Acesso e integrações',
      descricao:
        'Quem acessa o conteúdo? Que contas, pastas e sistemas a ferramenta pode consultar ou alterar?',
    },
    {
      titulo: 'Revisão e registro',
      descricao: 'Dá para conferir as fontes e preservar os registros necessários?',
    },
    {
      titulo: 'Condições de uso',
      descricao: 'Termos e licenças permitem o uso pretendido?',
    },
    {
      titulo: 'Custos e continuidade',
      descricao:
        'Combina com a infraestrutura e os recursos do órgão? Suporte e limites atendem à atividade?',
    },
  ] satisfies PerguntaCriterio[],
  destaque:
    'Gratuidade, assinatura paga, código aberto ou execução local não significam, por si só, uso seguro, ético e responsável.',
  fechamento: 'Evite gerar conteúdo sem finalidade e escolha recursos proporcionais à tarefa.',
}

export const checklistEnvio = [
  'A ferramenta e a conta são autorizadas pelo meu órgão para esta tarefa?',
  'Sei que dados estou enviando e eles podem ser compartilhados com esta ferramenta?',
  'Enviei só o necessário (sem senhas, chaves ou dados pessoais desnecessários)?',
  'Verifiquei o arquivo inteiro (comentários, alterações registradas, abas ocultas)?',
  'Conferi a configuração de treinamento, memória e histórico da conta?',
  'Consigo avaliar o resultado ou tenho quem possa revisar?',
  'Sei o que acontece se a resposta estiver errada e quem pode ser afetado?',
  'Vou registrar o uso e informar quando for relevante?',
]

export const fonteGuia = {
  titulo: 'Guia de Boas Práticas de IA Generativa para Servidores Públicos',
  descricao:
    'Secretaria de Governo Digital (MGI) e Serpro, no âmbito do Plano Brasileiro de Inteligência Artificial.',
  guiaUrl:
    'https://www.gov.br/governodigital/pt-br/infraestrutura-nacional-de-dados/inteligencia-artificial/publicacoes/guia-ia-generativa',
  pdfUrl:
    'https://www.gov.br/governodigital/pt-br/infraestrutura-nacional-de-dados/inteligencia-artificial/publicacoes/infograficos_defeso.pdf/@@download/file',
  rotuloGuia: 'Abrir o guia original',
  rotuloPdf: 'Abrir os infográficos (PDF)',
  creditos: ['Plano Brasileiro de IA', 'Secretaria de Governo Digital (SGD/MGI)', 'Serpro'],
  nota: 'Este conteúdo é um resumo educativo. Consulte sempre o guia oficial e as normas do seu órgão.',
}
