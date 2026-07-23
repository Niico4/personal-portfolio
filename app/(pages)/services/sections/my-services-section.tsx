import { SectionHeader } from '@/components/common/section-header';

import { ServiceCard } from '../components/service-card';

export interface Service {
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  features: string[];
  canBeUseful?: string;
  accent: 'brand' | 'purple' | 'amber';
}

const SERVICES: Service[] = [
  {
    number: '01',
    eyebrow: 'Enfoque principal',
    title: 'Aplicaciones web y sistemas de gestión',
    description:
      'Desarrollo aplicaciones web y sistemas de gestión a medida para centralizar información, reducir tareas manuales y facilitar la operación diaria de un negocio. Pueden ser herramientas internas o plataformas completas con usuarios, permisos, datos y módulos adaptados a cada proceso.',
    features: [
      'Dashboards y paneles administrativos',
      'Gestión de usuarios, roles y permisos',
      'Módulos adaptados a cada proceso',
      'Integración con APIs y servicios externos',
      'Organización y persistencia de datos',
    ],
    accent: 'brand',
    canBeUseful:
      'Tu operación depende de hojas de cálculo, mensajes, tareas repetitivas o información distribuida entre diferentes herramientas.',
  },
  {
    number: '02',
    eyebrow: 'Frontend',
    title: 'Desarrollo frontend para productos existentes',
    description:
      'Desarrollo y mejoro interfaces para productos que ya tienen diseño, backend o una primera versión. Implemento pantallas responsivas, accesibles y fáciles de mantener con React, Next.js y TypeScript, integrándolas con APIs y servicios existentes.',
    features: [
      'Implementación de diseños desde Figma',
      'Integración y consumo de APIs',
      'Componentes reutilizables',
      'Accesibilidad y rendimiento',
    ],

    accent: 'purple',
  },
  {
    number: '03',
    eyebrow: 'Producto desde cero',
    title: 'MVPs web y primeras versiones funcionales',
    description:
      'Construyo MVPs web y primeras versiones funcionales para validar una idea con usuarios reales antes de invertir en funcionalidades secundarias. Definimos el alcance esencial, desarrollamos el producto y lo dejamos preparado para medir, ajustar y continuar creciendo.',
    features: [
      'Definición del alcance inicial',
      'Organización de requerimientos',
      'Desarrollo frontend y backend',
      'Despliegue y preparación inicial',
    ],

    accent: 'amber',
  },
];

const MyServicesSection = () => {
  return (
    <section className="flex flex-col gap-10">
      <SectionHeader
        title="Servicios de Desarrollo web"
        description="Cada producto parte de una necesidad diferente, pero estas son las áreas en las que puedo aportar con mayor solidez."
      />

      <ServiceCard service={SERVICES[0]} />

      <div className="flex flex-col sm:flex-row gap-10">
        {SERVICES.slice(1, 3).map((service) => (
          <ServiceCard key={service.number} service={service} />
        ))}
      </div>
    </section>
  );
};

export default MyServicesSection;
