import React from 'react';
import { motion } from 'framer-motion';

import NavigationLink from './NavigationLink';
import { routesInNavbar } from './navbar.config';

interface Props {
  currentPathname: string;
}

const MobileMenu = ({ currentPathname }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-lg z-40 flex flex-col items-center justify-center space-y-12"
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="flex flex-col items-center gap-8"
      >
        {routesInNavbar.map(({ href, label }, index) => (
          <NavigationLink
            key={index}
            currentPathname={currentPathname}
            label={label}
            href={href}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default MobileMenu;
