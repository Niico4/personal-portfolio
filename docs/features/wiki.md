# Wiki

## Propósito

La Wiki es la sección de documentación técnica del portfolio de Nicolás Garzón.

Su objetivo es publicar apuntes, conceptos, guías y referencias organizadas por
notebooks, notas y temas, manteniendo Notion como herramienta editorial y
utilizando el portfolio como única interfaz pública.

La Wiki debe sentirse como una parte nativa de `nicoo.dev`: minimalista,
editorial, técnica, clara, accesible y coherente con el lenguaje visual del
resto del sitio.

## Estado implementado

La Wiki utiliza una arquitectura headless con la API oficial de Notion. Notion
permanece como CMS privado y el portfolio controla el fetching, autorización,
modelos, rutas, HTML y presentación.

La implementación no depende de:

- `react-notion-x`;
- `notion-client`;
- `notion-types`;
- `notion-utils`;
- `ExtendedRecordMap`;
- `NotionRenderer`;
- selectores globales `.notion-*`;
- una página pública de Notion como interfaz visual;
- `iframe`;
- `token_v2`;
- cookies privadas de Notion.

No existe una segunda implementación activa.

## Dirección arquitectónica adoptada

```text
Notion privado
  → API oficial de Notion
  → queries, filtros y validación en servidor
  → modelos públicos propios
  → Server Components y componentes React
  → HTML público de nicoo.dev
```

### Responsabilidades

#### Notion

- Editar y organizar notebooks, notas y topics.
- Mantener propiedades editoriales y relaciones.
- Almacenar el cuerpo de las notas.
- Actuar como CMS privado.

#### Servidor

- Autenticarse mediante una integración interna de solo lectura.
- Consultar data sources.
- Aplicar reglas de publicación.
- Validar relaciones.
- Paginar resultados.
- Manejar rate limits y errores.
- Transformar respuestas externas en modelos propios.
- Resolver metadata, rutas y contenido.
- Evitar enviar datos privados o administrativos al navegador.
- Aplicar caché.

#### Dominio

La UI no debe consumir respuestas crudas del SDK.

Los datos se transforman en modelos públicos mínimos:

```ts
type WikiMedia = {
  url: string;
};

type WikiNotebook = {
  id: string;
  slug: string;
  title: string;
  description: string;
  cover: WikiMedia | null;
  noteCount: number | null;
  updatedAt: string | null;
  seo: {
    title: string;
    description: string;
    image: {
      url: string;
      alt: string;
      width: number;
      height: number;
    };
  };
};

type WikiNote = {
  id: string;
  slug: string;
  notebookId: string;
  title: string;
  description: string;
  level: 'Fundamentos' | 'Aplicación' | 'Profundización' | null;
  topics: WikiTopic[];
  createdAt: string;
  updatedAt: string;
  seo: {
    title: string;
    description: string;
  };
};

type WikiTopic = {
  id: string;
  name: string;
};
```

Las respuestas completas del SDK no cruzan este límite.

#### UI

- Shell del portfolio.
- Portada de Wiki.
- Cards de notebooks.
- Listados de notas.
- Búsqueda y filtros públicos.
- Breadcrumbs.
- Metadata editorial.
- Contenido de las notas.
- Loading, error, not-found y empty states.
- SEO e indexación.

## Fuentes de Notion

La integración debe trabajar con las fuentes originales de:

- Notebooks.
- Notes.
- Topics.

No debe depender de linked databases ni de vistas públicas auxiliares.

Los IDs reales deben descubrirse con la API oficial cuando el entorno tenga
acceso y almacenarse como configuración de servidor.

Variables utilizadas:

```env
NOTION_API_KEY=
NOTION_NOTEBOOKS_DATA_SOURCE_ID=
NOTION_NOTES_DATA_SOURCE_ID=
NOTION_TOPICS_DATA_SOURCE_ID=
```

`.env.example` debe contener placeholders, nunca valores reales.

La validación se integra con la configuración Zod existente. Los valores son
opcionales en el parse global para no derribar páginas ajenas y obligatorios al
entrar en la capa Wiki.

### Schema confirmado el 24 de julio de 2026

- Notebooks: `Name` title, `Slug`, `Description`, `SEO Title`,
  `SEO Description` y `SEO Image Alt` rich text, `SEO Image URL` URL, `Cover`
  files, `Notes` relation, `Edited` rollup, `Publicada` y `Archive` checkbox.
- Notes: `Name` title, `Slug`, `Description`, `SEO Title` y `SEO Description`
  rich text, `Estado` status, `Nivel` select, `Notebook` y `Topics` relation,
  `Orden` number, `Created`, `Edited`, `Última revisión`, `Attachments` y
  `Archive`.
- Topics: `Name` title, `Description` rich text, `Notes` relation, `Edited`
  rollup y `Publicada` checkbox.
- `Estado` ofrece `Borrador`, `En progreso` y `Listo`.
- `Nivel` ofrece `Fundamentos`, `Aplicación` y `Profundización`.
- Los slugs públicos deben usar lowercase kebab-case y ser únicos: globalmente
  para notebooks y dentro de cada notebook para notas.

## Acceso y permisos

La integración de Notion debe:

- tener únicamente permisos de lectura;
- recibir acceso explícito solo a las fuentes necesarias;
- mantener el token exclusivamente en servidor;
- no escribir, editar ni eliminar contenido;
- no modificar propiedades, vistas o permisos;
- no registrar el token ni respuestas completas;
- no exponer variables privadas mediante `NEXT_PUBLIC_*`.

Cuando falte una fuente, propiedad, ID o permiso:

- no inventar datos;
- no construir mappers ficticios;
- reportar exactamente qué falta;
- indicar qué fuente debe compartirse;
- indicar qué variable debe configurarse;
- detener la parte dependiente del acceso.

## Contrato editorial

Los nombres y tipos siguientes fueron confirmados mediante la API antes de
codificar los filtros.

### Notebooks públicos

La intención editorial actual es:

```text
Publicada = true
Archive != true
Slug no vacío y válido
```

### Notas públicas

La intención editorial actual es:

```text
Estado != Borrador
Archive != true
Slug no vacío y válido
Notebook contiene el notebook solicitado
```

### Topics públicos

El schema contiene `Publicada`; se exige `Publicada = true`.

## Reglas de seguridad

Un ID, slug o URL parseable no constituye autorización.

La aplicación debe impedir:

- abrir una página arbitraria por conocer su ID;
- mostrar notebooks no publicados;
- mostrar notas en borrador;
- mostrar contenido archivado;
- mostrar notas asociadas a otro notebook;
- serializar propiedades administrativas al cliente;
- incluir contenido privado en metadata o sitemap;
- usar CSS o filtros cliente como control de acceso.

Las páginas inexistentes o no publicables deben resolver mediante
`notFound()`.

Las rutas dinámicas deben resolverse desde las data sources públicas permitidas,
no mediante acceso directo a cualquier página de Notion.

## Consultas y transformación

La capa de datos debe separar:

- cliente oficial;
- configuración;
- nombres de propiedades;
- query de data sources;
- paginación;
- reintentos;
- caché;
- mappers;
- modelos públicos;
- contenido de notas.

Los nombres de propiedades de Notion no deben dispersarse por componentes o
pages.

Las consultas usan los IDs estables de las propiedades confirmadas para
aplicar `filter_properties` sin consultar el schema en runtime. La portada
solicita únicamente resúmenes de notebooks. La lista de un notebook solicita
solo sus notas, y una nota reutiliza esa lista para navegación y enlaces
internos del mismo notebook; no carga el índice global. El sitemap usa una
proyección mínima de slugs, relaciones y fechas.

Los mappers deben:

- comprobar el tipo de cada propiedad;
- manejar `null` y valores ausentes;
- evitar non-null assertions inseguras;
- producir modelos mínimos;
- excluir propiedades administrativas;
- fallar con mensajes claros ante un schema incompatible.

La paginación debe funcionar aunque una fuente supere el tamaño de una sola
respuesta.

## Caché y rate limiting

La Wiki no debe consultar Notion por cada visitante.

La estrategia debe:

- deduplicar llamadas dentro del mismo render;
- conservar resultados entre solicitudes;
- permitir actualizaciones en un tiempo razonable;
- evitar mezclar estrategias incompatibles;
- mantener el fetching en servidor.

La referencia inicial es una revalidación aproximada de cinco minutos, salvo
que la configuración real del proyecto justifique otra duración.

Las respuestas `429` deben:

- respetar `Retry-After` cuando exista;
- usar reintentos limitados;
- aplicar backoff;
- evitar bucles infinitos;
- diferenciar rate limit de configuración, permisos o recurso ausente.

## Contenido de las notas

El cuerpo de una nota debe obtenerse mediante la API oficial de Notion.

Cuando el SDK y la API lo permitan, se debe preferir Enhanced Markdown para
evitar reimplementar innecesariamente todo el árbol de bloques.

Enhanced Markdown no conserva siempre líneas vacías entre bloques hermanos. La
normalización debe operar sobre el MDAST de `remark-parse`, usando posiciones
del AST para restaurar límites entre párrafos y listas. No debe implementarse
un parser paralelo basado en `split`, regex o agrupación manual de líneas.

La implementación debe manejar explícitamente:

- markdown;
- contenido truncado;
- bloques desconocidos;
- bloques sin permiso;
- imágenes;
- archivos;
- enlaces internos;
- contenido no soportado.

No debe ignorarse silenciosamente contenido que no pudo representarse.

El renderer debe ser propio, seguro y limitado al subset de contenido realmente
utilizado.

Debe soportar, cuando existan en las notas:

- párrafos;
- headings;
- strong y emphasis;
- enlaces;
- listas ordenadas y desordenadas;
- checkboxes;
- blockquotes;
- callouts;
- toggles;
- código inline;
- bloques de código;
- tablas;
- imágenes;
- divisores;
- archivos o bookmarks con fallback;
- resaltados;
- enlaces internos de la Wiki.

No debe usarse `dangerouslySetInnerHTML` para insertar la respuesta completa de
Notion.

### Matriz de soporte editorial

El pipeline preserva los límites de los bloques en MDAST, transforma las
extensiones de Notion en HAST y sanitiza el resultado antes de entregarlo a
React. Los contenedores de Enhanced Markdown se delimitan con `parse5`; el
Markdown contenido se sigue interpretando con `remark-parse`, no con un parser
paralelo.

| Contenido                  | Representación pública                         | Estado             |
| -------------------------- | ---------------------------------------------- | ------------------ |
| Párrafos y headings        | HTML semántico con anchors estables            | Completo           |
| Strong, emphasis y links   | Nodos inline; enlaces internos resueltos       | Completo           |
| Código inline y bloques    | Código legible, highlight y copia no intrusiva | Completo           |
| Listas y tareas            | `ul`, `ol`, `li` y checkbox deshabilitado      | Completo           |
| Blockquotes y callouts     | `blockquote` y `aside` diferenciados           | Completo           |
| Toggles                    | `details` y `summary` nativos                  | Completo           |
| Tablas                     | `thead`, `tbody`, scopes y scroll local        | Completo           |
| Imágenes                   | `next/image`, ratio estable y caption por alt  | Completo           |
| Archivos y bookmarks       | Enlace seguro con texto fallback               | Completo           |
| Menciones de páginas       | Link interno cuando la nota pública existe     | Completo           |
| Menciones de usuario/fecha | Texto o `time` semántico, sin datos privados   | Fallback seguro    |
| Colores y resaltados       | Subset sobrio de tokens locales                | Parcial deliberado |
| Ecuaciones                 | Expresión textual legible, sin typesetting     | Fallback seguro    |
| Bloque desconocido         | Aviso editorial visible y no interactivo       | Fallback seguro    |

El contenido desconocido, truncado o no autorizado no se descarta
silenciosamente. La UI muestra un fallback sin serializar respuestas completas,
atributos administrativos ni datos privados.

## Imágenes y archivos

Las imágenes y archivos de Notion pueden usar URLs temporales.

La implementación no debe tratar una URL firmada como permanente.

La estrategia puede incluir, según el contenido real:

- revalidación;
- resolución de URL en servidor;
- proxy o redirect controlado;
- fallback local;
- URL externa estable;
- tratamiento específico para covers.

Debe utilizarse `next/image` cuando sea compatible.

Cada imagen debe tener:

- dimensiones o aspect ratio estable;
- `sizes` coherente con el layout;
- `object-cover` cuando corresponda;
- alt significativo si aporta contenido;
- `alt=""` si es decorativa;
- fallback ante ausencia o expiración.

No se deben descargar masivamente archivos a `public` sin una decisión
explícita.

## Rutas

La jerarquía pública debe vivir bajo `/wiki`.

Debe distinguir claramente:

- portada;
- notebook;
- nota.

Jerarquía implementada:

```text
/wiki
/wiki/[notebookSlug]
/wiki/[notebookSlug]/[noteSlug]
```

Los segmentos usan los slugs editoriales validados. Cada slug se resuelve
dentro del universo público permitido y la nota debe pertenecer al notebook de
la URL. Los IDs se conservan solo en servidor para relaciones, enlaces internos
y redirects legacy. `proxy.ts` valida las rutas dinámicas antes del streaming:
responde HTTP 308 al slug canónico para segmentos legacy de 32 hex y marca 404
cuando la entrada no pertenece al universo público.

No deben romperse URLs públicas sin redirects deliberados.

## Integración con el portfolio

La Wiki debe compartir de forma coherente:

- fondo global;
- providers necesarios;
- FloatingNavbar;
- MotionConfig;
- tipografía;
- tokens;
- safe areas;
- comportamiento responsive.

La ubicación esperada es:

```text
app/(pages)/wiki
```

Mover la ruta dentro del route group es válido cuando:

- conserva `/wiki`;
- no duplica layouts;
- mantiene Studio aislado;
- mueve también su `AGENTS.md`;
- actualiza la documentación;
- elimina rutas duplicadas.

La FloatingNavbar no debe rehacerse.

Agregar Wiki a la navegación principal debe hacerse únicamente mediante la
configuración existente y cuando la intención del sitio lo justifique.

## Dirección visual

La Wiki debe ser:

- minimalista;
- editorial;
- técnica;
- clara;
- escaneable;
- oscura;
- sobria;
- reconocible como documentación;
- coherente con `nicoo.dev`.

Debe reutilizar:

- DM Sans;
- Poetsen One cuando corresponda;
- tokens `main`, `ink` y `brand`;
- bordes sutiles;
- superficies de baja opacidad;
- radios existentes;
- focus rings;
- espaciado real del portfolio;
- microinteracciones suaves;
- primitives HeroUI cuando su semántica corresponda;
- componentes comunes existentes cuando su contrato sea compatible.

Debe evitar:

- otro design system;
- colores hexadecimales arbitrarios;
- `ink-950` mientras no exista como token;
- glassmorphism excesivo;
- sombras fuertes sin precedente;
- gradientes decorativos innecesarios;
- estética de dashboard SaaS;
- réplica visual de Notion;
- componentes duplicados;
- wrappers que solo renombren primitives existentes.

## Portada

`/wiki` debe incluir:

- un único `h1`;
- título “Wiki”;
- descripción editorial breve;
- notebooks públicos;
- acceso claro a las notas;
- empty state;
- jerarquía coherente con el portfolio.

Puede incluir, cuando los datos sean confiables:

- cantidad de notebooks;
- cantidad de notas públicas;
- notas recientes;
- topics;
- búsqueda;
- navegación editorial secundaria.

No debe llenarse con estadísticas decorativas.

### Cards de notebooks

Cada card puede mostrar:

- cover;
- título;
- descripción;
- cantidad de notas;
- topics;
- fecha de actualización;
- affordance discreto.

Deben:

- ser links semánticos completos;
- usar focus-visible;
- tener hover sutil;
- respetar reduced motion;
- mantener proporción estable;
- funcionar en una columna en mobile;
- evitar ancho excesivo en desktop;
- no mostrar propiedades administrativas.

## Página de notebook

Debe incluir:

- breadcrumbs;
- regreso a `/wiki`;
- cover controlado;
- título;
- descripción;
- metadata pública;
- listado propio de notas;
- filtros públicos;
- búsqueda cuando aporte valor;
- empty state.

No debe mostrar:

- `Publicada`;
- `Archive`;
- `Estado`;
- IDs;
- relaciones internas;
- schema;
- controles de Notion.

Filtros posibles:

- Todas.
- Fundamentos.
- Aplicación.
- Profundización.
- Topics.

Los filtros administrativos deben aplicarse en servidor.

La búsqueda y filtros interactivos deben vivir en el Client Component más
pequeño posible.

## Página de nota

Debe sentirse como documentación técnica editorial.

Debe incluir:

- breadcrumbs;
- notebook padre;
- un único `h1`;
- descripción;
- metadata pública;
- última actualización;
- nivel o topics;
- cuerpo de lectura;
- navegación anterior y siguiente cuando sea confiable;
- regreso al notebook.

Puede incluir tabla de contenidos propia cuando el documento la justifique. En
desktop se usa un rail sticky con sección activa; en mobile se ofrece un
disclosure accesible. Los IDs de headings se generan una sola vez desde el
mismo AST, son únicos y coinciden con los enlaces del índice.

El ancho de lectura debe mantenerse aproximadamente entre 68 y 80 caracteres.
Imágenes, tablas y código pueden superar ese ancho de forma controlada.

## Responsive

Debe verificarse como mínimo en:

- 320px;
- 375px;
- 640px;
- 768px;
- 1024px;
- 1280px;
- 1536px;
- zoom al 200%.

### Mobile

- sin scroll horizontal global;
- navbar inferior sin tapar contenido;
- espacio inferior seguro;
- cards a una columna;
- breadcrumbs adaptables;
- hero compacto;
- filtros con wrap o scroll interno accesible;
- tablas con scroll horizontal propio;
- targets táctiles adecuados.

### Desktop

- navbar lateral respetada;
- contenido visualmente centrado;
- cards equilibradas;
- cuerpo de lectura limitado;
- rails editoriales sin competir con la navegación;
- sin padding para componentes inexistentes.

No debe usarse `overflow-x-hidden` para ocultar un layout roto.

## Accesibilidad

La Wiki debe implementar:

- HTML semántico;
- un único `h1` por página;
- jerarquía correcta de headings;
- breadcrumbs dentro de `nav`;
- links para navegación;
- buttons para acciones;
- labels accesibles;
- focus-visible;
- contraste adecuado;
- alt contextual;
- operación por teclado;
- zoom al 200%;
- reduced motion;
- `aria-current` cuando corresponda;
- anchors de heading con offset correcto.

No debe añadirse ARIA redundante.

## SEO e indexación

La documentación pública debe renderizarse en servidor y estar preparada para
ser rastreada e indexada.

Debe implementarse SEO para:

- `/wiki`;
- cada notebook público;
- cada nota pública.

Cada página pública debe tener:

- title único;
- description específica;
- canonical;
- Open Graph;
- Twitter metadata;
- `h1` coherente;
- breadcrumbs;
- enlaces internos rastreables;
- metadata dinámica;
- fecha de modificación cuando exista un dato real;
- `notFound()` para contenido no publicable.

El sitemap debe incluir únicamente:

- root de Wiki;
- notebooks publicados;
- notas públicas.

No debe incluir:

- borradores;
- archivados;
- filtros;
- búsquedas;
- query params duplicados;
- recursos privados;
- URLs inválidas.

Debe respetarse `SEO_INDEXING_ENABLED`.

JSON-LD incluye, cuando hay datos reales:

- `CollectionPage` para Wiki y notebooks;
- `TechArticle` para notas;
- `BreadcrumbList` con Inicio para navegación;
- author como `Person` con URL;
- `dateModified`;
- `datePublished` solo si existe;
- image pública válida;
- canonical.

Los fallbacks de title, description e imagen se resuelven una sola vez en los
mappers. Las notas heredan la imagen SEO del notebook. Si `SEO Image URL` no
está disponible se usa el asset estático del sitio; una URL firmada y temporal
de Notion nunca se publica como OG.

Las imágenes sociales estáticas de notebooks viven en
`public/seo/wiki/{slug-de-imagen}.png`. `SEO Image URL` conserva la URL
editorial completa y es la fuente de verdad; `Cover` se reserva para la UI y no
se usa como fallback social.

No debe prometerse indexación garantizada.

Después del despliegue deben realizarse manualmente:

- validación de URLs;
- validación de resultados enriquecidos;
- envío de sitemap;
- inspección de URLs en Search Console;
- solicitud de indexación de páginas prioritarias.

## Estados y resiliencia

La Wiki debe manejar:

- loading;
- error;
- not-found;
- Notion no disponible;
- conexión sin permisos;
- schema incompatible;
- notebook vacío;
- búsqueda sin resultados;
- nota sin cover;
- nota sin descripción;
- bloque desconocido;
- imagen o archivo no disponible.

No debe mostrar:

- IDs internos;
- secretos;
- variables;
- payloads;
- stack traces;
- nombres técnicos de configuración.

Un fallo de Notion no debe derribar páginas ajenas a la Wiki.

## Rendimiento

- Server Components por defecto.
- Client Components mínimos.
- Queries filtradas en servidor.
- Caché.
- Paginación.
- Sin una petición a Notion por visitante.
- Sin respuestas crudas en cliente.
- Sin propiedades administrativas serializadas.
- Sin SPA completa.
- Sin dependencias pesadas injustificadas.
- Sin animaciones costosas.
- Sin layout shifts innecesarios.
- Sin consultas duplicadas entre metadata y render.

## Fuera de alcance

La migración no debe:

- modificar contenido de Notion;
- modificar schemas de Notion;
- modificar vistas o permisos;
- escribir mediante la API;
- reemplazar Notion por Sanity;
- rehacer la FloatingNavbar;
- refactorizar páginas ajenas;
- añadir una nueva librería de UI;
- añadir estado global;
- cambiar el design system;
- hacer commit.

## Historial de implementación

La migración se ejecutó en este orden:

1. Crear la integración interna de solo lectura.
2. Compartir Notebooks, Notes y Topics.
3. Instalar y configurar `@notionhq/client`.
4. Descubrir data sources y schema.
5. Añadir variables de entorno.
6. Crear cliente, paginación, retry y caché.
7. Crear modelos y mappers.
8. Implementar queries públicas.
9. Implementar `/wiki`.
10. Implementar notebook.
11. Implementar nota.
12. Implementar renderer editorial.
13. Implementar SEO y sitemap.
14. Implementar estados.
15. Verificar seguridad y relaciones.
16. Eliminar integración anterior.
17. Eliminar dependencias huérfanas.
18. Actualizar documentación.

No quedó más de una implementación activa.

## Criterios de aceptación

La implementación se considera completa cuando:

- Notion es privado y funciona como CMS headless.
- La API oficial es la única integración de lectura.
- La UI no depende de `react-notion-x`.
- `/wiki` muestra solo notebooks públicos.
- Cada notebook muestra solo sus notas públicas.
- Borradores y archivados responden 404.
- No se puede abrir contenido arbitrario por ID.
- El contenido principal se renderiza en servidor.
- La Wiki comparte shell y estilo con el portfolio.
- No existe scroll horizontal global.
- La FloatingNavbar no tapa contenido.
- Metadata, canonical, sitemap y JSON-LD usan solo contenido público.
- Lint, TypeScript y build pasan o los fallos externos quedan documentados.
- La documentación describe la arquitectura final real.

## Validación

Ejecutar:

```bash
pnpm lint
pnpm exec tsc --noEmit
pnpm build
```

Revisar:

```bash
pnpm exec prettier --check AGENTS.md docs 'app/(pages)/wiki'
git status --short
git diff --check
git diff
```

QA mínimo:

- `/wiki`;
- notebook publicado;
- nota pública;
- notebook no publicado;
- borrador;
- archivado;
- relación incorrecta;
- URL inválida;
- navegación root → notebook → nota;
- breadcrumbs;
- metadata;
- canonical;
- sitemap;
- JSON-LD;
- imágenes;
- código;
- tablas;
- listas;
- callouts;
- toggles;
- enlaces internos;
- búsqueda y filtros;
- empty states;
- teclado;
- focus visible;
- reduced motion;
- zoom al 200%;
- responsive;
- convivencia con FloatingNavbar.

## Limitaciones reales

- Las entradas públicas sin `Slug` válido quedan fuera de rutas, contadores y
  sitemap hasta completar el dato editorial en Notion.
- Mientras un notebook no tenga `SEO Image URL`, sus páginas y notas usan la
  imagen OG estática del sitio.
- Los archivos internos de Notion usan URLs firmadas. La caché de cinco minutos
  reduce el riesgo de expiración para imágenes visibles, pero esas URLs no se
  reutilizan en metadata social.
- Enhanced Markdown puede reportar contenido truncado o bloques desconocidos.
  La capa muestra un aviso discreto y no inventa contenido cuando no puede
  representarlos.
- Hay una comprobación enfocada con fixtures para los límites de listas del
  renderer, pero no una suite automatizada, axe, Lighthouse o snapshots
  visuales.

## Recomendaciones futuras

- Completar `Slug`, descripción y campos SEO en las entradas que todavía no los
  tengan para ampliar el universo indexable.
- Añadir imagen SEO propia a una nota solo si el contrato editorial requiere
  previews distintos a los del notebook.
- Considerar revalidación por webhook solo si se incorpora una infraestructura
  autenticada; la implementación actual usa revalidación temporal.
- Añadir pruebas de integración para filtros de publicación, relaciones,
  renderer y sitemap.

## Mantenimiento

Cuando cambie:

- una propiedad de Notion;
- una regla de publicación;
- una ruta;
- la estrategia de caché;
- la estrategia de imágenes;
- el renderer;
- la indexación;
- una decisión visual transversal;

deben actualizarse el código, este documento y los documentos arquitectónicos
relacionados en el mismo cambio.
