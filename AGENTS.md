# Guía operativa del repositorio

Este repositorio contiene el portfolio de Nicolás Garzón: una aplicación
Next.js con contenido principal en Sanity y una Wiki administrada desde Notion.
La Wiki consume las data sources originales mediante la API oficial, exclusivamente
desde módulos `server-only`.

La documentación describe los patrones observados, pero el código vigente es
la evidencia final. Cuando exista una diferencia entre ambos, inspecciona la
implementación, evita asumir y actualiza la documentación correspondiente.

## Antes de modificar código

1. Revisa `git status --short` y no reviertas, sobrescribas ni reformatees
   cambios existentes del usuario que estén fuera del alcance de la tarea.

2. Lee:

   - [Arquitectura](docs/architecture/overview.md)
   - [Convenciones](docs/engineering/conventions.md)
   - [Fundamentos visuales](docs/design-system/foundations.md)
   - [Filosofía de implementación](docs/engineering/implementation-philosophy.md)
   - El documento específico de la feature.

3. Inspecciona al menos una implementación análoga real antes de crear una
   página, sección, componente, fetcher o estilo.

4. Reutiliza los componentes de `app/components/common`, las primitivas
   instaladas y los patrones colocados junto a la feature. No introduzcas una
   solución paralela cuando ya exista una equivalente.

5. Mantén Server Components como opción predeterminada. Añade `'use client'`
   únicamente en la frontera mínima que requiera estado, hooks, eventos,
   movimiento interactivo o una integración cliente.

6. Nunca expongas tokens, variables privadas, clientes `server-only` ni datos
   editoriales privados al navegador.

7. No agregues dependencias salvo que exista una necesidad demostrada que las
   herramientas actuales no cubran.

8. Mantén el cambio dentro de su alcance. No hagas refactorizaciones,
   migraciones de dependencias, renames masivos ni cambios de contenido en
   Sanity o Notion como trabajo incidental.

9. Si una decisión arquitectónica o una convención cambia intencionalmente,
   actualiza la documentación afectada en el mismo cambio.

La Wiki tiene reglas adicionales en
[app/(pages)/wiki/AGENTS.md](<app/(pages)/wiki/AGENTS.md>).

Documentación relevante:

- [Estructura de directorios](docs/architecture/directory-structure.md)
- [Flujo de datos](docs/architecture/data-flow.md)
- [Catálogo de componentes](docs/design-system/components.md)
- [Composición de componentes](docs/engineering/components.md)
- [Quality checks](docs/engineering/quality-checks.md)

Las instrucciones de un `AGENTS.md` más cercano a la feature complementan y
prevalecen sobre este archivo dentro de su directorio.

## Validación

Usa pnpm; `pnpm-lock.yaml` es el lockfile vigente.

Para cambios de código ejecuta normalmente:

```bash
pnpm lint
pnpm exec tsc --noEmit
```

Ejecuta también:

```bash
pnpm build
```

cuando el cambio afecte rutas, layouts, fetching, configuración, variables de
entorno, metadata, dependencias o comportamiento de producción.

Para cambios documentales ejecuta:

```bash
pnpm exec prettier --check AGENTS.md docs 'app/(pages)/wiki/AGENTS.md'
```

Antes de entregar revisa:

```bash
git status --short
git diff --check
git diff
```

No hay un comando de tests automatizados en `package.json`. No inventes uno.

No hagas commit salvo solicitud explícita.

## Filosofía de implementación

Antes de implementar o refactorizar código, lee
[Implementation philosophy](docs/engineering/implementation-philosophy.md).

Principios obligatorios:

- Escribe código que parezca pertenecer al repositorio.
- Prefiere la solución más simple que resuelva completamente el problema.
- Inspecciona y reutiliza implementaciones existentes antes de crear algo.
- No crees componentes, helpers, hooks, tipos o wrappers sin una
  responsabilidad real.
- No abstraigas por anticipación ni por una única repetición.
- No implementes optimizaciones sin un beneficio relevante y comprobable.
- Mantén Server Components como predeterminados y reduce al mínimo las
  fronteras cliente.
- Usa HeroUI para controles de aplicación cuando su primitive resuelva
  correctamente el caso.
- Conserva HTML semántico para contenido editorial.
- Mantén pocos archivos con responsabilidades claras antes que estructuras
  profundas.
- Prioriza legibilidad, mantenimiento y cambios fáciles sobre código
  sofisticado.
- Mantén el diff enfocado y evita refactors fuera del alcance.

Antes de entregar, elimina cualquier abstracción, optimización o archivo que
complique la solución sin aportar un beneficio claro.
