import React from 'react';
import { Grandstander } from 'next/font/google';
import {
  IconBook,
  IconDeviceLaptop,
  IconUsersGroup,
  IconCode,
} from '@tabler/icons-react';

import CardSoftSkill from '../components/CardSoftSkill';

const grandstander = Grandstander({
  subsets: ['latin'],
  display: 'swap',
});

const SoftSkills = () => {
  return (
    <section className="flex flex-col gap-5">
      <h2 className={`title-section ${grandstander.className}`}>
        ¿Cómo trabajo?
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        <CardSoftSkill
          title="De la Idea al Producto Final"
          description="Desarrollo soluciones intuitivas y atractivas, priorizando la experiencia del usuario en cada decisión de diseño."
          icon={IconDeviceLaptop}
        />
        <CardSoftSkill
          title="Metodología Ágil"
          description="Trabajo con sprints iterativos, adaptándome rápidamente a cambios y nuevos requerimientos."
          icon={IconBook}
        />
        <CardSoftSkill
          title="Código Limpio"
          description="Escribo código mantenible y escalable, siguiendo las mejores prácticas y patrones de diseño modernos."
          icon={IconCode}
        />
        <CardSoftSkill
          title="Colaboración Efectiva"
          description="Comunicación clara y constante con el equipo y stakeholders para garantizar resultados óptimos."
          icon={IconUsersGroup}
        />
      </div>
    </section>
  );
};

export default SoftSkills;
