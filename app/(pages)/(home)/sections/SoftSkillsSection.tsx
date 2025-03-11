import React from 'react';
import {
  IconBook,
  IconDeviceLaptop,
  IconUsersGroup,
  IconCode,
} from '@tabler/icons-react';

import SubTitle from '@/components/common/SubTitle';

import SoftSkillCard from '../components/SoftSkillCard';

const SoftSkills = () => {
  return (
    <section className="flex flex-col gap-5">
      <SubTitle title="¿Cómo trabajo?" />

      <div className="grid md:grid-cols-2 gap-4">
        <SoftSkillCard
          title="De la Idea al Producto Final"
          description="Desarrollo soluciones intuitivas y atractivas, priorizando la experiencia del usuario en cada decisión de diseño."
          icon={IconDeviceLaptop}
        />
        <SoftSkillCard
          title="Metodología Ágil"
          description="Trabajo con sprints iterativos, adaptándome rápidamente a cambios y nuevos requerimientos."
          icon={IconBook}
        />
        <SoftSkillCard
          title="Código Limpio"
          description="Escribo código mantenible y escalable, siguiendo las mejores prácticas y patrones de diseño modernos."
          icon={IconCode}
        />
        <SoftSkillCard
          title="Colaboración Efectiva"
          description="Comunicación clara y constante con el equipo y stakeholders para garantizar resultados óptimos."
          icon={IconUsersGroup}
        />
      </div>
    </section>
  );
};

export default SoftSkills;
