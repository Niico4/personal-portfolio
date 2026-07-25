# SEO

## Configuración global

`app/config/seo.config.ts` concentra:

- nombre, aplicación, título y template;
- descripción;
- locale `es_CO` e idioma `es`;
- site URL validada;
- flag de indexación;
- imagen OG por defecto de 1200×630.

`app/layout.tsx` aplica metadata base, autores, robots, Open Graph y Twitter.
No renderices `<title>` o `<meta>` manualmente.

La indexación solo se habilita cuando `SEO_INDEXING_ENABLED` está activo,
`NODE_ENV` es `production`, el host final es `nicoo.dev` y, cuando Vercel
expone `VERCEL_ENV`, el deployment es `production`. Preview, desarrollo y
dominios alternos permanecen en `noindex`.

## Metadata por página

`createPageMetadata` es el patrón predominante. Genera:

- title relativo o absoluto;
- description;
- canonical;
- robots coherente con flag/noIndex;
- Open Graph;
- Twitter card.

Lo usan Home, Portfolio y Services.

Project Detail usa `generateMetadata`, obtiene el proyecto mediante fetch
cacheado y crea fallback de descripción/imagen. Si el proyecto no existe,
ejecuta `notFound()`.

Wiki root usa `createPageMetadata`. Notebook y nota usan `generateMetadata`
después de validar publicación, relación y canonical. Una entrada no publicable
termina en 404 sin exponer metadata editorial.

Los helpers emiten canonical e imágenes sociales absolutos. Los notebooks
consumen `SEO Title`, `SEO Description`, `SEO Image URL` y `SEO Image Alt`, con
fallbacks centralizados en el mapper. Las notas consumen sus campos SEO y
heredan la imagen social estable del notebook. Las URLs firmadas de archivos de
Notion no se usan como imagen OG.

Las rutas públicas de Wiki usan slugs. Una URL legacy por ID redirige
con HTTP 308 desde `proxy.ts` cuando la entrada conserva un canonical público;
el mismo proxy marca 404 antes del streaming para contenido inexistente o no
publicable.

## Sitemap y robots

`app/sitemap.ts`:

- devuelve vacío si indexación está desactivada;
- incluye `/`, `/portfolio` y `/services`;
- añade cada `/portfolio/[slug]`.

Incluye `/wiki`, notebooks y notas públicas. Si Notion falla, conserva las
rutas estáticas y proyectos para no derribar el sitemap completo.

`app/robots.ts` añade sitemap solo si indexación está habilitada. Cuando está
deshabilitada devuelve `disallow: '/'` y la metadata usa `noindex, nofollow`.

## Imágenes

Los OG estáticos viven en `public/seo`. El detalle usa la URL Sanity de preview
o el fallback. `next.config.ts` permite `cdn.sanity.io`.

Las imágenes sociales de Wiki viven en `public/seo/wiki` y sus nombres
coinciden con las URLs permanentes almacenadas en `SEO Image URL`. `Cover` no
participa en la cadena de fallback SEO. Cada nota reutiliza imagen y alt de su
notebook padre.

El schema de proyecto exige alt cuando hay imagen; `generateMetadata` usa ese
alt o uno derivado del título.

## Structured data

Wiki root y notebooks incluyen `CollectionPage`. Las notas incluyen
`TechArticle`; los tres niveles usan `BreadcrumbList` con Inicio, autor con URL,
canonical absoluto, `inLanguage` y fechas reales cuando existen. Las notas
heredan la imagen SEO estable del notebook.

## Reglas

- Usa `createPageMetadata` para nuevas páginas estáticas del sitio principal.
- Usa `generateMetadata` para contenido dinámico.
- Genera canonicals e imágenes sociales absolutos con los helpers SEO.
- No expongas contenido draft/privado en metadata.
- Si cambia el universo indexable, actualiza metadata, sitemap y robots juntos.
- No incluyas `/studio`.
- Para Wiki, define primero política de publicación y URL estable antes de
  añadir entradas al sitemap.
- Mantén OG 1200×630 y alt significativo.

## Validación manual

Con entorno de producción:

- inspecciona `<head>` por ruta;
- comprueba canonical absoluto;
- abre `/robots.txt` y `/sitemap.xml`;
- valida previews sociales;
- verifica comportamiento con `SEO_INDEXING_ENABLED=false` y `true`.
