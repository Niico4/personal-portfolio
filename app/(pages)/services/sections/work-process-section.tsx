import { IconArrowUpRight } from '@tabler/icons-react';

import { SectionHeader } from '@/components/common/section-header';

type ProcessStep = {
  number: string;
  title: string;
  description: string;
  result: string;
};

const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Entender el proyecto',
    description:
      'Primero reviso la idea, el contexto del negocio y las personas que utilizarán el producto. Esta etapa permite identificar el problema real y evitar comenzar a desarrollar sobre supuestos.',
    result: 'Objetivos y necesidades bien definidos',
  },
  {
    number: '02',
    title: 'Definir el alcance',
    description:
      'Organizo las funcionalidades, los recorridos principales y las prioridades del proyecto. Juntos delimitamos qué se va a construir y qué puede quedar para una siguiente etapa.',
    result: 'Un alcance claro y una ruta de trabajo',
  },
  {
    number: '03',
    title: 'Diseñar y construir',
    description:
      'Desarrollo la interfaz, la lógica, los datos y las integraciones necesarias. El producto avanza por partes funcionales que pueden revisarse y ajustarse durante el proceso.',
    result: 'Una versión funcional para revisar',
  },
  {
    number: '04',
    title: 'Probar y preparar',
    description:
      'Reviso los recorridos principales, corrijo detalles y preparo el producto para utilizarse en un entorno real o continuar con nuevas funcionalidades.',
    result: 'Un producto preparado para avanzar',
  },
];

export const WorkProcess = () => {
  return (
    <section className="flex flex-col gap-10">
      <SectionHeader
        title="Cómo trabajo en un proyecto"
        description="Cada proyecto avanza por etapas. Primero aclaro qué debe resolver, después organizo el alcance y construyo una base que pueda probarse, ajustarse y seguir creciendo."
      />

      <ol
        aria-label="Etapas de mi proceso de trabajo"
        className="border-t border-foreground/10"
      >
        {PROCESS_STEPS.map(({ number, title, description, result }) => (
          <li
            key={number}
            className="
              group grid gap-5 border-b border-foreground/10 py-9
              sm:grid-cols-[4.5rem_minmax(0,1fr)] sm:gap-7 sm:py-11
              lg:grid-cols-[5.5rem_minmax(0,1fr)]
            "
          >
            <div className="flex items-start">
              <span
                aria-hidden="true"
                className="
                  font-mono text-4xl font-medium tracking-[-0.08em]
                  text-foreground/10 transition-colors duration-200
                  group-hover:text-brand-100/60
                  motion-reduce:transition-none sm:text-5xl
                "
              >
                {number}
              </span>
            </div>

            <div className="max-w-2xl">
              <h3 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                {title}
              </h3>

              <p className="mt-4 text-sm leading-7 text-foreground/50 sm:text-base sm:leading-8">
                {description}
              </p>

              <div
                className="
                  mt-6 flex items-start gap-3 border-l
                  border-foreground/10 pl-4
                  transition-colors duration-200
                  group-hover:border-brand-100/30
                  motion-reduce:transition-none
                "
              >
                <IconArrowUpRight
                  aria-hidden="true"
                  size={16}
                  stroke={1.7}
                  className="
                    mt-1 shrink-0 text-foreground/25
                    transition-colors duration-200
                    group-hover:text-brand-100
                    motion-reduce:transition-none
                  "
                />

                <div>
                  <p
                    className="
                      text-[0.62rem] font-medium uppercase
                      tracking-[0.17em] text-foreground/30
                    "
                  >
                    Resultado de la etapa
                  </p>

                  <p className="mt-1.5 text-sm font-medium leading-6 text-foreground/65">
                    {result}
                  </p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
};
