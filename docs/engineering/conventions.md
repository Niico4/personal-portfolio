# Convenciones de ingeniería

## Fuente

Estas reglas derivan de `tsconfig.json`, `eslint.config.mjs`, `.prettierrc` y
patrones repetidos. Cuando un módulo análogo contradiga una preferencia
general, conserva su estilo local y documenta una decisión antes de
normalizarlo.

## Formato y lint

Prettier exige:

- punto y coma;
- comillas simples;
- trailing commas;
- 2 espacios;
- ancho de 80;
- LF.

ESLint combina Core Web Vitals, reglas TypeScript, Prettier y:

- orden de imports por grupos, con línea en blanco;
- orden alfabético case-insensitive;
- `no-console`, salvo `console.error`.

No ignores una regla inline sin explicar por qué.

## Imports

Aliases:

- `@/*` apunta a `app/*`;
- `@/sanity/*` apunta a `sanity/*`.

Usa alias para cruzar áreas (`@/components`, `@/sanity`, `@/utils`) y rutas
relativas para archivos colocados juntos. Evidencia: pages importan common por
alias; navbar importa config por relativo.

Inconsistencias:

- algunos tipos se importan sin `import type`;
- `job-experience-content.tsx` usa una ruta relativa profunda hacia common;
- `ProjectCard` usa el alias `@/(pages)/...`, acoplando common a Portfolio.

No copies esas excepciones sin necesidad.

## Naming

- archivo/carpeta: kebab-case;
- componente/tipo/interface: PascalCase;
- función/variable: camelCase;
- constante estática: UPPER_SNAKE_CASE;
- query: nombre descriptivo + `_QUERY`;
- fetcher: `get*`;
- schema: `*Type`;
- props: `*Props` o un `Props` local.

Exports default son frecuentes para pages/sections; componentes comunes suelen
usar export nombrado. No hay una regla universal demostrada.

## Funciones y componentes

- Las pages y secciones servidor pueden ser `async`.
- No marques `async` una función nueva si no espera nada; existen casos
  históricos, pero no constituyen una necesidad.
- Extrae maps/configs estáticos fuera del render (`NAV_ITEMS`, `SERVICES`,
  `ACCENT_STYLES`).
- Usa early returns para ausencia de datos cuando la sección completa no tiene
  sentido.
- Mantén helpers puros fuera de JSX cuando transforman fechas, URLs o números.

## Route handlers y páginas

No hay route handlers API. Sigue convenciones App Router:

- `page.tsx` orquesta;
- `layout.tsx` aporta shell;
- `generateMetadata` para metadata dinámica;
- `generateStaticParams` solo cuando hay una fuente clara de parámetros;
- `notFound()` para recursos ausentes.

Wiki implementa `loading.tsx`, `error.tsx` y `not-found.tsx` dentro de su
alcance. No asumas que las demás features tienen estados equivalentes.

## Comentarios

Los comentarios se usan para contexto externo, intención o código pendiente.
Hay bloques comentados antiguos en fetch options y Home. No añadas código
comentado como mecanismo de configuración.

## Flujo obligatorio

1. Inspecciona la page, section o fetcher análogo.
2. Comprueba componentes common y feature-locales.
3. Confirma si el cambio cruza server/client.
4. Actualiza schema/query/tipo juntos si toca Sanity.
5. Ejecuta validadores.
6. Actualiza docs si cambió una decisión o patrón.

Evita refactors, renames y reordenamientos ajenos al objetivo.
