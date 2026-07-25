# Decisiones observadas e inconsistencias

Este archivo no afirma que existan ADR históricos. Resume decisiones inferidas
de varias implementaciones y separa explícitamente lo pendiente.

## Decisiones confirmadas

### App Router con shell por subárbol

Home, Portfolio, Services y Wiki comparten `app/(pages)/layout.tsx`; Studio
permanece independiente. Wiki se movió al route group público para heredar
providers, navbar y contenedor sin cambiar sus URLs.

### Server-first

Las páginas son Server Components y los fetchers de CMS son server-only.
Reserva Client Components para hooks, estado o integraciones que lo requieran.
Evidencia: `app/(pages)/portfolio/[slug]/page.tsx`,
`sanity/lib/fetchers/*.fetcher.ts` y
`app/(pages)/(home)/sections/experience/job-experience-content.tsx`.

### UI híbrida: Tailwind + HeroUI

HeroUI aporta primitivas; Tailwind define la composición y el lenguaje visual.
No hay un wrapper local para cada primitiva. Reutiliza los wrappers existentes
cuando expresan semántica propia (`SocialChip`, `SkillChip`, `Heading`).

### Contenido principal en Sanity

Perfil, experiencia y proyectos se modelan en Sanity. Services sigue siendo
contenido local. No migres contenido entre ambos enfoques como cambio
incidental.

### Fetch de Sanity sin caché

El flujo efectivo usa `client.fetch` con `cache: 'no-store'`. El archivo Live
API existe pero no está conectado. Cualquier cambio de estrategia de caché
debe considerarse decisión transversal y actualizar
[data-flow.md](data-flow.md) y
[data-fetching.md](../engineering/data-fetching.md).

### Tipos CMS manuales

No hay TypeGen configurado en `sanity.cli.ts` ni archivo generado. Los
contratos en `sanity/lib/types` son la estrategia actual, con riesgo de
desalineación que debe comprobarse manualmente.

### SEO centralizado

`SEO_CONFIG` y `createPageMetadata` son el patrón predominante; el detalle de
proyecto añade metadata dinámica y `sitemap.ts` añade slugs de Sanity. Los
helpers normalizan canonical e imágenes sociales como URLs absolutas. La
indexación exige flag, build de producción, dominio final y deployment de
producción.

## Decisiones específicas de feature

- Portfolio trata la primera sección de contenido como introducción/origen y
  numera el resto en UI. Esto depende de orden editorial, no es un patrón
  global de Portable Text.
- Services usa catálogos locales tipados y mapas de acento. No implica que todo
  contenido de marketing deba codificarse.
- Wiki usa la API oficial, modelos propios y React para portada, navegación,
  índices, metadata, estados y contenido. Enhanced Markdown se transforma y
  sanitiza antes de renderizarse.
- Wiki usa slugs editoriales como URL pública; los IDs quedan en servidor para
  relaciones y redirects legacy. Sus fallbacks SEO se resuelven en los
  mappers.
- Sanity Studio está embebido en `/studio`. No hay decisión implementada de
  migrarlo a un Studio separado.

## Inconsistencias conocidas

| Área                        | Evidencia                                                       | Impacto                           |
| --------------------------- | --------------------------------------------------------------- | --------------------------------- |
| Tokens oscuros              | uso frecuente de `ink-950`, no definido en `tailwind.config.ts` | La utilidad puede no generarse    |
| Colores semánticos          | Services mezcla `foreground/background` con `ink/main`          | Dos vocabularios visuales         |
| Live API                    | `sanity/lib/live.ts` sin consumidor                             | Código preparado pero inactivo    |
| TypeGen                     | queries manuales y CLI sin `typegen`                            | Drift entre schema/query/tipo     |
| Query de experiencia        | tipo incluye `displayOrder`, query no                           | Contrato manual desalineado       |
| Query de proyecto           | `technologies` repetido                                         | Ruido de mantenimiento            |
| Componentes cliente amplios | ProjectCard y detalle sin estado propio                         | Más JS de cliente del necesario   |
| README                      | sigue plantilla de Next y referencia `app/page.tsx`             | No es fuente confiable            |
| Estados de ruta             | Wiki tiene estados locales; otras features no                   | Estrategia todavía no transversal |
| CSS 404                     | animaciones infinitas sin media query de reducción              | Excepción a política de motion    |

Estas observaciones no autorizan arreglos fuera del alcance. Si una tarea las
resuelve, debe hacerlo explícitamente y actualizar esta tabla.

## No comprobado

- No hay tests que demuestren contratos de UI o datos.
- No hay configuración de CI visible en el repositorio.
- No hay evidencia de analítica, monitorización, preview/draft mode o Visual
  Editing.
- Portfolio y Services no tienen todavía JSON-LD específico; Wiki sí publica
  `CollectionPage`, `TechArticle` y `BreadcrumbList`.
- El sitemap incluye únicamente notebooks y notas que superaron los filtros
  públicos en servidor.
- El repositorio no fija versiones de runtime; no asumir una versión mínima de
  Node por la versión instalada localmente.

## Propuestas futuras

El contrato vigente de la Wiki está documentado en
[features/wiki.md](../features/wiki.md).
