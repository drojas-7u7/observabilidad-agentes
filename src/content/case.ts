import { catalinaTrace } from '../data/traces/catalina'
import type { Question } from '../types/question'

/**
 * Textos de la parte 2.
 * Los mensajes del chat se toman de la traza de Catalina,
 * para que el chat y la traza digan siempre lo mismo.
 */
export const caseContent = {
  title: 'El caso del vuelo de 95 €',
  fileNumber: 'Expediente nº 001',
  fileName: 'El vuelo de 95 euros',
  status: 'Abierto',
  clientName: catalinaTrace.client,
  clientMessage: catalinaTrace.request,
  agentName: 'Agente de viajes',
  agentMessage: catalinaTrace.finalAnswer,
  typingLabel: 'El agente está escribiendo',
  notification: {
    source: 'Banca Nube · notificación ficticia',
    title: 'Cargo en tu tarjeta',
    amount: '95,00 €',
    detail: 'AeroBrisa · Reserva M3X8RT',
  },
  twist: '¿Qué ha pasado aquí?',
  /** Texto del botón en cada momento de la secuencia. */
  stepButtons: ['Ver la respuesta del agente', 'Ver qué pasó después', 'Investigar'],
}

/** Pregunta de la parte 2: ¿cómo averiguarías qué ha pasado con Catalina? */
export const caseQuestion: Question = {
  id: 'como-investigar',
  prompt: '¿Cómo averiguarías qué ha pasado?',
  options: [
    {
      id: 'preguntar-agente',
      text: 'Le pregunto al propio agente.',
      feedback:
        'Mala idea. El agente ya ha dicho que todo fue bien. Si se equivocó una vez, puede volver a equivocarse al explicarlo. ¡Las palabras no son pruebas!',
      isCorrect: false,
    },
    {
      id: 'revisar-codigo',
      text: 'Reviso el código del agente.',
      feedback:
        'El código está bien: no ha dado ningún error. El fallo no está en una línea de código, está en una decisión.',
      isCorrect: false,
    },
    {
      id: 'volver-a-ejecutar',
      text: 'Lo vuelvo a ejecutar a ver si falla otra vez.',
      feedback:
        'Puede que esta vez lo haga bien. Los agentes no siempre hacen lo mismo con el mismo encargo, así que no podrías reproducir el fallo.',
      isCorrect: false,
    },
    {
      id: 'mirar-registro',
      text: 'Miro un registro de todo lo que hizo el agente.',
      feedback:
        '¡Eso es! Pero solo si alguien lo dejó preparado para registrarlo. Hoy vamos a ver cómo.',
      isCorrect: true,
    },
  ],
}
