'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

import { TECHNOLOGIES_LIST } from '../data/technologies';

import TechnologyCard from './TechnologyCard';

const TechnologiesList = () => {
  const duplicatedTech = [...TECHNOLOGIES_LIST, ...TECHNOLOGIES_LIST];
  const [width, setWidth] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      const containerWidth = scrollRef.current.scrollWidth / 2;
      setWidth(containerWidth);
    }
  }, []);

  return (
    <motion.div
      ref={scrollRef}
      className="flex gap-4"
      animate={{
        x: [0, -width],
      }}
      transition={{
        duration: 10,
        ease: 'linear',
        repeat: Infinity,
        repeatType: 'loop',
      }}
    >
      {duplicatedTech.map(({ icon, label }, index) => (
        <TechnologyCard key={index} icon={icon} label={label} />
      ))}
    </motion.div>
  );
};

export default TechnologiesList;
