/** Una opción de respuesta. */
export interface QuestionOption {
  id: string
  /** Texto de la opción. */
  text: string
  /** Lo que responde Bita al elegirla. */
  feedback: string
  isCorrect: boolean
}

/** Una pregunta con opciones. */
export interface Question {
  id: string
  /** Enunciado de la pregunta. */
  prompt: string
  options: QuestionOption[]
  /** Pistas opcionales, de menos a más reveladora. */
  hints?: string[]
}
