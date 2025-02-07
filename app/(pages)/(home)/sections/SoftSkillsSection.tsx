'use client';

import React from 'react';
import {
  IconBook,
  IconDeviceLaptop,
  IconUsersGroup,
  IconBulb,
} from '@tabler/icons-react';

import { grandstander } from '@/layout';

import CardSoftSkill from '../components/sections/soft-skills/CardSoftSkill';

const SoftSkills = () => {
  return (
    <section className="flex flex-col gap-5">
      <h2 className={`title-section ${grandstander.className}`}>
        ¿Cómo trabajo?
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        <CardSoftSkill
          title="Siempre aprendiendo"
          description="La tecnología avanza, y yo con ella."
          icon={IconBook}
        />
        <CardSoftSkill
          title="Del problema a la solución"
          description="Resolver desafíos es lo que más disfruto."
          icon={IconBulb}
        />
        <CardSoftSkill
          title="Colaboración primero"
          description="Me gusta trabajar en equipo y hacer que las ideas fluyan."
          icon={IconUsersGroup}
        />
        <CardSoftSkill
          title="Desarrollo con propósito"
          description="No solo escribo código, sino que creo soluciones reales."
          icon={IconDeviceLaptop}
        />
      </div>
    </section>
  );
};

export default SoftSkills;
