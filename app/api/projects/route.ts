import { NextResponse } from 'next/server';

import { db } from '@/utils/prisma';

const formatTechnologies = (technologies: string | string[]) => {
  if (
    !technologies ||
    (Array.isArray(technologies) && technologies.length === 0)
  ) {
    throw new Error('Debe haber al menos una tecnología');
  }

  return Array.isArray(technologies)
    ? technologies
    : technologies.split(',').map((tech: string) => tech.trim());
};

export async function GET() {
  try {
    const projects = await db.project.findMany();
    return NextResponse.json(projects);
  } catch (error) {
    console.error(error);
    const errorMessage =
      error instanceof Error ? error.message : 'Error desconocido';
    return NextResponse.json(
      {
        error: errorMessage,
      },
      { status: 500 },
    );
  }
}

export const POST = async (req: Request) => {
  try {
    const {
      description,
      features,
      image,
      isDev,
      repository,
      slug,
      technologies,
      title,
      web_site,
    } = await req.json();

    if (
      !description ||
      !image ||
      !slug ||
      !technologies ||
      !title ||
      isDev === null
    ) {
      return NextResponse.json(
        { error: 'Faltan campos obligatorios.' },
        { status: 400 },
      );
    }

    const formattedTechnologies = formatTechnologies(technologies);

    const newProject = await db.project.create({
      data: {
        description,
        features,
        image,
        isDev,
        repository,
        slug,
        technologies: formattedTechnologies,
        title,
        web_site,
      },
    });

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error(error);
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'No se pudo crear el proyecto. Asegúrese de que todos los campos estén completos y vuelva a intentarlo.';
    return NextResponse.json(
      {
        error: errorMessage,
      },
      { status: 500 },
    );
  }
};
