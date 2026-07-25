# TypeScript

## Configuración efectiva

`tsconfig.json` configura:

- `strict: true`;
- `noEmit: true`;
- target ES2017 y libs DOM/esnext;
- resolución `bundler`;
- módulos ESNext;
- JSX `react-jsx`;
- `isolatedModules` y `forceConsistentCasingInFileNames`;
- `allowJs: true`;
- `skipLibCheck: true`;
- plugin Next;
- includes para tipos generados de Next.

`next.config.ts` activa `typedRoutes`. Para rutas dinámicas construidas como
string se usa `Route`, por ejemplo en `ProjectCard`.

## Alias

```text
@/*         → ./app/*
@/sanity/*  → ./sanity/*
```

El segundo alias es más específico y permite `@/sanity/lib/...`.

## Modelos de dominio

Los contratos de Sanity se escriben manualmente en `sanity/lib/types`:

- interfaces para entidades/objetos;
- union literal para `ProjectStatus`;
- `PortableTextBlock[] | null` para texto estructurado;
- `ImageType` compartido.

No hay `sanity.types.ts`, script TypeGen ni bloque `typegen` en
`sanity.cli.ts`. Por tanto:

- una query no queda verificada automáticamente contra un schema;
- los fetchers anotan manualmente varios retornos;
- cada cambio de schema debe revisar query y tipo.

Inconsistencia real: `WorkExperience.displayOrder` está en el tipo pero no en
la query. No uses el tipo manual como prueba única de que un campo llega.

## Tipos derivados

Patrones buenos:

- `NavItem` deriva de `NAV_ITEMS` con `as const`;
- `ProjectStatus` es union y el mapa de variantes usa
  `Record<ProjectStatus, ...>`;
- `ProjectNavigationItem` usa `Pick`;
- rutas y paths usan template literal types;
- config de entorno usa `z.infer`.

Prefiere derivar cuando existe una fuente estática única.

## `type` frente a `interface`

Ambos aparecen. Predomina:

- `interface` para objetos de dominio y varias props;
- `type` para unions, Picks y props locales.

No es consistente al 100%; no hagas una conversión masiva.

## Imports de tipos

Usa `import type` cuando el símbolo solo existe en tipos. ESLint no impone
explícitamente esta regla y hay imports históricos sin `type`; conserva
claridad en código nuevo.

## Nullability

Las queries usan `coalesce` para algunos arrays, pero muchos campos opcionales
son `null`. La UI comprueba disponibilidad antes de renderizar links, media,
highlights y navegación.

No uses non-null assertion salvo que una comprobación inmediata lo garantice.
El `highlights!` de la experiencia está protegido por `hasHighlights`, pero no
debe convertirse en patrón general.

## Validación

El repositorio no tiene script `typecheck`; el comando real es:

```bash
pnpm exec tsc --noEmit
```

El build de Next también comprueba TypeScript, pero no sustituye una pasada
rápida durante desarrollo.
