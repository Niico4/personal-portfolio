interface Service {
  number: string;
  title: string;
  description: string;
  features: string[];
  canBeUseful?: string;
}

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
  },
];

export const MyServicesContenSection = () => {
  return (
    <div className="flex flex-col">
      {SERVICES.map(
        ({ description, features, number, title, canBeUseful }, index) => {
          const isFirstService = index === 0;

          return (
            <div key={number} className="flex flex-col">
              <div key={number} className="flex gap-4 items-start">
                <span
                  className={`text-brand-300 ${isFirstService ? 'mr-1' : ''}`}
                >
                  {number}
                </span>

                <div className="flex flex-col gap-2 border-l border-brand-400/40 pl-4">
                  <h3 className="text-lg font-medium text-content-primary">
                    {title}
                  </h3>

                  <p className="text-sm text-content">{description}</p>

                  <ul className="ml-2 list-inside list-disc space-y-1 text-sm text-content">
                    {features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>

                  <div className="rounded-md border border-brand-400/10 bg-brand-400/[0.06] p-2 sm:mt-2">
                    <p className="text-xs text-content sm:text-sm">
                      {canBeUseful}
                    </p>
                  </div>
                </div>
              </div>
              {index !== SERVICES.length - 1 && (
                <hr className="my-5 h-px w-full shrink-0 border-none bg-line/10" />
              )}
            </div>
          );
        },
      )}
    </div>
  );
};
