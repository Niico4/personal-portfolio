# Accesibilidad

## Patrones confirmados

### Semántica

- Páginas usan `main`, secciones, headers, articles, navs, lists y footers.
- Listas de proyectos, skills, links y procesos usan `ul`/`ol`.
- Project Detail relaciona secciones con `aria-labelledby`.
- Metadata del proyecto usa `dl`, `dt` y `dd`.

### Navegación y foco

- FloatingNavbar tiene `aria-label`, links con label y `aria-current="page"`.
- Links/card custom aplican `focus-visible:ring-*`.
- `SocialChip` distingue links externos mediante HeroUI.
- La expansión de experiencia usa `aria-expanded`, `aria-controls` y un label
  que cambia según estado.

### Decoración y medios

- Separadores, glows, iconos redundantes y previews decorativos suelen usar
  `aria-hidden` o `alt=""`.
- El video declara controles, muted, label y figcaption accesible.
- El schema de proyecto exige texto alternativo para previews, aunque las cards
  actuales renderizan esa imagen con `alt=""` porque el texto adyacente ya
  identifica el proyecto.
- El root declara `lang="es"`.

### Movimiento

El sitio principal usa `MotionConfig reducedMotion="user"` y varias utilidades
`motion-reduce`. Consulta [motion.md](motion.md) para excepciones.

## Riesgos e inconsistencias

- No existe link de “saltar al contenido”.
- `LoaderGhost` y `BadgeShine` no reducen sus animaciones CSS.
- `BadgeShine` añade `cursor-pointer` aunque por sí mismo es un `<span>` no
  interactivo.
- Algunos links dependen de HeroUI/defaults para focus y no declaran un ring
  local; verificar visualmente.
- El cuerpo de una nota usa HTML semántico generado por el renderer Markdown;
  no hay auditoría automatizada.
- Wiki aporta breadcrumbs etiquetados, cards enlazadas completas, filtros con
  `aria-pressed`, búsqueda con label, foco visible y estados de ruta propios.
- Las propiedades administrativas se eliminan en servidor antes de cruzar a
  componentes visuales.
- No hay tooling de axe, Lighthouse o tests de teclado configurado.

Son observaciones, no autorización para cambios fuera de alcance.

## Reglas para agentes

- Conserva el elemento HTML correcto antes de añadir ARIA.
- Toda acción solo-icono necesita nombre accesible.
- Un decorativo no debe aparecer en el árbol accesible.
- No uses color como única señal; status chips combinan icono y texto.
- Mantén focus visible equivalente a hover.
- Para contenido colapsable, conserva relación control–panel y operación por
  teclado.
- Valida contraste cuando añadas opacidad.
- Respeta reduced motion en CSS y Framer Motion.
- Comprueba texto alternativo según contexto: descriptivo si aporta contenido,
  vacío si es redundante.
- Realiza prueba manual con teclado y zoom cuando cambie UI.
