# Forma de trabajar y estilo de implementación

Debes implementar esta tarea como si el código hubiera sido escrito por el
autor actual del repositorio.

No basta con que la solución funcione. Debe integrarse naturalmente con la
forma en que el proyecto ya está organizado, tipado, estilizado y mantenido.

La prioridad es producir código simple, legible, explícito y fácil de modificar.

## Fuente de verdad

Antes de escribir código:

1. Lee el `AGENTS.md` raíz.
2. Lee el `AGENTS.md` más cercano a la feature.
3. Lee la documentación enlazada desde ambos archivos.
4. Inspecciona el código existente anterior a la feature que vas a modificar.
5. Busca implementaciones análogas reales dentro del repositorio.
6. Identifica cómo el autor organiza:
   - pages;
   - sections;
   - components;
   - helpers;
   - types;
   - configs;
   - fetchers;
   - estilos;
   - variantes;
   - imports;
   - exports;
   - nombres;
   - estados;
   - responsive;
   - accesibilidad.

El código existente es la evidencia principal.

No impongas tu estilo personal ni las convenciones genéricas que utilizarías en
otro proyecto.

## Principio principal

La solución correcta es la más simple que:

- resuelve completamente el problema;
- mantiene buena legibilidad;
- respeta la arquitectura existente;
- evita duplicación real;
- puede modificarse fácilmente más adelante;
- no introduce complejidad sin un beneficio claro.

No confundas una solución más abstracta con una solución mejor.

La complejidad innecesaria perjudica el mantenimiento.

## Reutilización obligatoria

Antes de crear cualquier archivo, componente, helper, hook, tipo, constante o
abstracción nueva:

1. Busca si ya existe una implementación equivalente.
2. Busca en `app/components/common`.
3. Busca dentro de la misma feature.
4. Busca un patrón análogo en Home, Portfolio, Services o Project Detail.
5. Revisa las primitives ya instaladas, especialmente HeroUI.
6. Comprueba si el problema se resuelve extendiendo una API existente.
7. Crea algo nuevo únicamente cuando tenga una responsabilidad distinta y
   necesaria.

No crees una segunda implementación para algo que el repositorio ya resuelve.

Ejemplos que debes evitar:

- crear otro componente de heading cuando ya existe `Heading`;
- crear otro section header cuando ya existe `SectionHeader`;
- crear un botón visual propio cuando HeroUI `Button` resuelve el caso;
- crear un input desde cero cuando HeroUI `Input` cubre la interacción;
- crear un chip local cuando HeroUI `Chip` o un chip existente representa la
  misma semántica;
- crear un helper que solo envuelve una función existente;
- crear un wrapper que únicamente renombra una primitive;
- duplicar mapas de variantes;
- duplicar lógica de URLs, fechas, metadata o entorno;
- crear componentes distintos que solo cambian dos clases.

Reutilizar no significa forzar un componente cuyo contrato no corresponde.
Cuando la semántica sea diferente, crea una solución local y pequeña.

## Simplicidad

Prefiere:

- funciones pequeñas;
- nombres explícitos;
- condiciones fáciles de seguir;
- early returns;
- objetos estáticos fuera del render;
- composición directa;
- tipos cercanos al dominio;
- helpers puros cuando realmente transforman datos;
- componentes con una responsabilidad clara;
- props mínimas;
- Server Components por defecto;
- Client Components en la frontera mínima;
- clases completas y fáciles de leer;
- configuración centralizada solo cuando se comparte realmente.

Evita:

- sobrearquitectura;
- capas innecesarias;
- factories sin necesidad;
- builders innecesarios;
- adapters que no adaptan nada;
- repositories genéricos para una única consulta;
- hooks que solo devuelven una variable;
- componentes que solo renderizan un `div`;
- tipos genéricos difíciles de entender;
- helpers de una sola línea sin valor semántico;
- abstracciones creadas por una única repetición;
- configuraciones dinámicas cuando un objeto estático basta;
- patrones empresariales aplicados a una feature pequeña;
- comentarios que expliquen código innecesariamente complicado;
- archivos divididos en exceso;
- una carpeta nueva para cada concepto;
- index files o barrels sin uso real;
- renombres masivos;
- refactors preventivos;
- optimizaciones prematuras.

No hagas el código más difícil de leer para evitar unas pocas líneas repetidas.

## Abstracción

No abstraigas por anticipación.

Crea una abstracción cuando se cumpla al menos una de estas condiciones:

- existe repetición real en varios consumidores;
- hay una regla de dominio que necesita una única fuente de verdad;
- encapsula comportamiento complejo;
- protege una frontera externa;
- reduce errores;
- mejora claramente la API consumida.

No abstraigas únicamente porque dos bloques se parecen visualmente.

Antes de extraer algo, pregúntate:

- ¿El nombre de la abstracción expresa una responsabilidad real?
- ¿Su API es más clara que el código inline?
- ¿Tiene más de un consumidor real?
- ¿Será más sencillo modificarlo después?
- ¿Reduce complejidad o solamente la mueve?

Cuando la respuesta no sea claramente positiva, conserva la implementación
local.

## Optimización

No implementes optimizaciones que no produzcan un beneficio relevante y
comprobable.

Evita como medida preventiva:

- `useMemo`;
- `useCallback`;
- `memo`;
- memoización manual;
- estructuras de caché locales;
- virtualización;
- lazy loading innecesario;
- paralelismo complejo;
- normalizaciones costosas;
- índices adicionales;
- algoritmos más difíciles de entender;
- división excesiva de bundles;
- prefetching manual;
- estados derivados almacenados.

Utiliza estas herramientas únicamente cuando:

- exista un problema real;
- la medición o arquitectura lo justifique;
- el beneficio sea significativo;
- la implementación siga siendo mantenible.

No optimices componentes pequeños por intuición.

No conviertas una implementación clara en una implementación críptica para
ahorrar una cantidad irrelevante de renders o líneas.

## React y Next.js

Mantén Server Components como opción predeterminada.

Añade `'use client'` solamente cuando el archivo necesite:

- estado;
- hooks de React o Next del navegador;
- event handlers;
- APIs del navegador;
- animación interactiva;
- una librería exclusivamente cliente.

No conviertas una página o sección completa en Client Component porque un
elemento hijo sea interactivo.

Aísla la interacción en el componente más pequeño posible.

No dupliques datos del servidor en estado cliente.

No almacenes estado derivado cuando puede calcularse de forma clara durante el
render.

No uses efectos para sincronizar valores que pueden derivarse directamente de
props o estado.

No agregues Context, Zustand, Redux u otro estado global para una feature local.

## Componentes

Una page debe enfocarse en:

- obtener datos;
- validar el recurso;
- componer la interfaz;
- configurar metadata cuando corresponda.

Una section debe representar una región semántica importante.

Un componente de feature debe encapsular una unidad real de esa feature.

Un componente common debe tener semántica estable en más de una feature.

No promociones un componente a `common` solo porque podría ser reutilizable en
el futuro.

Mantén el componente junto a su primer consumidor hasta que exista una
reutilización real.

No fragmentes la UI en demasiados archivos pequeños.

Un componente no necesita extraerse solo por tener JSX largo. Extráelo cuando:

- tenga una responsabilidad independiente;
- necesite una frontera cliente;
- se repita;
- encapsule una variante;
- mejore claramente la lectura de su consumidor.

## HeroUI y HTML nativo

Usa HeroUI cuando ya resuelva correctamente un control de aplicación:

- `Button`;
- `Input`;
- `Chip`;
- `Tooltip`;
- `Tabs`;
- `Card`;
- `Divider`;
- otras primitives ya instaladas.

No recrees manualmente comportamiento que la librería ya ofrece:

- focus;
- keyboard interaction;
- clear button;
- selected state;
- disabled state;
- tooltip;
- accessible button behavior.

No fuerces HeroUI para contenido editorial dinámico donde el HTML semántico es
más apropiado.

Conserva elementos nativos para:

- headings;
- párrafos;
- listas;
- tablas;
- blockquotes;
- code;
- figures;
- articles;
- sections;
- navigation;
- description lists.

Usa cada herramienta donde tenga sentido.

## TypeScript

Mantén los tipos simples y próximos al dominio.

Prefiere:

- tipos explícitos;
- unions;
- `Pick`;
- tipos derivados desde una fuente estática;
- nullability real;
- `import type`;
- mapas exhaustivos con `Record`.

Evita:

- genéricos abstractos sin necesidad;
- conditional types complejos;
- utility types anidados difíciles de leer;
- casting amplio;
- `any`;
- non-null assertions;
- tipos duplicados;
- interfaces vacías;
- tipos creados únicamente para ocultar la forma real de los datos.

No escribas un tipo más complejo que el problema que representa.

## Helpers y utilidades

Crea un helper cuando:

- existe transformación real;
- tiene un nombre de dominio útil;
- se reutiliza;
- facilita una prueba;
- evita inconsistencias.

No crees un helper cuando:

- solo devuelve una propiedad;
- envuelve una llamada sin añadir comportamiento;
- se usa una vez y separarlo dificulta seguir el flujo;
- únicamente reduce dos o tres líneas claras;
- oculta una condición simple.

Mantén la lógica cerca de donde se usa cuando eso hace el flujo más fácil de
entender.

## Estructura de archivos

Respeta la colocación existente del repositorio.

No crees carpetas como:

- `services`;
- `repositories`;
- `adapters`;
- `factories`;
- `hooks`;
- `providers`;
- `core`;
- `domain`;
- `infrastructure`;

salvo que el repositorio ya utilice ese patrón o la tarea lo justifique de
manera clara.

No copies estructuras de proyectos enterprise dentro de una feature pequeña.

El número de archivos debe ser proporcional al problema.

Prefiere pocos archivos con responsabilidades claras antes que una estructura
profunda difícil de navegar.

## Estilos

Reutiliza los tokens, componentes y patrones documentados.

No introduzcas:

- otra paleta;
- colores arbitrarios;
- otro sistema de spacing;
- otro patrón de cards;
- otra forma de focus;
- otra estrategia CSS;
- otra librería de variantes.

Mantén las clases legibles.

No construyas clases Tailwind dinámicamente cuando puedan declararse en mapas
estáticos.

No extraigas constantes para cada clase individual.

No conviertas todas las combinaciones de clases en un sistema de variantes si
solo existe un consumidor.

## Comentarios

El código debe explicarse principalmente por su estructura y nombres.

Añade comentarios únicamente para:

- decisiones no evidentes;
- limitaciones externas;
- comportamiento contraintuitivo;
- razones de seguridad;
- workarounds justificados.

No añadas comentarios que narren línea por línea lo que el código ya expresa.

No utilices comentarios para justificar una implementación excesivamente
complicada. Simplifica la implementación.

## Cambios mínimos

Realiza el cambio más pequeño que resuelva completamente la tarea.

No aproveches la tarea para:

- reorganizar archivos ajenos;
- renombrar APIs existentes;
- cambiar formatos;
- ordenar todas las clases;
- reemplazar patrones históricos;
- corregir inconsistencias no relacionadas;
- actualizar dependencias;
- migrar herramientas;
- reformatear archivos enteros.

Mantén el diff enfocado.

Antes de entregar, revisa cada archivo modificado y elimina cambios que no sean
necesarios.

## Comparación con el código existente

Antes de implementar una pieza nueva, identifica al menos una implementación
análoga y explica brevemente:

- qué archivo estudiaste;
- qué patrón estás reutilizando;
- qué parte no aplica a la nueva feature;
- por qué hace falta crear algo nuevo, cuando corresponda.

No copies código ciegamente.

Reutiliza la intención, estructura y nivel de abstracción del autor.

## Prohibiciones

No:

- sobreingenierices;
- optimices prematuramente;
- crees abstracciones especulativas;
- dupliques componentes;
- crees wrappers vacíos;
- agregues dependencias sin necesidad;
- conviertas todo en Client Component;
- añadas estado global;
- hagas refactors fuera de alcance;
- reemplaces una solución simple por un patrón más complejo;
- ocultes lógica importante dentro de helpers genéricos;
- crees código “clever” difícil de seguir;
- dejes código muerto;
- dejes funciones para un posible uso futuro;
- implementes casos hipotéticos no solicitados;
- hagas commit.

## Flujo de trabajo obligatorio

1. Ejecuta `git status --short`.
2. Lee las instrucciones y documentación.
3. Inspecciona el código análogo.
4. Identifica qué piezas existentes pueden reutilizarse.
5. Resume brevemente:
   - patrón existente que seguirás;
   - componentes que reutilizarás;
   - archivos nuevos realmente necesarios;
   - complejidad que evitarás.
6. Implementa la solución más directa.
7. Revisa si alguna abstracción puede eliminarse.
8. Revisa si algún componente nuevo ya existía.
9. Revisa si algún Client Component puede reducirse.
10. Revisa si algún helper complica más de lo que ayuda.
11. Ejecuta validaciones.
12. Revisa el diff completo.
13. Elimina cambios innecesarios.
14. Entrega un resumen honesto.

No te detengas después del análisis. Continúa con la implementación.

## Autoevaluación antes de entregar

Responde internamente estas preguntas:

- ¿Este código parece pertenecer al repositorio?
- ¿Utiliza los mismos patrones que los archivos cercanos?
- ¿Un desarrollador puede entenderlo sin recorrer muchas capas?
- ¿Creé algo que ya existía?
- ¿Hay una abstraction usada una sola vez?
- ¿Un helper está ocultando una operación sencilla?
- ¿Un componente solo renombra otro?
- ¿Añadí una optimización sin medición?
- ¿El cambio podría hacerse con menos archivos?
- ¿Convertí más código del necesario en cliente?
- ¿El diff contiene cambios fuera de alcance?
- ¿Será fácil modificar esta implementación dentro de seis meses?

Si alguna respuesta revela complejidad innecesaria, simplifica antes de
entregar.

## Criterios de aceptación

La implementación se considera correcta cuando:

- funciona;
- se integra con el código existente;
- reutiliza las soluciones disponibles;
- mantiene el estilo del autor;
- tiene un diff enfocado;
- evita abstracciones innecesarias;
- evita optimizaciones prematuras;
- mantiene Server Components cuando corresponde;
- usa HeroUI cuando aporta valor real;
- conserva HTML semántico;
- es fácil de leer;
- es fácil de modificar;
- no introduce una arquitectura paralela;
- no añade dependencias injustificadas;
- pasa las validaciones del repositorio.

## Entrega final

Incluye:

- implementación análoga estudiada;
- componentes existentes reutilizados;
- primitives reutilizadas;
- archivos creados y por qué fueron necesarios;
- abstracciones descartadas;
- optimizaciones deliberadamente evitadas;
- fronteras Server/Client;
- validaciones ejecutadas;
- resultado de lint;
- resultado de TypeScript;
- resultado de build;
- cambios fuera de alcance evitados;
- limitaciones reales.

El objetivo no es demostrar sofisticación técnica.

El objetivo es entregar una solución correcta, clara y mantenible que parezca
escrita por el autor original del proyecto.
