# Layout

## Shell global

`app/layout.tsx` fija:

- idioma `es`;
- `min-h-dvh`, fondo `main` y texto base `ink-200`;
- bloqueo de overflow horizontal;
- una capa decorativa fija no interactiva;
- contenido en `relative z-10`.

No añadas otra capa global de fondo dentro de una página salvo que la feature
requiera una superficie localizada.

## Contenedor principal

`app/(pages)/layout.tsx` usa:

```text
w-full px-5 py-24
lg:w-3/4
xl:w-3/5
2xl:w-2/5
```

Es un contenedor proporcional, no un `max-w-*` fijo. Home, Portfolio y Services
se diseñan dentro de él. El detalle de proyecto añade límites de lectura como
`max-w-[68ch]` y `max-w-2xl`.

El 404 es una excepción global con `max-w-6xl` y layout propio.

## Composición de páginas

### Home

`app/(pages)/(home)/page.tsx` compone secciones en columna, separadas por
`Divider`. Educación y tecnologías pasan a dos columnas desde `sm`.

### Portfolio

El listado usa una grid desde `md`: el primer proyecto ocupa dos columnas; un
último secundario impar también puede ocupar el ancho completo. La card
mantiene una franja lateral fija para número, status y acción.

El detalle usa:

- encabezado de una columna que pasa a contenido + rail de metadata en `lg`;
- ancho de lectura de 68 caracteres;
- secciones numeradas con indentación desde `sm`;
- navegación anterior/siguiente en dos columnas desde `md`.

### Services

Las cards secundarias pasan de columna a fila en `sm`. El proceso usa una
columna de número y otra de contenido desde `sm`; el CTA final pasa a fila en
`lg`.

### Wiki

`app/(pages)/wiki` usa el shell público y sus espaciados. La portada mantiene
cards en una columna y pasa a dos desde `md`. Para compensar el contenedor
proporcional sin cambiar el shell, las páginas Wiki se centran con un máximo de
62rem desde `xl` y 68rem desde `2xl`. Así el rail de una nota no comprime el
cuerpo editorial en 1280px.

Las notas conservan un cuerpo de lectura de hasta 76 caracteres. Tablas, código
e imágenes manejan su propio ancho y overflow dentro del renderer Markdown. La
tabla de contenidos ocupa un rail sticky desde `xl`; antes de ese breakpoint se
ofrece como disclosure compacto.

## FloatingNavbar

`app/layout/navbar/navbar.tsx` es:

- horizontal y fija abajo en móvil, respetando `safe-area-inset-bottom`;
- vertical y centrada al lado izquierdo desde `lg`;
- limitada a `100vw - 2rem`;
- elevada con `z-50`, blur y sombra.

El contenido del sitio deja `py-24`, suficiente para convivir con la barra
inferior. No posiciones CTAs críticos detrás de esa zona.

## Reglas

- Diseña mobile-first.
- Usa grid para relaciones bidimensionales y flex para secuencias simples.
- Mantén límites de lectura en contenido largo.
- No replique el contenedor de `(pages)` dentro de cada página.
- Verifica en anchos próximos a 640, 768, 1024, 1280 y 1536px.
- Cuando una feature vive fuera de `(pages)`, decide explícitamente qué shell y
  providers necesita; Wiki ya forma parte del subárbol público.
