import { useEffect, useRef, useState, type ReactNode } from 'react'
import { ArrowUpRight, BookOpen, Download, FileText, ShieldCheck } from 'lucide-react'
import { AcordeaoRiscos } from '../components/guia/AcordeaoRiscos'
import { AbasBoasPraticas } from '../components/guia/AbasBoasPraticas'
import { BotaoCopiar } from '../components/guia/BotaoCopiar'
import { ChecklistGuia } from '../components/guia/ChecklistGuia'
import { Icone } from '../components/guia/Icone'
import {
  alcanceGuia,
  antesDeComecar,
  assistentesIA,
  avaliacaoRisco,
  boasPraticas,
  checklistEnvio,
  comparativoTreinamento,
  criteriosFerramentas,
  fonteGuia,
  heroGuia,
  memoriaHistorico,
  passosPrivacidade,
  principios,
  privacidadeNaoResolve,
  responsabilidade,
  revisao,
  riscos,
  secoesGuia,
  treinamentoDestaque,
  type IconeGuia,
  type TomDestaque,
} from '../data/guiaIA'

type SecaoProps = {
  id: string
  numero: string
  children: ReactNode
}

function Secao({ id, numero, children }: SecaoProps) {
  const dados = secoesGuia.find((secao) => secao.id === id)
  const titulo = dados?.titulo ?? id

  return (
    <section className="guia-secao" id={id} aria-labelledby={`${id}-titulo`}>
      <header className="guia-secao-topo">
        <span className="guia-secao-numero" aria-hidden="true">{numero}</span>
        <div className="guia-secao-cabecalho">
          <h2 id={`${id}-titulo`}>{titulo}</h2>
          {dados?.lead && <p className="guia-secao-lead">{dados.lead}</p>}
        </div>
      </header>
      <div className="guia-secao-corpo">{children}</div>
    </section>
  )
}

type DestaqueProps = {
  tom: TomDestaque
  titulo?: string
  children: ReactNode
}

const iconeDestaque: Record<TomDestaque, IconeGuia> = {
  info: 'info',
  atencao: 'triangle-alert',
  risco: 'shield-alert',
}

function Destaque({ tom, titulo, children }: DestaqueProps) {
  return (
    <div className="guia-destaque" data-tom={tom}>
      <Icone nome={iconeDestaque[tom]} size={18} />
      <div className="guia-destaque-conteudo">
        {titulo && <strong>{titulo}</strong>}
        <p>{children}</p>
      </div>
    </div>
  )
}

function rolarSuave() {
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export default function GuiaIAPage() {
  const [ativo, setAtivo] = useState(secoesGuia[0].id)
  const indiceRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let frame = 0

    const atualizar = () => {
      frame = 0
      const compacto = window.matchMedia('(max-width: 1023px)').matches
      const alturaHeader =
        document.querySelector('.site-header')?.getBoundingClientRect().height ?? 76
      const alturaIndice = compacto
        ? (indiceRef.current?.getBoundingClientRect().height ?? 0)
        : 0
      // A seção recém-navegada para logo abaixo das barras fixas conta como ativa.
      const topo = alturaHeader + alturaIndice + 40
      let atual = secoesGuia[0].id

      secoesGuia.forEach((secao) => {
        const elemento = document.getElementById(secao.id)
        if (elemento && elemento.getBoundingClientRect().top <= topo) atual = secao.id
      })

      const fim = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8
      if (fim) atual = secoesGuia[secoesGuia.length - 1].id
      setAtivo(atual)
    }

    const aoRolar = () => {
      if (!frame) frame = window.requestAnimationFrame(atualizar)
    }

    atualizar()
    window.addEventListener('scroll', aoRolar, { passive: true })
    window.addEventListener('resize', aoRolar)
    return () => {
      window.removeEventListener('scroll', aoRolar)
      window.removeEventListener('resize', aoRolar)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    const indice = indiceRef.current
    if (!indice) return
    if (indice.scrollWidth <= indice.clientWidth) return

    const link = indice.querySelector<HTMLElement>(`a[href="#${ativo}"]`)
    if (!link) return

    indice.scrollTo({
      left: Math.max(0, link.offsetLeft - indice.clientWidth / 2 + link.clientWidth / 2),
      behavior: rolarSuave() ? 'smooth' : 'auto',
    })
  }, [ativo])

  return (
    <div className="catalog-page guia-page">
      <section className="catalog-intro guia-intro" aria-labelledby="guia-title">
        <span className="catalog-eyebrow">
          <span className="eyebrow-mark" aria-hidden="true" />
          Guia de IA Generativa
        </span>
        <h1 id="guia-title">
          {heroGuia.tituloPrefixo}
          <span className="hero-highlight">{heroGuia.tituloDestaque}</span>
        </h1>
        <p>{heroGuia.subtitulo}</p>
        <div className="guia-selo">
          <ShieldCheck size={17} strokeWidth={1.8} aria-hidden="true" />
          <span>{heroGuia.selo}</span>
        </div>
        <p className="guia-aviso">
          <Icone nome="info" size={15} />
          <span>{heroGuia.aviso}</span>
        </p>
      </section>

      <div className="guia-layout">
        <aside className="guia-indice" ref={indiceRef} aria-label="Índice do guia">
          <p className="guia-indice-titulo">Neste guia</p>
          <nav aria-label="Seções do guia">
            <ol className="guia-indice-lista">
              {secoesGuia.map((secao, indice) => {
                const ativa = secao.id === ativo
                return (
                  <li key={secao.id}>
                    <a
                      className={`guia-indice-link${ativa ? ' is-active' : ''}`}
                      href={`#${secao.id}`}
                      aria-current={ativa ? 'true' : undefined}
                    >
                      <span className="guia-indice-numero" aria-hidden="true">
                        {String(indice + 1).padStart(2, '0')}
                      </span>
                      <span>{secao.rotulo}</span>
                    </a>
                  </li>
                )
              })}
            </ol>
          </nav>
        </aside>

        <div className="guia-conteudo">
          <Secao id="antes-de-comecar" numero="01">
            <div className="guia-cards guia-cards-3">
              {antesDeComecar.map((cartao) => (
                <article className="guia-card" key={cartao.id}>
                  <span className="guia-card-icone" aria-hidden="true">
                    <Icone nome={cartao.icone} size={20} />
                  </span>
                  <h3>{cartao.titulo}</h3>
                  <p>{cartao.descricao}</p>
                </article>
              ))}
            </div>
            <div className="guia-alcance">
              <span className="guia-alcance-icone" aria-hidden="true">
                <Icone nome="boxes" size={19} />
              </span>
              <div>
                <strong>{alcanceGuia.titulo}</strong>
                <p>{alcanceGuia.texto}</p>
              </div>
            </div>
          </Secao>

          <Secao id="o-que-sao" numero="02">
            <p className="guia-texto">{assistentesIA.intro}</p>
            <div className="guia-cards guia-cards-2">
              {assistentesIA.comparativo.map((item, indice) => (
                <article className="guia-card guia-card-comparativo" key={item.titulo}>
                  <span className="guia-card-icone" aria-hidden="true">
                    <Icone nome={indice === 0 ? 'brain' : 'bot'} size={20} />
                  </span>
                  <h3>{item.titulo}</h3>
                  <p>{item.descricao}</p>
                </article>
              ))}
            </div>
            <Destaque tom="atencao">{assistentesIA.destaqueAtencao}</Destaque>
            <Destaque tom="info">{assistentesIA.destaqueInfo}</Destaque>
            <div className="guia-dica">
              <span className="guia-dica-icone" aria-hidden="true">
                <Icone nome="lightbulb" size={18} />
              </span>
              <p>{assistentesIA.dica}</p>
            </div>
            <div className="guia-sobre-modelos">
              <h3>{assistentesIA.sobreModelos.titulo}</h3>
              <p className="guia-texto guia-texto-menor">{assistentesIA.sobreModelos.intro}</p>
              <ul>
                {assistentesIA.sobreModelos.itens.map((item) => (
                  <li key={item.titulo}>
                    <strong>{item.titulo}</strong>
                    <span>{item.texto}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Secao>

          <Secao id="principios" numero="03">
            <div className="guia-cards guia-cards-3">
              {principios.map((principio) => (
                <article className="guia-card" key={principio.id}>
                  <span className="guia-card-icone" aria-hidden="true">
                    <Icone nome={principio.icone} size={20} />
                  </span>
                  <h3>{principio.titulo}</h3>
                  <p>{principio.descricao}</p>
                </article>
              ))}
            </div>
          </Secao>

          <Secao id="riscos" numero="04">
            <AcordeaoRiscos riscos={riscos} />
          </Secao>

          <Secao id="avaliacao-de-risco" numero="05">
            <ol className="guia-perguntas-risco">
              {avaliacaoRisco.perguntas.map((pergunta, indice) => (
                <li key={pergunta}>
                  <span className="guia-pergunta-numero" aria-hidden="true">{indice + 1}</span>
                  <span>{pergunta}</span>
                </li>
              ))}
            </ol>
            <p className="guia-texto">{avaliacaoRisco.texto}</p>
            <div className="guia-alerta-lista">
              <h3>{avaliacaoRisco.criteriosTitulo}</h3>
              <ul>
                {avaliacaoRisco.criterios.map((criterio) => (
                  <li key={criterio}>
                    <Icone nome="triangle-alert" size={16} />
                    <span>{criterio}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Secao>

          <Secao id="boas-praticas" numero="06">
            <AbasBoasPraticas abas={boasPraticas} />
          </Secao>

          <Secao id="treinamento-contexto" numero="07">
            <div className="guia-tabela-wrap">
              <table className="guia-tabela">
                <caption className="sr-only">
                  Comparativo entre treinamento, contexto, histórico, memória, retenção e busca
                </caption>
                <thead>
                  <tr>
                    <th scope="col">Conceito</th>
                    <th scope="col">O que é</th>
                    <th scope="col">Na prática</th>
                  </tr>
                </thead>
                <tbody>
                  {comparativoTreinamento.map((linha) => (
                    <tr key={linha.conceito}>
                      <th scope="row" data-label="Conceito">{linha.conceito}</th>
                      <td data-label="O que é">{linha.oQueE}</td>
                      <td data-label="Na prática">{linha.naPratica}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Destaque tom="info" titulo={treinamentoDestaque.titulo}>
              {treinamentoDestaque.texto}
            </Destaque>
            <div className="guia-dica">
              <span className="guia-dica-icone" aria-hidden="true">
                <Icone nome="lightbulb" size={18} />
              </span>
              <p>{treinamentoDestaque.dica}</p>
            </div>
          </Secao>

          <Secao id="configuracoes" numero="08">
            <ol className="guia-stepper">
              {passosPrivacidade.map((passo, indice) => (
                <li className="guia-stepper-passo" key={passo.titulo}>
                  <span className="guia-stepper-numero" aria-hidden="true">{indice + 1}</span>
                  <div className="guia-stepper-copy">
                    <h3>{passo.titulo}</h3>
                    <p>{passo.descricao}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="guia-nao-resolve">
              <h3>
                <Icone nome="shield-alert" size={19} />
                {privacidadeNaoResolve.titulo}
              </h3>
              {privacidadeNaoResolve.paragrafos.map((paragrafo) => (
                <p key={paragrafo}>{paragrafo}</p>
              ))}
            </div>
            <p className="guia-nota">{privacidadeNaoResolve.nota}</p>
          </Secao>

          <Secao id="memoria-historico" numero="09">
            <div className="guia-cards guia-cards-3">
              {memoriaHistorico.map((cartao) => (
                <article className="guia-card guia-card-texto" key={cartao.id}>
                  <span className="guia-card-icone" aria-hidden="true">
                    <Icone nome={cartao.icone} size={20} />
                  </span>
                  <h3>{cartao.titulo}</h3>
                  {cartao.paragrafos.map((paragrafo) => (
                    <p key={paragrafo}>{paragrafo}</p>
                  ))}
                  {cartao.lista && (
                    <>
                      <span className="guia-mini-rotulo">O que verificar</span>
                      <ul className="guia-lista-simples">
                        {cartao.lista.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </>
                  )}
                  {cartao.nota && <p className="guia-card-nota">{cartao.nota}</p>}
                </article>
              ))}
            </div>
          </Secao>

          <Secao id="revisao" numero="10">
            <div className="guia-cards guia-cards-4">
              {revisao.cards.map((cartao) => (
                <article className="guia-card" key={cartao.titulo}>
                  <span className="guia-card-icone" aria-hidden="true">
                    <Icone nome={cartao.icone} size={20} />
                  </span>
                  <h3>{cartao.titulo}</h3>
                  <p>{cartao.descricao}</p>
                </article>
              ))}
            </div>
            <div className="guia-dica">
              <span className="guia-dica-icone" aria-hidden="true">
                <Icone nome="lightbulb" size={18} />
              </span>
              <p>{revisao.dica}</p>
            </div>
            <div className="guia-nao-resolve guia-erro">
              <h3>
                <Icone nome="file-warning" size={19} />
                {revisao.erro.titulo}
              </h3>
              {revisao.erro.paragrafos.map((paragrafo) => (
                <p key={paragrafo}>{paragrafo}</p>
              ))}
            </div>
          </Secao>

          <Secao id="responsabilidade" numero="11">
            <div className="guia-cards guia-cards-2">
              {responsabilidade.blocos.map((bloco) => (
                <article className="guia-card guia-card-texto" key={bloco.id}>
                  <span className="guia-card-icone" aria-hidden="true">
                    <Icone nome={bloco.icone} size={20} />
                  </span>
                  <h3>{bloco.titulo}</h3>
                  {bloco.paragrafos.map((paragrafo) => (
                    <p key={paragrafo}>{paragrafo}</p>
                  ))}
                </article>
              ))}
            </div>
            <div className="guia-exemplo">
              <span className="guia-mini-rotulo">Exemplo de declaração de uso de IA</span>
              <blockquote>
                <p>“{responsabilidade.exemploDeclaracao}”</p>
              </blockquote>
              <div className="guia-exemplo-acoes">
                <BotaoCopiar texto={responsabilidade.exemploDeclaracao} />
                <span className="guia-exemplo-nota">{responsabilidade.exemploNota}</span>
              </div>
            </div>
          </Secao>

          <Secao id="ferramentas" numero="12">
            <p className="guia-texto">{criteriosFerramentas.intro}</p>
            <div className="guia-cards guia-cards-4">
              {criteriosFerramentas.perguntas.map((pergunta, indice) => (
                <article className="guia-card guia-card-pergunta" key={pergunta.titulo}>
                  <span className="guia-card-numero" aria-hidden="true">
                    {String(indice + 1).padStart(2, '0')}
                  </span>
                  <h3>{pergunta.titulo}</h3>
                  <p>{pergunta.descricao}</p>
                </article>
              ))}
            </div>
            <Destaque tom="atencao">{criteriosFerramentas.destaque}</Destaque>
            <p className="guia-fechamento">
              <Icone nome="gauge" size={17} />
              <span>{criteriosFerramentas.fechamento}</span>
            </p>
          </Secao>

          <Secao id="checklist" numero="13">
            <ChecklistGuia itens={checklistEnvio} />
          </Secao>

          <Secao id="fonte" numero="14">
            <div className="guia-fonte">
              <div className="guia-fonte-cabecalho">
                <span className="guia-fonte-icone" aria-hidden="true">
                  <BookOpen size={22} strokeWidth={1.7} />
                </span>
                <div>
                  <h3>{fonteGuia.titulo}</h3>
                  <p>{fonteGuia.descricao}</p>
                </div>
              </div>
              <div className="guia-fonte-acoes">
                <a className="guia-botao" href={fonteGuia.guiaUrl} target="_blank" rel="noopener noreferrer">
                  <FileText size={16} aria-hidden="true" />
                  {fonteGuia.rotuloGuia}
                  <ArrowUpRight size={15} aria-hidden="true" />
                </a>
                <a
                  className="guia-botao guia-botao-secundario"
                  href={fonteGuia.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download size={16} aria-hidden="true" />
                  {fonteGuia.rotuloPdf}
                  <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              </div>
              <ul className="guia-creditos" aria-label="Créditos">
                {fonteGuia.creditos.map((credito) => (
                  <li key={credito}>{credito}</li>
                ))}
              </ul>
              <p className="guia-fonte-nota">{fonteGuia.nota}</p>
            </div>
          </Secao>
        </div>
      </div>
    </div>
  )
}
