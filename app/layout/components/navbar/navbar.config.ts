export const routesInNavbar = [
  { label: 'Inicio', href: '/' },
  { label: 'Proyectos', href: '/portfolio' },
  { label: 'Sobre Mi', href: '/about-me' },
];

export const scrollAnimations = {
  scale: {
    inputRange: [50, 200, 350, 500],
    outputRange: [1, 0.95, 0.92, 0.9],
  },
  width: {
    inputRange: [50, 200, 350, 500],
    outputRange: ['100%', '90%', '85%', '80%'],
  },
  bgColor: {
    inputRange: [50, 150, 250, 350],
    outputRange: [
      'rgba(255, 255, 255, 0.06)',
      'rgba(100,100,100,0.15)',
      'rgba(60,60,60,0.10)',
      'rgba(20, 20, 20, 0.6)',
    ],
  },
};
