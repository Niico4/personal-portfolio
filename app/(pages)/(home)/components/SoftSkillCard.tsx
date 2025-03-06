import React, { FC } from 'react';
import { Grandstander } from 'next/font/google';
import { Card, CardBody } from '@heroui/card';
import { Icon } from '@tabler/icons-react';

const grandstander = Grandstander({
  subsets: ['latin'],
  display: 'swap',
});

interface Props {
  title: string;
  description: string;
  icon: Icon;
}

const SoftSkillCard: FC<Props> = ({ title, description, icon: Icon }) => {
  return (
    <Card className="items-center bg-black/50 px-4 py-2 shadow-sm shadow-zinc-800">
      <CardBody className="gap-3">
        <div className="flex items-center gap-3">
          <Icon
            size={32}
            color="#CD93FF"
            stroke={1.5}
            style={{ filter: 'drop-shadow(0 0 5px rgba(205,147,255,1))' }}
          />
          <h3
            className={`${grandstander.className} text-title font-semibold text-xl md:tracking-wider md:text-xl`}
            style={{
              filter: 'drop-shadow(2px 0 5px rgba(205,147,255, 1))',
              WebkitTextStroke: '0.2px #CD93FF',
            }}
          >
            {title}
          </h3>
        </div>
        <p className="text-paragraph/80 text-base md:text-medium">
          {description}
        </p>
      </CardBody>
    </Card>
  );
};

export default SoftSkillCard;
