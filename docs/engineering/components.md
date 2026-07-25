# Composición de componentes

## Server-first

Las pages obtienen datos y componen secciones en servidor. Ejemplos:

- Home obtiene `getProfile` y pasa subconjuntos a Hero, Education, Skills y
  Footer.
- Projects Preview y Work Experience obtienen sus propios listados en
  secciones servidor.
- Portfolio Detail obtiene proyecto/lista y pasa objetos a la vista.

Mantén los tokens, clientes y acceso a entorno privado fuera de Client
Components.

## Cuándo crear una section

Crea una section cuando represente una región semántica grande de una página,
con encabezado/contenido y posiblemente fetch propio. Colócala bajo la página:

```text
app/(pages)/feature/
├── page.tsx
└── sections/
    └── example-section.tsx
```

No uses `sections` como carpeta genérica para pequeñas primitives.

## Cuándo crear un componente de feature

Coloca en `feature/components` una unidad que:

- se repite dentro de la feature;
- encapsula un mapa de variantes propio;
- conoce tipos o URLs de esa feature.

Portfolio Navigation, Project Status y Service Card siguen este patrón.

## Cuándo usar `common`

Antes de promover:

- debe tener semántica estable más allá de una sola vista;
- no debe necesitar imports de una feature;
- debe tener una API más clara que copiar dos clases.

`ProjectCard` es reutilizado entre Home y Portfolio, pero su import de
`ProjectStatusChip` es una excepción de dependencia. No amplíes esa dirección.

## Frontera cliente

Añade `'use client'` al archivo más pequeño que necesita:

- hooks de React/Next;
- event handlers;
- estado;
- Framer Motion interactivo;
- una integración explícitamente cliente.

Props deben ser serializables. Wiki entrega previews mínimos al filtro cliente;
el renderer Markdown y los modelos completos permanecen en Server Components.
Los objetos Sanity simples se entregan a cards/detalle.

`ProjectCard`, `ProjectNavigationCard` y `ProjectDetailSection` están marcados
cliente sin estado local evidente. Documentarlo no obliga a repetirlo ni a
refactorizarlo incidentalmente.

## Variantes

El repositorio usa objetos tipados de clases en vez de una librería CVA:

- `SOCIAL_CHIP_VARIANTS`;
- `PROJECT_STATUS_VARIANTS`;
- `ACCENT_STYLES`;
- `NAVIGATION_CONTENT`.

Mantén clases completas y estáticas para que Tailwind las detecte. No construyas
tokens como `text-${color}-500`. No hay `clsx`/`tailwind-merge`; se usan
templates o arrays con `.join(' ')`.

## Contenido estructurado

Usa `PortableTextContent` para datos Sanity compatibles. No renderices Portable
Text manualmente ni uses `dangerouslySetInnerHTML`.

La Wiki usa `WikiMarkdownContent`, no `PortableTextContent`. Son contratos y
modelos distintos.

## Checklist

- Semántica HTML correcta.
- Reutilización verificada.
- Ubicación por alcance.
- Frontera cliente mínima.
- Tipos de props derivados del dominio cuando existen.
- Empty state o early return deliberado.
- Hover, focus, reduced motion y responsive.
- Ningún acceso a secretos en cliente.
