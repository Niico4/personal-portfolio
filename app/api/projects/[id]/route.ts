import { NextResponse } from 'next/server';

import { db } from '@/utils/prisma';

const resMessage = (message: string, status: number) => {
  return NextResponse.json({ message }, { status });
};

export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const id = url.pathname.split('/').pop();

  if (!id) {
    return resMessage(
      'No se proporcionó un ID válido para eliminar el proyecto.',
      400
    );
  }

  try {
    const deletedProject = await db.project.delete({
      where: { id },
    });

    if (!deletedProject) {
      return resMessage('No se encontró el proyecto.', 404);
    }

    return resMessage('El proyecto se ha eliminado con éxito.', 200);
  } catch (error) {
    console.error(error);

    return resMessage(
      'Se produjo un error al intentar eliminar el proyecto. Por favor, intente nuevamente.',
      500
    );
  }
}
