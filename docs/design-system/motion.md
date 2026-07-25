# Movimiento

## Infraestructura

`app/providers.tsx` envuelve el sitio principal con
`<MotionConfig reducedMotion="user">`. Este provider solo se aplica al subárbol
`app/(pages)`.

Framer Motion se usa en:

- `app/layout/navbar/navbar-item.tsx`: indicador activo compartido con
  `layoutId`, spring de stiffness 420 y damping 34.
- `job-experience-content.tsx`: `AnimatePresence` para altura/opacidad del
  contenido expandible, 200–300ms.

No hay un archivo central de variants.

## Transiciones CSS/Tailwind

Patrones predominantes:

- 200–300ms para color, borde y microdesplazamiento;
- 400–700ms para zoom de imágenes;
- `ease-out` para entradas/hover;
- elevación de 0.5–3px y escalas entre 1.025 y 1.05;
- shine de 2s lineal infinito en `BadgeShine`.

El movimiento comunica estado activo, foco, hover o expansión. No se observan
animaciones de entrada de página.

## Reducción de movimiento

Buenas prácticas confirmadas:

- `motion-reduce:transform-none` en navbar y cards;
- `motion-reduce:transition-none` en varias interacciones;
- `MotionConfig reducedMotion="user"` para Framer Motion.

Excepciones:

- `loader-ghost.module.css` tiene animaciones infinitas sin
  `prefers-reduced-motion`.
- `BadgeShine` no desactiva su keyframe.
- El 404 global no está bajo `MotionConfig` de `(pages)`.

Wiki está bajo `MotionConfig` y sus cards, enlaces y estados de carga incluyen
alternativas `motion-reduce`. El renderer Markdown no añade animaciones.

No copies esas excepciones. Una nueva animación debe conservar comprensión y
operación cuando el usuario solicita reducción.

## Elementos decorativos

Glows y fondos no deben capturar eventos. El root usa
`pointer-events-none`/`aria-hidden`; mantén ese patrón.

## Reglas

- Prefiere transform/opacity sobre propiedades que causen reflow, salvo
  expansión accesible de contenido.
- No ocultes información esencial solo mediante animación.
- Mantén el estado final visible con animaciones desactivadas.
- Añade `aria-expanded`/`aria-controls` a expansiones, como en experiencia.
- Reutiliza los tiempos observados antes de crear una curva o spring global.
