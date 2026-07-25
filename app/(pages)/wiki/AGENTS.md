# Reglas de la Wiki

Estas instrucciones aplican a `app/(pages)/wiki` y a las integraciones de
Notion utilizadas por esta feature.

Antes de modificar la Wiki, lee:

- `docs/features/wiki.md`
- `docs/architecture/data-flow.md`
- `docs/architecture/decisions.md`
- `docs/design-system/foundations.md`
- `docs/design-system/layout.md`
- `docs/design-system/colors.md`
- `docs/design-system/typography.md`
- `docs/design-system/components.md`
- `docs/design-system/responsive.md`
- `docs/design-system/accessibility.md`
- `docs/design-system/motion.md`
- `docs/engineering/components.md`
- `docs/engineering/data-fetching.md`
- `docs/engineering/styling.md`
- `docs/engineering/seo.md`
- `docs/engineering/typescript.md`

La documentación puede describir todavía la integración anterior. El código
vigente es la evidencia del estado actual, mientras que las decisiones
explícitas de la tarea definen el estado objetivo. Actualiza la documentación
cuando la arquitectura cambie realmente.

## Dirección arquitectónica adoptada

La Wiki debe utilizar Notion como CMS headless mediante la API oficial.

La separación de responsabilidades es:

- Notion administra contenido, propiedades y relaciones.
- El servidor consulta, filtra, valida y transforma los datos.
- Los modelos propios representan únicamente contenido público.
- React y los componentes del portfolio controlan toda la interfaz.
- El HTML principal debe renderizarse desde el servidor.

La arquitectura vigente:

- usa `@notionhq/client`;
- utiliza una integración interna de solo lectura;
- mantén todas las credenciales en servidor;
- consulta las data sources originales;
- transforma respuestas externas en modelos públicos mínimos;
- renderiza Enhanced Markdown con React, parsing y sanitización explícitos.

No reintroduzcas `react-notion-x`, `notion-client`, `notion-types`,
`notion-utils`, `NotionRenderer`, `ExtendedRecordMap` ni estilos `.notion-*`.

No reemplaces Notion por Sanity ni por otro CMS.

## Acceso a Notion

- Nunca escribas mediante la API.
- No modifiques contenido, propiedades, vistas o permisos desde el repositorio.
- Nunca imprimas ni registres el token de Notion.
- No conviertas variables privadas en `NEXT_PUBLIC_*`.
- No serialices respuestas crudas del SDK hacia Client Components.
- Comparte con la integración únicamente las fuentes necesarias.
- Solicita únicamente capacidades de lectura.

Cuando falte acceso, una fuente, un ID o una propiedad esencial:

- no inventes valores;
- no construyas mappers ficticios;
- indica exactamente qué falta;
- identifica qué fuente debe compartirse;
- indica qué variable de entorno debe configurarse;
- no solicites que el token sea pegado en código, documentación o chat.

Los IDs descubiertos deben almacenarse como configuración de servidor y
documentarse en `.env.example` mediante placeholders.

## Publicación y seguridad

Un ID, slug o URL parseable no constituye autorización.

La capa servidor debe comprobar las reglas públicas reales antes de devolver
contenido.

La intención editorial actual es:

Notebooks:

- `Publicada === true`
- `Archive !== true`
- `Slug` estable y válido

Notas:

- `Estado !== "Borrador"`
- `Archive !== true`
- `Slug` estable y válido
- relación válida con el notebook solicitado

Topics:

- utiliza únicamente reglas confirmadas mediante el schema real.

Confirma nombres, IDs y tipos de propiedades mediante la API oficial. No
dependas de posiciones arbitrarias ni de nombres asumidos.

No permitas:

- abrir una página arbitraria por conocer su ID;
- mostrar notas pertenecientes a otro notebook;
- enviar borradores o contenido archivado al navegador;
- incluir contenido privado en metadata o sitemap;
- usar CSS como control de acceso;
- filtrar contenido administrativo únicamente en cliente.

Usa `notFound()` para contenido inexistente, privado, archivado, en borrador o
relacionado incorrectamente.

## Datos

Mantén el acceso a Notion en módulos `server-only`.

Separa:

- cliente;
- configuración;
- queries;
- paginación;
- reintentos;
- caché;
- mappers;
- modelos de dominio;
- contenido de las notas.

No pases respuestas del SDK directamente a la UI.

Centraliza el contrato de propiedades de Notion. Los mappers deben:

- comprobar tipos;
- manejar nullability;
- devolver modelos públicos mínimos;
- evitar assertions inseguras;
- producir errores comprensibles ante un schema incompatible;
- excluir propiedades administrativas.

Implementa paginación reusable y manejo limitado de respuestas `429`,
respetando `Retry-After`.

Evita una petición a Notion por visitante. Usa una estrategia de caché
compatible con la configuración real de Next.js y documenta la decisión.

## Contenido editorial

Obtén el cuerpo de las notas mediante la API oficial de Notion, utilizando
Enhanced Markdown cuando esté disponible y sea compatible con el SDK
instalado.

El renderer debe ser propio, seguro y limitado al contenido realmente usado.

No uses:

- `react-notion-x`;
- `NotionRenderer`;
- `dangerouslySetInnerHTML`;
- raw HTML sin transformación y sanitización deliberadas;
- un `iframe`;
- `token_v2`;
- cookies privadas de Notion.

Maneja explícitamente:

- contenido truncado;
- bloques desconocidos;
- bloques sin permiso;
- imágenes o archivos con URLs temporales;
- contenido no soportado.

No ignores silenciosamente contenido que no pudo representarse.

## UI

La Wiki debe sentirse como una sección nativa del portfolio:

- minimalista;
- editorial;
- técnica;
- clara;
- escaneable;
- responsive;
- accesible.

Antes de crear una pieza nueva:

1. revisa `app/components/common`;
2. revisa componentes análogos de Home, Portfolio, Services y Project Detail;
3. revisa las primitivas disponibles de HeroUI;
4. crea un componente específico solo cuando represente una responsabilidad
   nueva y real.

No crees wrappers locales que únicamente renombren una primitive existente.

Reutiliza:

- tokens `main`, `ink` y `brand`;
- tipografía documentada;
- bordes sutiles;
- superficies de baja opacidad;
- radios existentes;
- focus rings;
- patrones de metadata;
- navegación;
- microinteracciones suaves.

No introduzcas:

- otro design system;
- colores hexadecimales arbitrarios;
- una nueva librería de UI;
- estado global;
- glassmorphism excesivo;
- estética de dashboard SaaS;
- una réplica visual de Notion;
- componentes duplicados.

## Componentes y fronteras

Mantén Server Components como predeterminados.

Aísla en Client Components mínimos:

- búsqueda local;
- filtros;
- controles colapsables;
- copiar código;
- cualquier interacción que necesite estado o APIs del navegador.

No conviertas una página completa en Client Component por conveniencia.

La UI pública debe utilizar modelos mínimos como notebooks, notas y topics, no
payloads completos de Notion.

## Rutas

Mantén la jerarquía pública bajo `/wiki`.

Las rutas deben distinguir claramente:

- portada;
- notebook;
- nota.

Notebooks y Notes disponen de `Slug` editorial validado. Úsalo como segmento
público y conserva los IDs únicamente para relaciones internas y redirects
legacy. No derives un slug del título ni publiques una entrada sin slug.

Las URLs legacy por ID deben redirigir permanentemente al slug canónico cuando
la entrada siga siendo pública. Si no existe canonical publicable, responde 404.

Los enlaces internos deben usar `Link` o anchors rastreables y permanecer
dentro del portfolio.

## SEO

La documentación pública debe ser renderizada en servidor y preparada para
indexación.

Implementa para contenido público:

- title único;
- description específica;
- canonical;
- Open Graph;
- Twitter metadata;
- breadcrumbs;
- enlaces internos rastreables;
- fecha de modificación cuando exista un dato real;
- metadata dinámica;
- sitemap;
- JSON-LD cuando corresponda.

No inventes fechas de publicación.

Los fallbacks de title, description e imagen social viven en el mapper. Notes
hereda la imagen SEO de su notebook. Nunca uses como OG una URL firmada y
temporal de archivos de Notion.

El sitemap solo puede incluir notebooks y notas que hayan superado las reglas
de publicación en servidor.

No indexes:

- borradores;
- contenido archivado;
- filtros;
- búsquedas;
- query params duplicados;
- recursos privados;
- páginas inválidas.

Respeta el flag global de indexación y los helpers SEO existentes.

## Responsive y accesibilidad

Comprueba como mínimo:

- 320px;
- 375px;
- 640px;
- 768px;
- 1024px;
- 1280px;
- 1536px;
- zoom al 200%.

La FloatingNavbar no debe tapar el contenido.

No debe existir scroll horizontal global. Las tablas y bloques anchos deben
tener scroll interno controlado.

Implementa:

- un único `h1` por página;
- jerarquía correcta de headings;
- breadcrumbs semánticos;
- focus-visible;
- operación por teclado;
- alt contextual;
- contraste suficiente;
- targets táctiles adecuados;
- `prefers-reduced-motion`.

No añadas ARIA redundante cuando el HTML nativo ya exprese la semántica.

## Estados

La Wiki debe manejar de forma propia:

- loading;
- error;
- not-found;
- fuente sin permisos;
- Notion no disponible;
- schema incompatible;
- notebook vacío;
- resultados vacíos;
- contenido desconocido;
- imagen o archivo no disponible.

No muestres al usuario:

- IDs internos;
- secretos;
- variables;
- payloads;
- stack traces;
- nombres técnicos de configuración.

## Validación

Ejecuta:

```bash
pnpm lint
pnpm exec tsc --noEmit
pnpm build
```

Ejecuta también:

```bash
pnpm exec prettier --check AGENTS.md docs 'app/(pages)/wiki'
git status --short
git diff --check
git diff
```

Realiza QA sobre:

- `/wiki`;
- notebook publicado;
- nota pública;
- recurso inexistente;
- borrador;
- archivado;
- relación de notebook incorrecta;
- navegación interna;
- breadcrumbs;
- contenido editorial;
- imágenes;
- código;
- tablas;
- sitemap;
- metadata;
- JSON-LD;
- teclado;
- reduced motion;
- responsive;
- convivencia con FloatingNavbar.

Separa los fallos de código de problemas provocados por variables, permisos,
red, Google Fonts, Sanity o Notion.

## Documentación

La migración headless cambia deliberadamente la arquitectura de la Wiki.

Actualiza cuando corresponda:

- este archivo;
- `AGENTS.md`;
- `docs/features/wiki.md`;
- `docs/architecture/overview.md`;
- `docs/architecture/directory-structure.md`;
- `docs/architecture/data-flow.md`;
- `docs/architecture/decisions.md`;
- `docs/design-system/layout.md`;
- `docs/engineering/data-fetching.md`;
- `docs/engineering/styling.md`;
- `docs/engineering/seo.md`;
- `docs/engineering/quality-checks.md`;
- `.env.example`.

No dejes la documentación describiendo `react-notion-x` como arquitectura
activa después de eliminarlo.

No hagas commit salvo solicitud explícita.
