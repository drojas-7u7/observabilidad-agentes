import type { Trace } from '../../types/trace'

/**
 * Traza de Charo: reserva que salió bien.
 * Se usa para enseñar a leer una traza (parte 5).
 * Datos simulados con fines didácticos.
 */
export const charoTrace: Trace = {
  id: '4f1c9a2e7b3d4c18',
  client: 'Charo',
  request:
    'Resérvame el vuelo más barato de Madrid a Sevilla para el sábado, que cueste menos de 90 euros.',
  finalAnswer:
    '¡Listo! Te he reservado el vuelo de AeroBrisa por 79 euros (69 € más 10 € de tasas). Tu localizador es K7Q2PZ.',
  startedAt: '2026-11-04T10:15:02.000Z',
  spans: [
    {
      id: 'c1',
      parentId: null,
      kind: 'agent',
      name: 'invoke_agent agente_viajes',
      label: 'Atiende el encargo de Charo',
      status: 'ok',
      startMs: 0,
      durationMs: 4050,
      attributes: {
        'gen_ai.operation.name': 'invoke_agent',
        'gen_ai.agent.name': 'agente_viajes',
        'gen_ai.conversation.id': 'conv-charo-001',
      },
    },
    {
      id: 'c2',
      parentId: 'c1',
      kind: 'llm',
      name: 'chat modelo-demo-1',
      label: 'Decide buscar vuelos',
      status: 'ok',
      startMs: 50,
      durationMs: 1200,
      input: {
        mensaje_usuario:
          'Resérvame el vuelo más barato de Madrid a Sevilla para el sábado, que cueste menos de 90 euros.',
      },
      output: {
        llamada_herramienta: {
          nombre: 'buscar_vuelos',
          argumentos: { origen: 'MAD', destino: 'SVQ', fecha: '2026-11-07' },
        },
      },
      attributes: {
        'gen_ai.operation.name': 'chat',
        'gen_ai.request.model': 'modelo-demo-1',
        'gen_ai.usage.input_tokens': 820,
        'gen_ai.usage.output_tokens': 45,
        'gen_ai.response.finish_reasons': 'tool_calls',
      },
    },
    {
      id: 'c3',
      parentId: 'c1',
      kind: 'tool',
      name: 'execute_tool buscar_vuelos',
      label: 'Busca los vuelos disponibles',
      status: 'ok',
      startMs: 1260,
      durationMs: 780,
      input: { origen: 'MAD', destino: 'SVQ', fecha: '2026-11-07' },
      output: {
        vuelos: [
          { codigo: 'NA2210', aerolinea: 'NubeAir', precio: 110 },
          { codigo: 'VS1187', aerolinea: 'VuelaSol', precio: 75 },
          { codigo: 'AB0412', aerolinea: 'AeroBrisa', precio: 69 },
        ],
      },
      attributes: {
        'gen_ai.operation.name': 'execute_tool',
        'gen_ai.tool.name': 'buscar_vuelos',
      },
    },
    {
      id: 'c4',
      parentId: 'c1',
      kind: 'llm',
      name: 'chat modelo-demo-1',
      label: 'Elige el más barato y decide reservarlo',
      status: 'ok',
      startMs: 2050,
      durationMs: 980,
      input: { resultado_herramienta: 'buscar_vuelos: 3 vuelos encontrados' },
      output: {
        razonamiento: 'El más barato es AeroBrisa (AB0412) por 69 €.',
        llamada_herramienta: {
          nombre: 'reservar_vuelo',
          argumentos: { codigo_vuelo: 'AB0412' },
        },
      },
      attributes: {
        'gen_ai.operation.name': 'chat',
        'gen_ai.request.model': 'modelo-demo-1',
        'gen_ai.usage.input_tokens': 1010,
        'gen_ai.usage.output_tokens': 40,
        'gen_ai.response.finish_reasons': 'tool_calls',
      },
    },
    {
      id: 'c5',
      parentId: 'c1',
      kind: 'tool',
      name: 'execute_tool reservar_vuelo',
      label: 'Reserva el vuelo',
      status: 'ok',
      startMs: 3040,
      durationMs: 560,
      input: { codigo_vuelo: 'AB0412' },
      output: {
        estado: 'confirmada',
        localizador: 'K7Q2PZ',
        codigo_vuelo: 'AB0412',
        precio_final: 79,
        tasas: 10,
      },
      attributes: {
        'gen_ai.operation.name': 'execute_tool',
        'gen_ai.tool.name': 'reservar_vuelo',
      },
    },
    {
      id: 'c6',
      parentId: 'c1',
      kind: 'llm',
      name: 'chat modelo-demo-1',
      label: 'Escribe la respuesta final',
      status: 'ok',
      startMs: 3610,
      durationMs: 420,
      input: {
        resultado_herramienta: 'reservar_vuelo: confirmada, precio_final 79, tasas 10',
      },
      output: {
        respuesta:
          '¡Listo! Te he reservado el vuelo de AeroBrisa por 79 euros (69 € más 10 € de tasas). Tu localizador es K7Q2PZ.',
      },
      attributes: {
        'gen_ai.operation.name': 'chat',
        'gen_ai.request.model': 'modelo-demo-1',
        'gen_ai.usage.input_tokens': 1190,
        'gen_ai.usage.output_tokens': 60,
        'gen_ai.response.finish_reasons': 'stop',
      },
    },
  ],
}
