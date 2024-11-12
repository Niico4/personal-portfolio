import { FC, ReactNode } from 'react';
import { Card, CardBody } from '@nextui-org/react';
import React from 'react';

interface CardDetailProps {
  title: ReactNode;
  description: string;
  className?: string;
}

const CardDetail: FC<CardDetailProps> = ({ title, description, className }) => (
  <Card className={`card-bg flex-1 ${className}`} radius="lg">
    <CardBody className="text-IColorPrimary text-xl gap-3 justify-center">
      <span className="text-primary text-3xl font-semibold">{title}</span>
      <p>{description}</p>
    </CardBody>
  </Card>
);

export default React.memo(CardDetail);
