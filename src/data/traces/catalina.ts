import type { Trace } from '../../types/trace'

/**
 * Traza de Catalina: el caso del vuelo de 95 euros.
 * Se usa en el reto (parte 6). Todos los spans terminan en "ok",
 * pero el agente informa de un precio incorrecto: es un falso éxito.
 * Datos simulados con fines didácticos.
 */
export const catalinaTrace: Trace = {
  id: '9b7e2d41c6a05f83',
  client: 'Catalina',
  request:
    'Resérvame el vuelo más barato de Madrid a Barcelona para el viernes, que cueste menos de 100 euros.',
  finalAnswer:
    '¡Listo! Te he reservado el vuelo de AeroBrisa por 85 euros. Tu localizador es M3X8RT.',
  startedAt: '2026-11-04T09:42:17.000Z',
  spans: [
    {
      id: 'k1',
      parentId: null,
      kind: 'agent',
      name: 'invoke_agent agente_viajes',
      label: 'El agente atiende el encargo de Catalina',
      status: 'ok',
      startMs: 0,
      durationMs: 4120,
      attributes: {
        'gen_ai.operation.name': 'invoke_agent',
        'gen_ai.agent.name': 'agente_viajes',
        'gen_ai.conversation.id': 'conv-catalina-001',
      },
    },
    {
      id: 'k2',
      parentId: 'k1',
      kind: 'llm',
      name: 'chat modelo-demo-1',
      label: 'El modelo decide buscar vuelos',
      status: 'ok',
      startMs: 40,
      durationMs: 1180,
      input: {
        mensaje_usuario:
          'Resérvame el vuelo más barato de Madrid a Barcelona para el viernes, que cueste menos de 100 euros.',
      },
      output: {
        llamada_herramienta: {
          nombre: 'buscar_vuelos',
          argumentos: { origen: 'MAD', destino: 'BCN', fecha: '2026-11-06' },
        },
      },
      attributes: {
        'gen_ai.operation.name': 'chat',
        'gen_ai.request.model': 'modelo-demo-1',
        'gen_ai.usage.input_tokens': 830,
        'gen_ai.usage.output_tokens': 44,
        'gen_ai.response.finish_reasons': 'tool_calls',
      },
    },
    {
      id: 'k3',
      parentId: 'k1',
      kind: 'tool',
      name: 'execute_tool buscar_vuelos',
      label: 'Se buscan los vuelos disponibles',
      status: 'ok',
      startMs: 1230,
      durationMs: 810,
      input: { origen: 'MAD', destino: 'BCN', fecha: '2026-11-06' },
      output: {
        vuelos: [
          { codigo: 'NA3105', aerolinea: 'NubeAir', precio: 120 },
          { codigo: 'VS2240', aerolinea: 'VuelaSol', precio: 98 },
          { codigo: 'AB0738', aerolinea: 'AeroBrisa', precio: 85 },
        ],
      },
      attributes: {
        'gen_ai.operation.name': 'execute_tool',
        'gen_ai.tool.name': 'buscar_vuelos',
      },
    },
    {
      id: 'k4',
      parentId: 'k1',
      kind: 'llm',
      name: 'chat modelo-demo-1',
      label: 'El modelo elige el vuelo más barato y decide reservarlo',
      status: 'ok',
      startMs: 2050,
      durationMs: 1010,
      input: { resultado_herramienta: 'buscar_vuelos: 3 vuelos encontrados' },
      output: {
        razonamiento: 'El más barato es AeroBrisa (AB0738) por 85 €.',
        llamada_herramienta: {
          nombre: 'reservar_vuelo',
          argumentos: { codigo_vuelo: 'AB0738' },
        },
      },
      attributes: {
        'gen_ai.operation.name': 'chat',
        'gen_ai.request.model': 'modelo-demo-1',
        'gen_ai.usage.input_tokens': 1020,
        'gen_ai.usage.output_tokens': 41,
        'gen_ai.response.finish_reasons': 'tool_calls',
      },
    },
    {
      id: 'k5',
      parentId: 'k1',
      kind: 'tool',
      name: 'execute_tool reservar_vuelo',
      label: 'Se reserva el vuelo',
      status: 'ok',
      startMs: 3070,
      durationMs: 590,
      input: { codigo_vuelo: 'AB0738' },
      output: {
        estado: 'confirmada',
        localizador: 'M3X8RT',
        codigo_vuelo: 'AB0738',
        precio_final: 95,
        tasas: 10,
      },
      attributes: {
        'gen_ai.operation.name': 'execute_tool',
        'gen_ai.tool.name': 'reservar_vuelo',
      },
    },
    {
      id: 'k6',
      parentId: 'k1',
      kind: 'llm',
      name: 'chat modelo-demo-1',
      label: 'El modelo escribe la respuesta final',
      status: 'ok',
      startMs: 3680,
      durationMs: 410,
      input: {
        resultado_herramienta: 'reservar_vuelo: confirmada, precio_final 95, tasas 10',
      },
      output: {
        respuesta:
          '¡Listo! Te he reservado el vuelo de AeroBrisa por 85 euros. Tu localizador es M3X8RT.',
      },
      attributes: {
        'gen_ai.operation.name': 'chat',
        'gen_ai.request.model': 'modelo-demo-1',
        'gen_ai.usage.input_tokens': 1200,
        'gen_ai.usage.output_tokens': 52,
        'gen_ai.response.finish_reasons': 'stop',
      },
    },
  ],
}
