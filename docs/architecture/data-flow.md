# Flujo de datos

## Sanity: flujo efectivo

```text
Sanity Studio
  → schemaTypes + validaciones
  → documentos publicados
  → consultas GROQ con proyección/renombre
  → fetchers server-only con cache: no-store
  → Server Components de página/sección
  → props tipadas hacia componentes cliente cuando aplica
```

### Modelo editorial

`sanity/schemaTypes` define `profile`, `project`, `workExperience` y el objeto
`portableText`. Las validaciones editoriales exigen, entre otros:

- un singleton de perfil controlado por
  `sanity/studio-content-structure.ts` y `sanity.config.ts`;
- slug, status, preview, detalle y orden para proyectos;
- imagen y URL pública según status del proyecto;
- al menos una posición por experiencia;
- fechas coherentes y valores únicos donde aplica.

El singleton usa el ID explícito `profile`; este es un caso confirmado y
acotado, no una política para otros documentos.

### Queries y transformación

Las queries viven en `sanity/lib/queries` y:

- filtran primero por `_type`;
- proyectan campos concretos;
- convierten `_id`/`_key` a `id`;
- aplanan `slug.current`;
- construyen objetos de UI como `preview`, `detail`, `contact` y `overview`;
- usan `coalesce` para arrays de proyectos;
- ordenan proyectos y experiencias por `displayOrder`.

La forma proyectada se representa manualmente en `sanity/lib/types`. Si cambia
un schema o una proyección, revisa los tres puntos: schema, query y tipo.

Inconsistencias comprobadas:

- `PROJECT_FIELDS` proyecta `technologies` dos veces.
- `WorkExperience` declara `displayOrder`, pero
  `WORK_EXPERIENCE_QUERY` no lo proyecta.
- Las queries usan el tag `groq`; no usan `defineQuery` ni TypeGen.

### Fetch y caché

`sanity/lib/client.ts` crea un cliente con proyecto, dataset, versión y token
validados. Tiene `useCdn: true`.

Todos los fetchers efectivos llaman `client.fetch` con
`getSanityFetchOptions()`, que devuelve `{ cache: 'no-store' }`. Por tanto, el
patrón actual prioriza frescura por request y no usa ISR ni tags de
revalidación.

`sanity/lib/live.ts` exporta `sanityFetch` y `SanityLive`, pero ninguna ruta
importa o renderiza `SanityLive`. No documentar Live Content como activo.
Tampoco hay rutas de webhook ni `revalidateTag`.

En el detalle de proyecto, `React.cache(getProject)` deduplica lecturas del
mismo slug entre `generateMetadata` y render dentro del ciclo compatible de
React. `generateStaticParams` obtiene todos los slugs, pero el fetch sigue
configurado como `no-store`.

### Consumo

- Home obtiene perfil, proyectos y experiencia desde componentes servidor.
- Portfolio obtiene lista, slugs y detalle desde fetchers.
- Services solo obtiene el email desde el perfil; el catálogo de servicios y
  proceso está codificado localmente.
- `PortableTextContent` transforma Portable Text en párrafos, listas y marcas.

No llames al cliente Sanity desde un Client Component. Añade o extiende un
fetcher server-only y pasa únicamente los datos necesarios.

## Notion: Wiki

```text
NOTION_API_KEY + data_source_id privados
  → @notionhq/client server-only, API 2026-03-11
  → dataSources.query con paginación, filtros y retry limitado
  → mappers validados y modelos públicos mínimos
  → unstable_cache (300 s) + React.cache
  → Server Components y Client Component mínimo de filtros
  → pages.retrieveMarkdown
  → MDAST + corrección de límites de bloque de Notion
  → React Markdown + GFM + transformación HAST + sanitización
```

Enhanced Markdown representa cada bloque de Notion en una línea, pero no
conserva líneas vacías entre todos los párrafos y listas. Wiki normaliza esos
límites sobre el MDAST producido por `remark-parse`; no agrupa bloques mediante
un parser manual de líneas o expresiones regulares. Esto conserva como nodos
independientes los párrafos ubicados entre listas.

`app/(pages)/wiki/lib/wiki-data.ts` aplica `Publicada === true` y
`Archive !== true` a notebooks, `Estado !== "Borrador"` y `Archive !== true` a
notas, y `Publicada === true` a topics. La consulta de un notebook añade el
filtro de relación en Notion.

Notebooks, Notes, Topics y el sitemap usan `filter_properties` con los IDs
estables confirmados del schema. La portada obtiene únicamente notebooks; un
notebook obtiene sus notas y topics públicos; una nota reutiliza ese subconjunto
para navegación y enlaces internos, y solicita Enhanced Markdown solo para la
entrada abierta. El sitemap usa una proyección propia limitada a IDs de
relación, slugs y fechas.

Los segmentos dinámicos usan `Slug` validado en Notion. Los IDs permanecen
server-only para relaciones, resolución de enlaces internos de Enhanced
Markdown y compatibilidad legacy. Un slug o ID legacy se resuelve primero
dentro del universo público y de la relación solicitada; una URL por ID
redirige permanentemente a su slug canónico desde `proxy.ts`. El proxy también
marca 404 antes del streaming para slugs inexistentes o no publicables. Solo
después se obtiene el cuerpo con `pages.retrieveMarkdown`.

## Variables de entorno

| Variable                          | Visibilidad | Consumidor                |
| --------------------------------- | ----------- | ------------------------- |
| `NEXT_PUBLIC_SITE_URL`            | pública     | URLs y metadata           |
| `NEXT_PUBLIC_SANITY_PROJECT_ID`   | pública     | cliente/Studio            |
| `NEXT_PUBLIC_SANITY_DATASET`      | pública     | cliente/Studio            |
| `NEXT_PUBLIC_SANITY_API_VERSION`  | pública     | cliente y Vision          |
| `SANITY_API_READ_TOKEN`           | servidor    | cliente Sanity            |
| `SEO_INDEXING_ENABLED`            | servidor    | metadata, sitemap, robots |
| `NOTION_API_KEY`                  | servidor    | Cliente oficial de Wiki   |
| `NOTION_NOTEBOOKS_DATA_SOURCE_ID` | servidor    | Notebooks de Wiki         |
| `NOTION_NOTES_DATA_SOURCE_ID`     | servidor    | Notes de Wiki             |
| `NOTION_TOPICS_DATA_SOURCE_ID`    | servidor    | Topics de Wiki            |

`server-env.config.ts` mantiene la configuración de Wiki opcional en el parse
global para que una mala configuración de Notion no derribe páginas ajenas. La
capa Wiki exige los cuatro valores al usarse. `.env.example` documenta
placeholders exclusivos de servidor.

## Helpers puros

Las transformaciones que no requieren UI viven en `app/utils`:

- `formatMonthYear`, `getDateRange` y `calculateDuration`;
- `getAbsoluteUrl` para canonicals;
- `getInternalAssetUrl` para assets locales servidos desde el entorno actual;
- `createPageMetadata`.

Mantén estas funciones sin estado y sin acceso al cliente. La transformación
de campos editoriales debe preferirse en la proyección GROQ cuando define el
contrato consumido por varias vistas.
