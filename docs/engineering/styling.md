# Styling

## Herramientas

El patrón dominante es Tailwind CSS 3.4 en `className`, complementado por:

- tema HeroUI `custom-theme`;
- `app/globals.css` para base/utilidades globales;
- CSS Module exclusivo de LoaderGhost;
- estilos Tailwind locales del renderer Markdown de Wiki;
- estilos inline solo en la UI de Sanity Studio.

No agregues otra estrategia CSS sin necesidad explícita.

## Tailwind

`tailwind.config.ts` escanea `app`, paths históricos `pages/components` y el
tema HeroUI. Extiende colores, un keyframe y la animación shine.

Las clases condicionales se expresan mediante:

- templates;
- mapas estáticos de variantes;
- arrays + `.join(' ')`.

Las clases deben aparecer completas en el código para que el scanner las
detecte. No hagas interpolación dinámica de nombres de color.

## HeroUI

El tema `custom-theme` extiende dark y redefine `primary` con la escala brand.
El `<body>` activa `custom-theme`; `HeroUIProvider` vive en `(pages)`.

Wiki recibe `HeroUIProvider` y `MotionConfig` porque vive bajo `(pages)`. El 404
global queda fuera de ese subárbol aunque importa HeroUI.

HeroUI aporta estructura/comportamiento; Tailwind suele sobrescribir color,
borde, padding y layout.

## Global CSS

`app/globals.css` se limita a:

- directivas Tailwind;
- variables de scrollbar;
- estilo de scrollbar;
- utility `.link-underline`.

No muevas estilos específicos de feature a globals.

## Estilos de Wiki

La feature no tiene CSS global ni selectores `.notion-*`. Portada, cards,
filtros, estados y contenido se resuelven mediante componentes React y
utilidades Tailwind locales. Tablas y código contienen su propio overflow.

## CSS Module de LoaderGhost

`loader-ghost.module.css` encapsula una ilustración compleja con grid y
keyframes. No es precedente para componentes normales. Si se modifica, añade
fallback reduced-motion.

## Orden y legibilidad

Prettier ordena formato, no utilidades Tailwind. El repositorio usa tanto
strings compactos como bloques multilinea agrupados por intención. Mantén el
estilo del archivo y evita cambios masivos de orden.

## Anti-patrones

- hex nuevos cuando existe token;
- copiar `ink-950` sin resolver su ausencia;
- mezclar `foreground/background` y `ink/main` en un componente nuevo;
- estilos globales para corregir un solo componente;
- clases Tailwind construidas dinámicamente;
- `!important` fuera de adaptadores de terceros;
- refactor visual incidental;
- olvidar hover/focus/reduced-motion/responsive.
