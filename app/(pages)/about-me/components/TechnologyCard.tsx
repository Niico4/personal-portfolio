import React, { FC } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { TechnologyCardProps } from '../types/about-me';

const TechnologyCard: FC<TechnologyCardProps> = ({ label, icon: Icon }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative flex-center size-20 md:size-24 p-4 aspect-square bg-slate-800 border border-slate-600 rounded-md "
    >
      <Icon className="size-full" />
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute inset-0 z-10 flex-center"
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 w-full h-full bg-black/50 backdrop-blur-sm rounded-md" />
            <motion.span
              initial={{ y: 10 }}
              animate={{ y: 0 }}
              exit={{ y: 10 }}
              className="z-10 flex-center text-default font-semibold text-sm text-center"
            >
              {label}
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TechnologyCard;
