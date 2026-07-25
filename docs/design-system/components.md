# Catálogo de componentes

## Componentes comunes

### `Heading`

Fuente: `app/components/common/heading.tsx`.

Renderiza `h1` o `h2` con Poetsen One. Reutilízalo para títulos de página y
sección del sitio principal. Acepta `className` para extensiones locales, como
el título de Project Detail.

### `SectionHeader`

Fuente: `app/components/common/section-header.tsx`.

Compone título h2 y descripción opcional. Es el encabezado predominante de
Home y Services. No lo uses cuando la sección necesita metadata o numeración
compleja; Project Detail tiene un encabezado local específico.

### `ProjectCard`

Fuente: `app/components/common/project-card.tsx`.

Card enlazada completa con preview 16:9, fallback, status, índice y estados de
hover/focus. Se reutiliza en Home y Portfolio. Requiere `Project` completo e
índice visual.

### Chips y badges

- `SkillChip`: wrapper estable sobre HeroUI Chip para tecnologías.
- `SocialChip`: variantes explícitas por canal, estados de foco y links
  externos.
- `BadgeShine`: badge decorativo animado para mensajes de disponibilidad o
  categoría.
- `ProjectStatusChip`: específico de Portfolio; el mapa tipado garantiza una
  variante por status.

No intercambies `BadgeShine`, `SkillChip` y `ProjectStatusChip`: expresan
semánticas distintas aunque compartan silueta.

### `PortableTextContent`

Renderer compartido de párrafos, listas, strong, em y link. Sanitiza la
apertura externa mediante `noopener noreferrer`. No incluye imágenes, code ni
headings porque el schema actual limita el Portable Text común.

### `LoaderGhost`

Ilustración CSS exclusiva del 404. No es un loader de datos general pese a su
nombre y no tiene manejo de reduced motion.

## Primitivas HeroUI

### Buttons

Se usa `Button` directamente para:

- acciones primarias con `color="primary"`;
- secundarias con `variant="bordered"` o `flat`;
- botones redondos de email;
- toggles `isIconOnly` en experiencia.

Los botones suelen tener icono Tabler de 17–20px y `radius="full"` en CTAs.
Links visuales simples usan `next/link` con clases propias.

### Cards

HeroUI Card se usa en Education, Footer y Services. Portfolio usa `<Link>` o
`<div>` estilizados como card. El patrón visual compartido es borde sutil,
superficie oscura y radio alto; no existe una única primitive Card local.

### Dividers

HeroUI Divider separa secciones de Home/Services con `ink-400/10`. Debe llevar
`aria-hidden` cuando es puramente decorativo.

## Componentes de layout

### `FloatingNavbar`

Shell interactivo, no una sección de página. La config de navegación vive en
`navbar.config.ts`; añade rutas ahí solo si deben aparecer en navegación
principal.

### `FooterCard`

Combina datos de perfil, links y estado de disponibilidad. Está en Home, no en
el layout compartido, por lo que “footer” describe su aspecto más que una
presencia global.

## Componentes específicos

- Portfolio: status, navegación y secciones numeradas.
- Services: `ServiceCard`, catálogo y proceso.
- Wiki: `NotebookCard`, `NoteExplorer`, `WikiBreadcrumbs`,
  `WikiMarkdownContent`, `WikiCodeBlock` y `WikiTableOfContents`; son locales
  porque dependen del dominio editorial o encapsulan comportamiento específico
  como búsqueda, copia de código y seguimiento de headings. Las fronteras
  cliente quedan limitadas a búsqueda/filtros, copia, tabla de contenidos,
  fallback de imágenes y el error boundary.
- Studio: `StudioWelcome`; usa Sanity UI, no HeroUI/Tailwind.

## Regla de reutilización

Antes de crear un componente:

1. Busca en `app/components/common`.
2. Busca un análogo en `app/**/components` y `sections`.
3. Decide si la semántica es transversal o de feature.
4. Mantén el nuevo componente junto a su primer consumidor hasta demostrar
   reutilización transversal.
5. No hagas que `common` dependa de una nueva feature; el acoplamiento actual
   de `ProjectCard` es una excepción conocida.
