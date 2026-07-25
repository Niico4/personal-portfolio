# Tipografía

## Familias

`app/fonts.ts` carga mediante `next/font/google`:

- DM Sans, pesos 300–800: cuerpo y UI.
- Poetsen One, peso 400: headings de marca.

Ambas usan subset latino y `display: swap`. El `<body>` aplica DM Sans y peso
ligero; no uses fuentes remotas manuales.

## Jerarquía confirmada

`app/components/common/heading.tsx` es la primitive predominante:

| Elemento | Estilo base                                    |
| -------- | ---------------------------------------------- |
| `h1`     | Poetsen One, `text-4xl sm:text-5xl`, `ink-50`  |
| `h2`     | Poetsen One, `text-2xl sm:text-3xl`, `ink-100` |

`SectionHeader` combina un `h2` con descripción `text-xs sm:text-sm`,
`leading-relaxed`, `ink-100`.

En Project Detail el `h1` extiende `Heading` con un clamp entre 2.5rem y
5.5rem, leading 0.95 y tracking negativo. Los títulos editoriales internos
usan sans bold, no Poetsen One.

## Patrones secundarios

- Títulos de cards: 1.25–1.5rem, bold/semibold, tracking negativo sutil.
- Body: `text-sm` o `text-base`, `leading-7`/`leading-8`, `ink-200`.
- Texto auxiliar: `text-xs`, `ink-300` a `ink-500`.
- Eyebrows y metadata: mayúsculas, tracking 0.14–0.17em.
- Números/labels técnicos: `font-mono`.
- Contenido largo: `text-pretty` o `text-balance` cuando ayuda a títulos.

Evidencia: `project-card.tsx`, `project-detail.tsx`,
`project-navigation-card.tsx` y `work-process-section.tsx`.

## Portable Text

`PortableTextContent` define semántica mínima. La apariencia depende del
contexto mediante selectores Tailwind:

- Home: enlaces subrayados y color de hover.
- Experiencia: lista convertida visualmente en marcadores de rombo.
- Project Detail: headings, listas, links, espaciado y ancho editorial.

No amplíes el renderer global para resolver un único contexto si puede
expresarse desde su `className`. Si un nuevo tipo de bloque se repite, entonces
actualiza el renderer y el schema juntos.

## Excepciones

- El 404 usa `white/*`, `cyan` y tamaños propios.
- Wiki hereda la fuente global y estiliza su renderer Markdown mediante
  componentes React y utilidades Tailwind locales.
- Services mezcla tokens `foreground` con `ink`.

Estas excepciones no sustituyen la jerarquía predominante.

## Reglas

- Conserva niveles HTML correctos; no elijas `h*` por tamaño.
- Usa `Heading` para h1/h2 de páginas del shell principal salvo necesidad
  demostrada.
- No reduzcas body largo por debajo de `text-sm`.
- Mantén contraste mediante la escala `ink`; la opacidad es para contenido
  secundario, no para acciones críticas.
