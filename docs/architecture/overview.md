# Arquitectura general

## Propósito

Este documento describe la arquitectura observada del portfolio. No es una
propuesta de rediseño. Las decisiones pendientes y las inconsistencias están en
[decisions.md](decisions.md).

## Stack confirmado

La fuente de versiones es `package.json` y el lockfile `pnpm-lock.yaml`.

| Área                  | Implementación actual                        |
| --------------------- | -------------------------------------------- |
| Framework             | Next.js 16.2.9 con App Router y React 19.2.7 |
| Lenguaje              | TypeScript 5.9, modo `strict`, sin emisión   |
| UI                    | Tailwind CSS 3.4, HeroUI 2.x y Tabler Icons  |
| Movimiento            | Framer Motion 12.40                          |
| CMS principal         | Sanity 5.31 y `next-sanity` 13.1             |
| Wiki                  | API oficial con `@notionhq/client` 5.23.2    |
| Validación de entorno | Zod 4.4                                      |
| Gestor de paquetes    | pnpm, confirmado por `pnpm-lock.yaml`        |

No hay `engines` ni `packageManager` en `package.json`; la versión de Node o de
pnpm no está fijada por el repositorio.

## Capas y límites

```text
app/
├── layout.tsx                 layout raíz, metadata y fondo global
├── (pages)/                   sitio público con Providers + FloatingNavbar
│   ├── (home)/                composición de Home mediante sections
│   ├── portfolio/             listado, detalle y UI propia de proyectos
│   ├── services/              página, sections y componentes propios
│   └── wiki/                  datos, dominio, UI y Markdown de Wiki
├── studio/                    Sanity Studio embebido
├── components/common/        piezas compartidas entre features
├── layout/                    navbar y footer compartidos
├── config/                    entorno y SEO
└── utils/                     transformaciones puras y helpers SEO

sanity/
├── schemaTypes/               modelo editorial
├── lib/queries/               proyecciones GROQ
├── lib/fetchers/              acceso server-only
├── lib/types/                 contratos TypeScript manuales
└── components/                UI exclusiva del Studio
```

Patrón confirmado:

- Las `page.tsx` son Server Components por defecto y orquestan datos y
  secciones. Evidencia: `app/(pages)/(home)/page.tsx`,
  `app/(pages)/portfolio/page.tsx` y `app/(pages)/services/page.tsx`.
- Las secciones propias de una página viven en `sections/`; la UI reutilizable
  vive en `app/components/common`; la UI compartida solo dentro de una feature
  vive en su `components/`.
- Los fetchers de Sanity están marcados `server-only` y la transformación de
  forma se hace principalmente en las proyecciones GROQ.
- La interactividad se aísla mediante `'use client'`, por ejemplo
  `app/layout/navbar/navbar.tsx` y
  `app/(pages)/(home)/sections/experience/job-experience-content.tsx`.

## Árbol de layouts y rutas

`app/layout.tsx` envuelve todas las rutas, carga DM Sans, metadata global, el
tema oscuro y el fondo cuadriculado.

`app/(pages)/layout.tsx` envuelve Home, Portfolio, Services y Wiki con
`HeroUIProvider`, `MotionConfig`, `FloatingNavbar` y el contenedor de contenido.
Los route groups no forman parte de la URL.

`app/studio/[[...tool]]/page.tsx` queda fuera de `(pages)` y no hereda el shell
público.

Rutas confirmadas:

- `/` — `app/(pages)/(home)/page.tsx`
- `/portfolio` — `app/(pages)/portfolio/page.tsx`
- `/portfolio/[slug]` — `app/(pages)/portfolio/[slug]/page.tsx`
- `/services` — `app/(pages)/services/page.tsx`
- `/wiki`, `/wiki/[notebookSlug]` y
  `/wiki/[notebookSlug]/[noteSlug]`
- `/studio/*` — `app/studio/[[...tool]]/page.tsx`

`proxy.ts` valida las rutas dinámicas de Wiki antes del streaming: redirige
segmentos legacy al slug canónico y marca contenido no publicable como 404.

## Server y Client Components

No se debe añadir `'use client'` a una página completa por defecto. Mantén en
servidor el fetch, metadata y composición; cruza la frontera cliente con props
serializables.

Client Components confirmados:

- Navbar: necesita `usePathname` y Framer Motion.
- Experiencia expandible: necesita estado, IDs ARIA y animación.
- Filtros/búsqueda de Wiki: interactividad localizada.
- Algunas cards y el detalle de proyecto están marcados cliente aunque no
  mantienen estado local. Es una inconsistencia existente, no una regla para
  nuevas cards.

`app/providers.tsx` centraliza HeroUI y `MotionConfig reducedMotion="user"`.
Todas las rutas públicas bajo `(pages)`, incluida Wiki, reciben esos providers.

## Dependencias aceptadas por uso real

- HeroUI: `Button`, `Card`, `Chip`, `Divider`, `Link` y `Tooltip`.
- Tailwind: layout, tipografía, estados, responsive y tokens propios.
- Framer Motion: indicador activo del navbar y expansión de experiencia.
- `next/image`: avatar, logos y previews de proyectos.
- Portable Text: contenido estructurado de Sanity.
- `@notionhq/client`: lectura server-only de Notion.
- `react-markdown`, `remark-parse`, `remark-gfm`, `unified`, `parse5`,
  `rehype-raw` y `rehype-sanitize`: parsing AST, adaptación de bloques propios
  de Notion y render seguro del Enhanced Markdown.
- `refractor`: resaltado de sintaxis server-side para los bloques de código de
  Wiki.

No agregues otra librería para resolver problemas ya cubiertos por estas
dependencias sin una decisión explícita.

## Estados especiales

Existe un `app/not-found.tsx` global. Wiki añade `loading.tsx`, `error.tsx` y
`not-found.tsx` en su propio alcance; no hay `global-error.tsx` ni estados
equivalentes para las demás features.

## Fuentes relacionadas

- [Estructura de directorios](directory-structure.md)
- [Flujo de datos](data-flow.md)
- [Decisiones e inconsistencias](decisions.md)
- [Composición de componentes](../engineering/components.md)
- [Wiki](../features/wiki.md)
