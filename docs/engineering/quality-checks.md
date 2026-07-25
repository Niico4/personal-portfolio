# Quality checks

## Comandos disponibles

`package.json` define:

```bash
pnpm dev
pnpm build
pnpm start
pnpm lint
```

El lockfile vigente es de pnpm. No hay scripts `test`, `typecheck`, `format` ni
`typegen`.

Comprobaciones adicionales posibles con dependencias instaladas:

```bash
pnpm exec tsc --noEmit
pnpm exec prettier --check .
```

Para documentación:

```bash
pnpm exec prettier --check AGENTS.md docs app/\(pages\)/wiki/AGENTS.md
```

## Orden recomendado

1. `pnpm exec prettier --check` sobre archivos modificados.
2. `pnpm lint`.
3. `pnpm exec tsc --noEmit`.
4. `pnpm build` para cambios de rutas, datos, config, metadata o dependencias.
5. QA manual proporcional al cambio.

El build requiere las variables validadas por `app/config`. También puede
necesitar acceso a Google Fonts, Sanity y Notion según las rutas generadas.
Un fallo de entorno debe reportarse por separado de un fallo de código.

## QA manual

### UI

- móvil, tablet y desktop;
- teclado y focus visible;
- reduced motion;
- zoom 200%;
- imágenes, fallbacks y layout shift;
- estados vacíos y 404.

### Datos

- perfil, proyectos y experiencia con campos opcionales ausentes;
- detalle inexistente devuelve 404;
- orden de proyectos/experiencia;
- links externos y CV;
- Wiki root, notebook, nota, links internos, código, toggles y tablas.

### SEO

- title, description, canonical, robots, OG y Twitter;
- sitemap/robots con indexación on/off.

## Cobertura ausente

No se encontraron:

- suite de tests unitarios, integración o end-to-end;
- Vitest, Jest o Playwright;
- snapshots visuales;
- axe/Lighthouse automatizado;
- CI versionada;
- Markdown linter o link checker;
- Sanity TypeGen.

No inventes comandos de tests. Si una tarea añade tooling, debe hacerlo de
forma explícita y actualizar `package.json`, este documento y `AGENTS.md`.

## Git y alcance

Antes de entregar:

```bash
git status --short
git diff --check
git diff
```

El árbol puede contener cambios previos del usuario. No los reviertas ni los
incluyas como propios; compara el estado inicial con el final y separa
claramente tus archivos.

No hagas commit salvo solicitud explícita.
