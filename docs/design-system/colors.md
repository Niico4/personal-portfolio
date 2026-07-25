# Colores

## Tokens declarados

Fuente: `tailwind.config.ts`.

### Neutros

| Token     | Hex       |
| --------- | --------- |
| `main`    | `#080A0F` |
| `ink-50`  | `#EEEEEF` |
| `ink-100` | `#C9C9CC` |
| `ink-200` | `#AFAFB4` |
| `ink-300` | `#8B8B92` |
| `ink-400` | `#75757D` |
| `ink-500` | `#52525C` |
| `ink-600` | `#4B4B54` |
| `ink-700` | `#3A3A41` |
| `ink-800` | `#2D2D33` |
| `ink-900` | `#222227` |

### Marca

`brand-50` a `brand-900`:
`#EBF6FE`, `#C0E3FC`, `#A2D6FA`, `#77C3F8`, `#5DB8F6`,
`#34A6F4`, `#2F97DE`, `#2576AD`, `#1D5B86`, `#164666`.

HeroUI recibe la misma escala como `primary`; `primary.DEFAULT` es
`#34A6F4` y su foreground es `#222227`.

### Acentos

- Green 50–900: `#EAFAEE` a `#155422`, disponibilidad.
- Purple 50–900: `#F7EDFF` a `#491D6B`, CV y acentos.
- Yellow 50–900: `#FEF7EB` a `#654A19`, contacto.

Services también usa la escala `amber` estándar de Tailwind. Estados de
proyecto usan hex locales cyan, teal, amber y violeta en
`project-status-chip.tsx`.

## Roles predominantes

- Página: `bg-main`.
- Texto principal: `ink-50`/`ink-100`.
- Texto de cuerpo: `ink-200`.
- Metadata: `ink-300` a `ink-500`.
- Borde: `ink-800` o `ink-700`, a menudo con opacidad.
- Superficie: `main`, `ink-900` con opacidad o transparente.
- Acción/foco/enlace: `brand-300` a `brand-500`.
- Éxito/disponibilidad: `green`.

Las superficies secundarias incrementan contraste suavemente en hover; no
cambian a un panel opaco brillante. Ver `ProjectCard`, `SocialChip` y
`ProjectNavigationCard`.

## CSS variables

`app/globals.css` define:

- `--primary: #34a6f4`;
- `--scrollbar-track: #333333`;
- `--scrollbar-size: 6px`.

`loader-ghost.module.css` define variables locales rojas, blancas, azules y
negras para la ilustración; no son tokens globales.

## Inconsistencias

- `ink-950` se usa en navbar, cards y detalle, pero la escala termina en 900.
- Services usa semánticos de HeroUI (`foreground`, `background`) junto con
  `ink/main`.
- El 404 usa `white`, `black`, `cyan` y `purple` estándar.
- `BadgeShine` usa hex directos y `gray-800`.
- Status chips usan hex directos en vez de escalas configuradas.

No elimines estas diferencias como refactor incidental. Para código nuevo,
prefiere el vocabulario dominante `main`/`ink`/`brand` y registra cualquier
nuevo rol semántico.

## Opacidad

El sistema usa opacidades bajas para profundidad:

- fondos entre 2.5% y 25%;
- borders entre 8% y 70%, según jerarquía;
- glows entre 7% y 10%;
- texto secundario mediante escala `ink` o `foreground/50`.

Evita apilar varias opacidades sobre texto porque vuelve impredecible el
contraste.
