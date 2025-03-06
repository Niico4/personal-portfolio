import React from 'react';
import { Card, CardBody } from '@heroui/card';

const AboutMeCard = () => {
  return (
    <Card className="card-bg p-4" radius="sm" isBlurred>
      <CardBody>
        <p className="text-paragraph/75">
          Me encanta crear cosas para la web. Más que solo verse bien, quiero
          que cada proyecto se sienta natural, fácil de usar y con su propia
          esencia. Disfruto cada paso, desde la idea hasta los últimos retoques,
          siempre buscando que quien lo use tenga la mejor experiencia. Me gusta
          aprender, experimentar y llevar todo un poco más allá, porque creo que{' '}
          <span className="text-custom-primary">
            la web está para conectar, inspirar y sorprender
          </span>
          .
        </p>
      </CardBody>
    </Card>
  );
};

export default AboutMeCard;
