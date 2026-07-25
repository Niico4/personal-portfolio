# Estructura de directorios

## Regla de colocación predominante

La colocación se decide por alcance de reutilización, no solo por tipo técnico.

| Alcance                  | Ubicación               | Evidencia                          |
| ------------------------ | ----------------------- | ---------------------------------- |
| Ruta y composición       | `app/**/page.tsx`       | Home, Portfolio, Services          |
| Sección de una página    | `app/**/sections`       | Home y Services                    |
| UI propia de una feature | `app/**/components`     | Portfolio y Services               |
| UI transversal           | `app/components/common` | `Heading`, `ProjectCard`, chips    |
| Shell transversal        | `app/layout`            | `FloatingNavbar`, `FooterCard`     |
| Helper puro              | `app/utils`             | fechas, duración y URLs SEO        |
| Configuración validada   | `app/config`            | entorno público, servidor y SEO    |
| Integración de Wiki      | `app/(pages)/wiki/lib`  | cliente, queries y dominio Notion  |
| CMS                      | `sanity`                | schemas, queries, fetchers y tipos |

## `app`

### Root y layouts

- `app/layout.tsx`: único layout raíz. Define `<html>`, `<body>`, metadata y
  decoración de fondo.
- `app/(pages)/layout.tsx`: shell del sitio principal. No es global.
- `app/providers.tsx`: providers compartidos por el sitio principal.
- `app/fonts.ts` y `app/globals.css`: fundamentos visuales globales.
- `app/not-found.tsx`: 404 global; sus acciones interactivas están separadas en
  `app/components/not-found-actions.tsx`.

Regla: un layout debe contener concerns persistentes de su subárbol. No
dupliques el navbar en cada página.

### Route groups

`(pages)` agrupa las páginas que comparten shell sin alterar sus URLs.
`(home)` permite que la raíz tenga sus secciones colocadas juntas sin añadir un
segmento URL.

La Wiki está en `app/(pages)/wiki`, por lo que conserva `/wiki` como URL y
hereda el shell público sin duplicar providers ni navbar. Sus instrucciones
específicas viven en `app/(pages)/wiki/AGENTS.md`.

### `sections` frente a `components`

Una `section` representa una región semántica de una página y puede obtener o
presentar datos específicos. Ejemplos:

- `app/(pages)/(home)/sections/projects-preview-section.tsx`
- `app/(pages)/services/sections/work-process-section.tsx`

Un componente de feature encapsula una unidad repetida dentro de esa feature:

- `app/(pages)/portfolio/components/project-status-chip.tsx`
- `app/(pages)/services/components/service-card.tsx`

Promueve una pieza a `app/components/common` solo cuando ya se usa, o existe
una necesidad concreta de usarla, entre varias features. No conviertas un caso
aislado en abstracción global.

### `common`

El catálogo actual incluye:

- `Heading` y `SectionHeader`
- `ProjectCard`
- `SocialChip`, `SkillChip` y `BadgeShine`
- `PortableTextContent`
- `LoaderGhost`
- logo SVG

Wiki mantiene sus cards, breadcrumbs, filtros y renderer en su carpeta de
feature porque sus contratos dependen del modelo público de Notion.

`ProjectCard` está en `common` pero importa `ProjectStatusChip` desde Portfolio.
Es una dependencia invertida existente: common depende de una feature. No la
uses como precedente para nuevas dependencias; registra una decisión antes de
ampliar ese acoplamiento.

## `sanity`

- `schemaTypes`: define el modelo editorial y sus validaciones.
- `lib/queries`: selecciona y renombra campos mediante GROQ.
- `lib/fetchers`: única capa observada de acceso desde las páginas; usa
  `server-only`.
- `lib/types`: contratos manuales que deben mantenerse alineados con las
  proyecciones.
- `lib/client.ts`: cliente compartido.
- `lib/image.ts`: builder existente, actualmente sin consumidores.
- `lib/live.ts`: Live Content API configurada, actualmente sin montar.
- `components` y `studio-content-structure.ts`: UI/estructura del Studio.

No importes schemas o código del Studio en componentes del sitio público.

## `public`

Activos estáticos:

- imágenes de avatar y fallback en `public/*.webp`;
- Open Graph en `public/seo`;
- iconos tecnológicos en `public/icons/tech`;
- icono de LinkedIn en `public/icons`.

Las imágenes editoriales de Sanity se consumen por URL desde
`cdn.sanity.io`, permitido en `next.config.ts`.

## Configuración de raíz

- `package.json` y `pnpm-lock.yaml`: dependencias y comandos.
- `next.config.ts`: rutas tipadas, imágenes remotas y SVG con SVGR/Turbopack.
- `tsconfig.json`: TypeScript y aliases.
- `eslint.config.mjs`: reglas de Next, TypeScript, imports y Prettier.
- `.prettierrc`: formato.
- `tailwind.config.ts` y `postcss.config.mjs`: estilos.
- `sanity.config.ts` y `sanity.cli.ts`: Studio embebido y CLI.

El `README.md` conserva contenido genérico de `create-next-app` y menciona
`app/page.tsx`, que no existe. Trátalo como documentación desactualizada, no
como fuente de arquitectura.

## Naming observado

- Archivos y carpetas: kebab-case (`project-card.tsx`,
  `work-experience-section.tsx`).
- Componentes y tipos: PascalCase.
- Funciones y variables: camelCase.
- Constantes de configuración: UPPER_SNAKE_CASE.
- Queries: UPPER_SNAKE_CASE con sufijo `_QUERY`.
- Fetchers: prefijo `get`.

Hay mezcla de exports default y nombrados, y mezcla de `interface` y `type`.
No existe evidencia suficiente para imponer una sola variante; conserva el
estilo del módulo análogo.
