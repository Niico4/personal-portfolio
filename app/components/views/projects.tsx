import { ProjectIndexItem } from '@/(pages)/projects/components/project-index-item';
import { getProjectList } from '@/sanity/lib/fetchers/project.fetcher';

export const ProjectsView = async () => {
  const projects = await getProjectList();
  return (
    <>
      <header>
        <h1 className="pt-[clamp(2.4rem,6vw,4rem)] pb-[clamp(1.4rem,3vw,2rem)] font-display text-[clamp(2rem,5vw,2.7rem)] leading-[1.08] font-semibold tracking-[-0.035em] text-balance">
          Índice de proyectos
        </h1>
      </header>

      {projects.length > 0 ? (
        <ul className="divide-y divide-border">
          {projects.map((project) => (
            <ProjectIndexItem key={project.id} project={project} />
          ))}
        </ul>
      ) : (
        <p>Todavía no hay proyectos publicados.</p>
      )}
    </>
  );
};
