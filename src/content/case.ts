import type { Question } from '../types/question'

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
