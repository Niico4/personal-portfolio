import WorkExperienceSection from '../../components/sections/work-experience-section';

import AboutMeHeroSection from './sections/about-me-hero-section';
import EducationSection from './sections/education-section';
import SkillsSection from './sections/skills-section';

// TODO
// export const metadata: Metadata = {
//   title: {
//     absolute: 'Nicolás Garzón | Desarrollador Full Stack',
//   },
//   description:
//     'Construyo productos web completos con React, Next.js y Node.js: interfaces claras, APIs bien estructuradas y soluciones pensadas desde el problema.',
//   alternates: {
//     canonical: '/',
//   },
//   openGraph: {
//     title: 'Nicolás Garzón | Desarrollador Full Stack',
//     description:
//       'Construyo productos web completos con React, Next.js y Node.js: interfaces claras, APIs bien estructuradas y soluciones pensadas desde el problema.',
//     url: '/',
//     type: 'website',
//     // TODO: images: [
//     //   {
//     //     url: '/seo/og-home.png',
//     //     width: 1200,
//     //     height: 630,
//     //     alt: 'Portfolio de Nicolás Garzón',
//     //   },
//     // ],
//   },
//   twitter: {
//     card: 'summary_large_image',
//     title: 'Nicolás Garzón | Desarrollador Full Stack',
//     description:
//       'Construyo productos web completos con React, Next.js y Node.js: interfaces claras, APIs bien estructuradas y soluciones pensadas desde el problema.',
//     // TODO: images: ['/seo/og-home.png'],
//   },
// };

const HomePage = () => {
  return (
    <div className="flex flex-col gap-20 mx-auto">
      <AboutMeHeroSection />
      <EducationSection />
      <WorkExperienceSection />
      <SkillsSection />
    </div>
  );
};

export default HomePage;
