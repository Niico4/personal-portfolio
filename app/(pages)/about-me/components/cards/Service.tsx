import React from 'react';
import { Card, CardBody } from '@nextui-org/react';

const CardService = () => {
  return (
    <Card className="bg-black/50 p-4 flex-1" isBlurred>
      <CardBody>
        <p className="text-slate-300/90">
          Ofrezco un desarrollo frontend utilizando tecnologías modernas como
          React, Next.js y TypeScript. Me especializo en crear aplicaciones web
          escalables, optimizadas y con una experiencia de usuario impecable. Mi
          enfoque es en el desarrollo limpio y eficiente, siempre con atención
          al detalle y las mejores prácticas.
        </p>
      </CardBody>
    </Card>
  );
};

export default CardService;
