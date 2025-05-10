import { motion } from 'framer-motion';
import React from 'react';

interface Props {
  toggleMenu: () => void;
  isMenuOpen: boolean;
}

const ToggleButton = ({ toggleMenu, isMenuOpen }: Props) => {
  return (
    <button
      className="sm:hidden text-white focus:outline-none z-50"
      onClick={toggleMenu}
      aria-label="Toggle menu"
    >
      <motion.div
        animate={isMenuOpen ? 'open' : 'closed'}
        variants={{
          open: { rotate: 180 },
          closed: { rotate: 0 },
        }}
        transition={{ duration: 0.3 }}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {isMenuOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </motion.div>
    </button>
  );
};

export default ToggleButton;
