# Fundamentos visuales

## Fuente de verdad

El sistema visual no está empaquetado como librería. Surge de
`tailwind.config.ts`, `app/globals.css`, el tema HeroUI y los componentes
existentes. Antes de añadir un valor, comprueba si ya existe un token o una
composición análoga.

## Intención visual observada

El sitio usa una interfaz oscura, compacta y editorial:

- fondo casi negro (`main`) con una cuadrícula radial tenue;
- contenido primario en grises claros `ink`;
- azul `brand` como acción, foco y énfasis;
- superficies mayoritariamente transparentes o de baja opacidad;
- bordes finos que separan sin crear paneles pesados;
- radios generosos en cards y radios completos en acciones/chips;
- numeración monoespaciada y glows puntuales como decoración.

Evidencia: `app/layout.tsx`, `app/components/common/project-card.tsx`,
`app/layout/navbar/navbar.tsx` y
`app/(pages)/portfolio/[slug]/project-detail.tsx`.

## Tokens base

- Fondo principal: `main` = `#080A0F`.
- Marca: `brand-500` = `#34A6F4`.
- Texto/superficies: escalas `ink-50` a `ink-900`.
- Estados/acento: `green`, `purple` y `yellow` definidos como escalas.
- Breakpoints: defaults de Tailwind (`sm`, `md`, `lg`, `xl`, `2xl`); no hay
  breakpoints personalizados.
- Fuente de cuerpo: DM Sans.
- Fuente display: Poetsen One.
- Foco predominante: ring de 2px `brand-400` con offset sobre `main`.

Consulta [colors.md](colors.md) y [typography.md](typography.md) para valores.

## Espaciado y densidad

No hay una escala custom; se usan los incrementos de Tailwind. Patrones
repetidos:

- separación vertical entre bloques de página: `gap-6 sm:gap-7`;
- secciones internas: `gap-5` o `gap-10`;
- cards: padding entre `p-3` y `p-6`;
- contenido de página: `px-5 py-24`;
- detalle editorial: bloques `py-12 sm:py-16`;
- listas de chips: `gap-2` a `gap-3`.

La densidad es deliberadamente mayor en Home y cards, y más respirada en
Project Detail. No normalices ambos contextos a un único gap.

## Bordes, superficies y radios

Patrones confirmados:

- bordes de `ink-800`/`ink-700` con opacidad para estructura;
- fondos `bg-main`, `bg-ink-900/…` o `bg-ink-950/…`;
- cards grandes con `rounded-[1.5rem]` a `rounded-[1.75rem]`;
- elementos compactos con `rounded-lg`, `rounded-xl` o `rounded-full`;
- `backdrop-blur` en navbar, chips de estado y algunas cards;
- sombras fuertes casi exclusivas del navbar y 404.

`ink-950` se usa en varios componentes pero no existe en la escala declarada.
No lo copies a código nuevo hasta resolver esa inconsistencia.

## Decoración

- Cuadrícula global y máscara radial: `app/layout.tsx`.
- Glows difuminados: Services, 404 y cards de servicio.
- Shine animado: `BadgeShine` y keyframe `background-shine`.
- Líneas, rombos y gradientes: timeline de experiencia.

Los decorativos no transmiten contenido y deben llevar `aria-hidden` o ser
background CSS.

## Regla operativa

Para una nueva pieza:

1. Reutiliza un componente existente.
2. Si no aplica, copia la intención de una pieza análoga de la misma densidad.
3. Usa tokens configurados antes que hex arbitrarios.
4. Mantén estados de hover, focus y reducción de movimiento.
5. Documenta cualquier token nuevo transversal.
