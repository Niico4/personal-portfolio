// import type { ComponentType } from 'react';
// import {
//   IconBrandGithub,
//   IconBrandLinkedin,
//   IconCalendarSmile,
//   IconDownload,
//   IconTargetArrow,
// } from '@tabler/icons-react';
// import { Divider } from '@heroui/divider';

// import { getProfile } from '@/sanity/lib/fetchers/profile.fetcher';
// import { poetsenOne } from '@/fonts';
// import { Heading } from '@/components/common/heading';
// import { PortableTextContent } from '@/components/common/portable-text-content';

// import { CopyEmailButton } from '../components/copy-email-button';

// // const AVATAR = {
// //   thinking: '/nico-avatar-thinking.webp',
// // } as const;

// const ACTION_LABELS = {
//   downloadResume: 'Descarga mi currículum',
//   openGithub: 'Mira mi GitHub',
//   openLinkedin: 'Visita mi LinkedIn',
// } as const;

// const STAT_ICONS = [IconTargetArrow, IconCalendarSmile] as const;

// interface ActionLinkProps {
//   href: string;
//   label: string;
//   ariaLabel: string;
//   icon: ComponentType<{
//     stroke?: number;
//     className?: string;
//   }>;
//   download?: string;
//   target?: '_blank';
//   rel?: string;
//   className?: string;
// }

// const ActionLink = ({
//   href,
//   label,
//   ariaLabel,
//   icon: Icon,
//   download,
//   target,
//   rel,
//   className,
// }: ActionLinkProps) => {
//   return (
//     <a
//       href={href}
//       download={download}
//       target={target}
//       rel={rel}
//       aria-label={ariaLabel}
//       className={`group inline-flex items-center gap-3 text-ink-200 hover:text-ink-100 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 ${className ?? ''}`}
//     >
//       <span className="flex size-7 p-[5px] items-center justify-center rounded-lg bg-ink-900 transition-all">
//         <Icon stroke={1.5} className="text-ink-300" />
//       </span>

//       <span>{label}</span>
//     </a>
//   );
// };

// const AboutMeHeroSection = async () => {
//   const profile = await getProfile();

//   if (!profile) return null;

//   const resume = profile.contact_information.resume;

//   const visibleStats = profile.stats.slice(0, 2);

//   const resumeLink = resume.file_url
//     ? {
//         href: `${resume.file_url}?dl=nicolas-garzon-cv.pdf`,
//         download: 'nicolas-garzon-cv.pdf',
//         target: undefined,
//         rel: undefined,
//       }
//     : resume.external_url
//       ? {
//           href: resume.external_url,
//           download: undefined,
//           target: '_blank' as const,
//           rel: 'noopener noreferrer',
//         }
//       : null;

//   return (
//     <section className="flex flex-col gap-8">
//       <header className="mx-auto flex w-full flex-col gap-8 sm:gap-10">
//         {/*
//         <div className="flex w-full justify-center lg:basis-[38%] lg:justify-end">
//           <div className="relative aspect-square w-full max-w-[360px] overflow-hidden">
//             <Image
//               src={AVATAR.thinking}
//               alt="Avatar ilustrado de Nicolás Garzón en pose pensativa"
//               priority
//               draggable={false}
//               fill
//               sizes="(min-width: 1024px) 38vw, 90vw"
//               className="select-none object-contain object-bottom"
//             />

//             <div
//               aria-hidden="true"
//               className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-main via-main/90 to-transparent"
//             />
//           </div>
//         </div>
//         */}

//         <div className="flex w-full max-w-none flex-col gap-5">
//           <Heading>Sobre mi</Heading>
//           <PortableTextContent
//             value={profile.content.description}
//             className="[&_p]:inline"
//           />

//           <ul
//             // role="group"
//             aria-label="Enlaces de contacto"
//             className="grid grid-cols-2 sm:flex sm:items-center sm:gap-5 gap-x-5 gap-y-4"
//           >
//             <li>
//               <ActionLink
//                 href={profile.contact_information.linkedin_url}
//                 label="LinkedIn"
//                 ariaLabel={ACTION_LABELS.openLinkedin}
//                 icon={IconBrandLinkedin}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="underline"
//               />
//             </li>

//             <li>
//               <ActionLink
//                 href={profile.contact_information.github_url}
//                 label="GitHub"
//                 ariaLabel={ACTION_LABELS.openGithub}
//                 icon={IconBrandGithub}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="underline"
//               />
//             </li>

//             {resumeLink && (
//               <li>
//                 <ActionLink
//                   href={resumeLink.href}
//                   label="Currículum"
//                   ariaLabel={ACTION_LABELS.downloadResume}
//                   icon={IconDownload}
//                   download={resumeLink.download}
//                   target={resumeLink.target}
//                   rel={resumeLink.rel}
//                 />
//               </li>
//             )}

//             <li>
//               <CopyEmailButton email={profile.contact_information.email} />
//             </li>
//           </ul>
//           <Divider className="bg-ink-900" />

//           {visibleStats.length > 0 && (
//             <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:flex lg:items-center lg:gap-5">
//               {visibleStats.map((stat, index) => {
//                 const Icon = STAT_ICONS[index];

//                 return (
//                   <div
//                     key={stat.label}
//                     className="flex w-full items-center gap-4 rounded-xl border border-ink-900 p-2 lg:w-auto"
//                   >
//                     <Icon
//                       stroke={1.2}
//                       className="size-12 shrink-0 text-brand-400"
//                     />

//                     <div>
//                       <span
//                         className={`text-3xl text-brand-400 ${poetsenOne.className}`}
//                       >
//                         {stat.prefix} {stat.value} {stat.suffix}
//                       </span>

//                       <p className="text-sm text-ink-300">{stat.label}</p>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>
//       </header>
//     </section>
//   );
// };

// export default AboutMeHeroSection;
