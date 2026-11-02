# Expediente: detectives de agentes

**Evaluación y observabilidad de sistemas de agentes de IA**

Masterclass interactiva impartida el 5 de noviembre de 2026 en el Bootcamp de Desarrollo de IA de Somos F5. A través de un caso práctico guiado por el detective Bita, explica cómo observar, depurar y evaluar agentes de IA: logs, métricas, trazas, spans, golden sets y LLM como juez.

> Web publicada: https://observabilidad-agentes.drojas-7u7.workers.dev

## El caso

Un agente de IA de una agencia de viajes (ficticia) le dice a una clienta que le ha reservado un vuelo por 85 €, pero le cobran 95 €. Todo ha ido "bien": ningún paso dio error. Durante la masterclass, el público aprende a usar la observabilidad para encontrar qué falló, dónde y por qué, y la evaluación para que no vuelva a pasar.

## Contenido

| Parte | Sección | Qué se ve |
|---|---|---|
| — | Portada | Título, ponente y código QR para seguir la clase desde el móvil |
| 1 | Introducción | El mapa de la clase y cómo funciona |
| 2 | El caso | La queja de la clienta y la primera pregunta |
| 3 | El expediente histórico | Cómo se ha investigado esto en cuatro épocas |
| 4 | Lo que ya sabemos | Repaso de conceptos previos |
| 5 | Las herramientas del detective | Monitorizar y observar, instrumentar, logs, métricas y trazas |
| 6 | Resuelve el caso | Reto guiado sobre la traza real del caso |
| 7 | Cerrar el caso | Arreglo, evaluación, ciclo de mejora, ética y conclusiones |
| — | Para seguir aprendiendo | Guía en PDF, lecturas recomendadas y glosario |

## Tecnologías

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/), con [Vite](https://vite.dev/)
- [Tailwind CSS](https://tailwindcss.com/) para el diseño
- [Motion](https://motion.dev/) para las animaciones
- Tipografías incluidas en el proyecto con [Fontsource](https://fontsource.org/) (sin dependencias externas)
- Publicación en [Cloudflare Pages](https://pages.cloudflare.com/)

## Ejecutar en local

Requisitos: Node.js 24 (en este proyecto, aislado en un entorno de conda) y Git.

```bash
conda create -n observabilidad-agentes -c conda-forge nodejs=24
conda activate observabilidad-agentes
npm install
npm run dev
```

Scripts disponibles:

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo en `http://localhost:5173` |
| `npm run build` | Comprueba los tipos y genera la versión final en `dist/` |
| `npm run lint` | Revisa el código con ESLint |
| `npm run preview` | Sirve en local la versión final generada |
| `npm run guia:pdf` | Regenera la guía en PDF a partir de `docs/guia/` (requiere el entorno de conda `pdf-tools` con WeasyPrint) |

## Estructura del proyecto

```
src/
├── config/        Lista de secciones (orden, menú y navegación)
├── styles/        Tema visual: colores y tipografías
├── content/       Todos los textos de la web, separados del diseño
├── data/traces/   Trazas simuladas del caso (formato inspirado en OpenTelemetry)
├── lib/           Lógica sin interfaz: métricas, árbol de spans, logs, formatos
├── hooks/         Navegación por secciones y memoria del progreso
├── components/    Piezas reutilizables (explorador de trazas, Bita, preguntas...)
└── sections/      Una carpeta por sección de la masterclass
```

## Decisiones técnicas

- **Contenido separado del diseño.** Los textos viven en `src/content/` y los colores en `src/styles/theme.css`. Cambiar un texto o la paleta no requiere tocar los componentes.
- **Secciones configurables.** Añadir, quitar o reordenar secciones es editar `src/config/sections.ts`; el menú y la navegación se generan solos.
- **Datos derivados, no duplicados.** Las métricas, los logs y los chats se calculan a partir de las trazas, para que nunca se contradigan.
- **Trazas simuladas.** Las trazas del caso están escritas a mano, siguiendo las convenciones `gen_ai.*` de OpenTelemetry, para que el reto funcione siempre igual. Los datos, clientas, aerolíneas y la agencia son ficticios.
- **Memoria del progreso.** El avance de cada sección se guarda en `sessionStorage`: se conserva al cambiar de sección o recargar, y se borra al cerrar la pestaña.
- **Accesibilidad.** Idioma declarado, textos alternativos, navegación con teclado, contraste revisado y respeto a la preferencia de reducir animaciones.

## Avisos de seguridad de npm

`npm audit` muestra 12 avisos de gravedad moderada. Todos proceden de una única dependencia (`minimatch`) usada por ESLint y `typescript-eslint`, es decir, por herramientas de desarrollo que no forman parte de la web publicada. La solución que propone `npm audit fix --force` instalaría una versión mucho más antigua de `typescript-eslint` y rompería la configuración. Se ha decidido no forzarla y aplicar la corrección cuando esas herramientas actualicen sus dependencias.

## Problemas frecuentes

- **`ERESOLVE unable to resolve dependency tree` al instalar.** La plantilla de Vite puede traer una versión de TypeScript más nueva que la que admite `typescript-eslint`. Solución: `npm install --save-dev typescript@~6.0.0`.
- **`bash: !algo: event not found` al pegar comandos.** En bash, el símbolo `!` entre comillas dobles se interpreta como una referencia al historial. Solución: ejecutar `set +H` antes, o usar comillas simples.
- **La web recuerda respuestas antiguas.** El progreso se guarda en `sessionStorage`. Solución: usar los botones de reiniciar del caso y del reto, o cerrar la pestaña y volver a abrirla.
- **No cambian los estilos tras editar el tema.** Reinicia el servidor de desarrollo (`Ctrl+C` y `npm run dev`).

## Autor

**David Rojas Cruz** · [GitHub](https://github.com/drojas-7u7) · [LinkedIn](https://www.linkedin.com/in/david-rojas-cruz-27761b176/)

## Licencia

© 2026 David Rojas Cruz. El contenido didáctico se publica bajo licencia [CC BY-NC-ND 4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/deed.es). El código fuente y el personaje de Bita tienen todos los derechos reservados. Consulta el archivo [LICENSE](LICENSE).
