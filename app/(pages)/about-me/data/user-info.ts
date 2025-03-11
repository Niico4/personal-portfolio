export const EXPERIENCE_LIST = [
  {
    title: 'Frontend Developer – Refactorización y Optimización',
    date: '2023 - 2023',
    description:
      'Formé parte de un equipo encargado de refactorizar una aplicación para mejorar su rendimiento y calidad, colaborando en la optimización del código para hacerlo más eficiente y mantenible. También trabajé junto a otros desarrolladores en la fase inicial de una aplicación diseñada para optimizar un sistema de entregas, contribuyendo a una base sólida para su escalabilidad y funcionamiento.',
  },
  {
    title: 'Frontend Developer - UI/UX & Animaciones',
    date: '2022 - 2023',
    description:
      'Trabajé en el desarrollo y optimización de interfaces frontend, mejorando la experiencia del usuario con soluciones creativas, ajustes en el diseño y animaciones interactivas. Implementé efectos visuales para hacer la interfaz más atractiva y funcional, logrando una navegación fluida e intuitiva.',
  },
];

export const EDUCATION_LIST = [
  {
    institution: 'SENA',
    title: 'Análisis y Desarrollo de Software',
    date: '2024 - Actualmente',
  },
  {
    institution: 'Udemy',
    title: 'Desarrollo Web',
    date: '2021 - Actualmente',
    certificationUrl: '/certification-udemy',
  },
];

export const CODE_STRING = `const coder = {
  name: 'Nicolas Garzón',
  experienceLevel: 'Middle Developer',
  skills: ['Next.js', 'React', 'JavaScript',
  'TypeScript', 'MongoDB', 'Figma'],
  hardWorker: true,
  fastLearner: true,
  problemResolver: true,

  hireable: function () {
    return (
      this.hardWorker &&
      this.problemResolver &&
      this.skills.length >= 5
    );
  },
};`;
