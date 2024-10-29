import { NextResponse } from 'next/server';

import { db } from '@/app/utils/prisma';

const formatTechnologies = (technologies: string | string[]) => {
  if (Array.isArray(technologies)) {
    return technologies.map((tech) => tech.trim().toLowerCase());
  }

  return technologies
    .split(',')
    .map((tech: string) => tech.trim().toLowerCase());
};

export async function GET() {
  try {
    const projects = await db.project.findMany();
    return NextResponse.json(projects);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error:
          'No se pudieron recuperar los proyectos. Por favor, intente nuevamente más tarde.',
      },
      { status: 500 }
    );
  }
}

export const POST = async (req: Request) => {
  try {
    const { title, description, image, repository, technologies, web_site } =
      await req.json();

    const formattedTechnologies = formatTechnologies(technologies);

    const newProject = await db.project.create({
      data: {
        title,
        description,
        image,
        repository,
        technologies: formattedTechnologies,
        web_site,
      },
    });

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error:
          'No se pudo crear el proyecto. Asegúrese de que todos los campos estén completos y vuelva a intentarlo.',
      },
      { status: 500 }
    );
  }
};
