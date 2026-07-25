# Responsive

## Estrategia

La aplicación es mobile-first y usa breakpoints estándar de Tailwind:

| Prefijo | Umbral estándar | Uso observado                                            |
| ------- | --------------- | -------------------------------------------------------- |
| `sm`    | 640px           | tipografía, dos columnas, padding y layouts horizontales |
| `md`    | 768px           | grid de Portfolio y ancho de CTA                         |
| `lg`    | 1024px          | navbar lateral, rails y layouts de contenido             |
| `xl`    | 1280px          | reducción proporcional del contenedor principal          |
| `2xl`   | 1536px          | contenedor principal al 40%                              |

Wiki usa los breakpoints estándar. Sus páginas se centran con 62rem desde `xl`
y 68rem desde `2xl`, compensando el contenedor proporcional sin cambiar el
resto del sitio. Este ancho preserva un cuerpo editorial cómodo junto al rail
de contenidos en 1280px.

## Patrones confirmados

- Stack en móvil → fila/grid desde `sm` o `lg`.
- Texto `text-xs/base` → un nivel mayor desde `sm`.
- Navbar inferior en móvil → lateral en `lg`.
- Imágenes con `aspect-*`, `fill`, `object-cover` y `sizes`.
- Acciones con texto oculto visualmente en móvil cuando el icono conserva
  label accesible.
- Navegación de proyectos oculta thumbnails en móvil.
- Tablas Wiki conservan ancho mínimo y scroll horizontal.
- La tabla de contenidos de Wiki es un disclosure antes de `xl` y un rail
  sticky con scroll propio desde `xl`.

## Contenido y overflow

El root bloquea `overflow-x-hidden`. No uses esto para esconder un layout roto:
las tablas de Wiki crean su propio scroll horizontal y
`overscroll-behavior-inline`.

Títulos largos usan `text-balance`, `break-normal`, `min-w-0` y límites en
caracteres. Cards usan grids con `minmax(0, 1fr)` para evitar overflow.

## Imágenes

`ProjectCard` declara `sizes="(min-width: 1024px) 42vw, 100vw"`.
`ProjectNavigationCard` usa 144px. El avatar y previews conservan aspecto y
crop por `object-cover`.

Cuando cambie un grid, actualiza también `sizes`; no basta con cambiar clases.

## Checklist

- 320–375px: sin scroll horizontal, navbar no tapa acciones.
- 640px: orden y lectura al pasar a dos columnas.
- 768px: cards anchas/impares de Portfolio.
- 1024px: navbar lateral y rails del detalle.
- 1280/1536px: el contenedor no queda demasiado estrecho para grids.
- Teclado y focus visible en todos los tamaños.
- Zoom de navegador al 200% sin pérdida de contenido.

No hay pruebas visuales automatizadas; esta verificación es manual.
