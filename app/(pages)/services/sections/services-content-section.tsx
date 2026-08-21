interface Service {
  number: string;
  title: string;
  description: string;
  features: string[];
  canBeUseful?: string;
  accent: 'brand' | 'cyan' | 'teal';
}

const ACCENT_STYLES = {
  brand: {
    numberColor: 'text-brand-300',
    borderLeftColor: 'border-brand-500',
    bgCanBeUseful: 'bg-brand-300/[0.06] border-brand-300/10',
  },
  cyan: {
    numberColor: 'text-cyan-300',
    borderLeftColor: 'border-cyan-500',
    bgCanBeUseful: 'bg-cyan-300/[0.06] border-cyan-300/10',
  },
  teal: {
    numberColor: 'text-teal-300',
    borderLeftColor: 'border-teal-500',
    bgCanBeUseful: 'bg-teal-300/[0.06] border-teal-300/10',
  },
} as const;

const SERVICES: Service[] = [
  {
    number: '01',
    title: 'Aplicaciones web y sistemas de gestión',
    description:
      'Desarrollo aplicaciones para organizar información, procesos y tareas que hoy están repartidas entre varias herramientas.',
    features: [
      'Dashboards, módulos y paneles administrativos',
      'Usuarios, roles y permisos',
      'APIs, integraciones y manejo de datos',
    ],
    canBeUseful:
      'Puede servirte si hoy dependes demasiado de Excel, WhatsApp o procesos manuales.',
    accent: 'brand',
  },
  {
    number: '02',
    title: 'Desarrollo frontend',
    description:
      'Me sumo a aplicaciones que ya tienen una base para desarrollar nuevas pantallas, mejorar las actuales o hacerme cargo de una parte del frontend.',
    features: [
      'Implementación desde Figma',
      'Integración con APIs y mejora de interfaces',
      'Componentes reutilizables',
    ],
    canBeUseful:
      'Puede servirte si ya tienes una aplicación y necesitas seguir construyéndola.',
    accent: 'cyan',
  },
  {
    number: '03',
    title: 'MVPs web y primeras versiones funcionales',
    description:
      'Te ayudo a aterrizar una idea y construir una primera versión con lo necesario para empezar a probarla.',
    features: [
      'Alcance y funcionalidades principales',
      'Flujos y estructura inicial',
      'Frontend, backend y despliegue',
    ],
    canBeUseful:
      'Puede servirte si tienes una idea, pero todavía no necesitas construir todo de una vez.',
    accent: 'teal',
  },
];

export const MyServicesContenSection = () => {
  return (
    <div className="flex flex-col">
      {SERVICES.map(
        (
          { accent, description, features, number, title, canBeUseful },
          index,
        ) => {
          const styles = ACCENT_STYLES[accent];
          const isFirstService = index === 0;

          return (
            <div key={number} className="flex flex-col">
              <div key={number} className="flex gap-4 items-start">
                <span
                  className={`${styles.numberColor} ${isFirstService ? 'mr-1' : ''}`}
                >
                  {number}
                </span>

                <div
                  className={`flex flex-col gap-2 border-l pl-4 ${styles.borderLeftColor}`}
                >
                  <h3 className="text-zinc-300 text-lg">{title}</h3>

                  <p className="text-sm text-zinc-400">{description}</p>

                  <ul className="space-y-1 text-zinc-400 text-sm ml-2 list-inside list-disc">
                    {features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>

                  <div
                    className={`p-2 border rounded-md sm:mt-2 ${styles.bgCanBeUseful}`}
                  >
                    <p className="text-xs text-zinc-400 sm:text-sm">
                      {canBeUseful}
                    </p>
                  </div>
                </div>
              </div>
              {index !== SERVICES.length - 1 && (
                <hr className="shrink-0 bg-zinc-900 border-none w-full h-[1px] my-5" />
              )}
            </div>
          );
        },
      )}
    </div>
  );
};
