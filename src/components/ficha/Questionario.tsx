import { RotateCcw } from 'lucide-react'
import type { FichaAnswers, QuestionId } from './fichaSistemaIA'
import { fichaQuestions } from './fichaSistemaIA'

type QuestionarioProps = {
  answers: FichaAnswers
  onAnswer: (questionId: QuestionId, value: boolean) => void
  onClear: () => void
}

export function Questionario({ answers, onAnswer, onClear }: QuestionarioProps) {
  const answeredCount = fichaQuestions.filter((question) => answers[question.id] !== null).length

  return (
    <section className="ficha-questionario" aria-labelledby="questionario-title">
      <div className="ficha-questionario-heading">
        <div>
          <span className="ficha-kicker">Passo 1</span>
          <h2 id="questionario-title">Questionário de entrada</h2>
          <p>Responda às sete perguntas para descobrir quais blocos se aplicam ao sistema avaliado.</p>
        </div>
        <div className="ficha-questionario-actions">
          <span className="ficha-quiz-progress" aria-live="polite">{answeredCount} de {fichaQuestions.length} respondidas</span>
          <button className="ficha-clear" type="button" onClick={onClear} disabled={answeredCount === 0}>
            <RotateCcw size={15} aria-hidden="true" />
            Limpar respostas
          </button>
        </div>
      </div>
      <ol className="ficha-questions">
        {fichaQuestions.map((question) => {
          const answer = answers[question.id]
          return (
            <li className="ficha-question" key={question.id}>
              <div className="ficha-question-copy">
                <span className="ficha-question-id" aria-hidden="true">{question.id}</span>
                <div>
                  <p id={`${question.id}-pergunta`}>{question.label}</p>
                  <span className="ficha-question-tag">[{question.tag}]</span>
                </div>
              </div>
              <div className="ficha-answer-group" role="group" aria-labelledby={`${question.id}-pergunta`}>
                <button
                  className={`ficha-answer${answer === true ? ' is-selected' : ''}`}
                  type="button"
                  aria-pressed={answer === true}
                  onClick={() => onAnswer(question.id, true)}
                >
                  Sim
                </button>
                <button
                  className={`ficha-answer${answer === false ? ' is-selected' : ''}`}
                  type="button"
                  aria-pressed={answer === false}
                  onClick={() => onAnswer(question.id, false)}
                >
                  Não
                </button>
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
