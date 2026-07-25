# Data fetching

## Sanity

### Cliente

`sanity/lib/client.ts` usa `createClient` con valores validados:

- project ID, dataset y API version públicos;
- token de lectura privado;
- CDN habilitado.

El token no debe importarse en Client Components ni cambiarse a una variable
`NEXT_PUBLIC_*`.

### Fetchers

Los componentes no llaman queries directamente. El patrón actual es:

```text
query en sanity/lib/queries
→ función get* en sanity/lib/fetchers
→ page/section servidor
```

Cada fetcher importa `server-only`. Mantén parámetros como variables GROQ; el
detalle usa `{ slug }`, no interpolación de strings.

### Caché

`getSanityFetchOptions()` devuelve `cache: 'no-store'` para todas las
consultas. Aunque el cliente tiene CDN, Next no conserva el resultado en su
Data Cache.

`sanity/lib/live.ts` no forma parte del flujo efectivo porque `SanityLive` no
se renderiza. Los tags comentados tampoco son configuración activa.

No mezcles `no-store`, Live API e ISR en una misma feature sin decidir una
estrategia y documentarla.

### Paralelismo y deduplicación

Project Detail usa `Promise.all` para proyecto + listado y `React.cache` para
reutilizar el fetch del proyecto entre metadata/render. Mantén llamadas
independientes en paralelo.

Home llama perfil una vez y distribuye sus campos. Projects Preview y Work
Experience hacen fetch dentro de sus secciones, lo que puede ejecutarse en el
árbol servidor. No hay un loader central global.

### Errores y ausencia

- Detalle de proyecto usa `notFound()` si no existe.
- Algunas secciones devuelven `null` si no hay datos.
- Portfolio devuelve `null` para lista vacía.
- No hay try/catch ni error boundaries específicos.

Conserva la semántica del análogo: un recurso de ruta ausente debe ser 404; una
sección opcional puede omitirse.

## Notion

`app/(pages)/wiki/lib/notion-client.ts` crea de forma perezosa el cliente
oficial con API `2026-03-11`, token privado, logs silenciados y dos reintentos
limitados. El SDK respeta `Retry-After` y usa backoff.

`wiki-data.ts` pagina `dataSources.query`, filtra publicación y relación en
servidor, transforma con mappers estrictos y conserva los resultados durante
300 segundos mediante `unstable_cache`; `React.cache` deduplica el render.

Cada flujo solicita únicamente las propiedades que consume mediante
`filter_properties`. `/wiki` no carga notas para calcular contadores; la página
de nota no construye un índice global y limita la lista auxiliar al notebook
actual. El sitemap mantiene una consulta mínima separada porque necesita todas
las rutas públicas, pero no descripciones, topics, SEO ni archivos.

Un segmento parseable que no aparece en ese universo devuelve `notFound()`
antes de solicitar `pages.retrieveMarkdown`. Las respuestas crudas del SDK no
cruzan a la UI.

## Transformación

Preferencias observadas:

- forma de dominio: proyección GROQ;
- fechas/duración: helpers puros en `app/utils`;
- URLs SEO: helpers server-only;
- slugs Notion: validación y fallbacks dentro de los mappers;
- IDs Notion: relaciones internas y resolución de URLs legacy dentro de la
  integración.

No transformes el mismo contrato de maneras diferentes en varios componentes.

## Variables y onboarding

Consulta [data-flow.md](../architecture/data-flow.md). Las configs Zod se
evalúan al importar. Nunca registres valores de entorno ni copies `.env` a la
documentación.

`.env.example` lista el token y los tres data source IDs como configuración
server-only con placeholders.

## Cambios en Sanity

Cuando una tarea modifique datos:

1. actualiza el schema y su validación;
2. actualiza todas las queries consumidoras;
3. actualiza los tipos manuales;
4. revisa nullability/empty states;
5. ejecuta lint, typecheck y build;
6. no edites documentos de Sanity como efecto colateral.
