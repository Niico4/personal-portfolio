import React from 'react';
import { Card, CardBody } from '@nextui-org/react';

const CardAboutMe = () => {
  return (
    <Card
      className="bg-slate-900/80 border-1 border-slate-800 p-4"
      radius="lg"
      isBlurred
    >
      <CardBody>
        <p className="text-slate-300">
          Soy Nicolás Garzón, un desarrollador web joven con una gran pasión por
          la tecnología y la creación de experiencias digitales únicas. A lo
          largo de mi carrera he trabajado en una variedad de proyectos, desde
          landing pages hasta aplicaciones más complejas, siempre buscando
          soluciones elegantes y eficientes. Me encanta aprender y adaptarme a
          nuevas tecnologías, y actualmente me enfoco en el desarrollo frontend
          utilizando herramientas como React, Next.js, NextUI y Tailwind CSS. Mi
          enfoque está en la calidad del código y en crear interfaces fáciles de
          usar que hagan que la experiencia del usuario sea intuitiva y
          atractiva.
        </p>
      </CardBody>
    </Card>
  );
};

export default CardAboutMe;
