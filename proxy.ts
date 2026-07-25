import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { getPublicNote, getPublicNotebook } from '@/(pages)/wiki/lib/wiki-data';
import { getWikiNotePath } from '@/(pages)/wiki/lib/wiki-format';
import { isWikiNotionIdKey } from '@/(pages)/wiki/lib/wiki-mappers';

const getPermanentRedirect = (
  request: NextRequest,
  pathname: string,
): NextResponse => {
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  url.search = '';

  return NextResponse.redirect(url, 308);
};

export const proxy = async (request: NextRequest): Promise<NextResponse> => {
  const segments = request.nextUrl.pathname.split('/').filter(Boolean);
  const notebookIdentifier = segments[1];
  const noteIdentifier = segments[2];

  if (segments.length === 3 && notebookIdentifier && noteIdentifier) {
    const result = await getPublicNote(notebookIdentifier, noteIdentifier);

    if (!result) {
      return NextResponse.next({ status: 404 });
    }

    if (
      isWikiNotionIdKey(notebookIdentifier) ||
      isWikiNotionIdKey(noteIdentifier)
    ) {
      return getPermanentRedirect(
        request,
        getWikiNotePath(result.notebook.slug, result.note.slug),
      );
    }
  }

  if (segments.length === 2 && notebookIdentifier) {
    const notebook = await getPublicNotebook(notebookIdentifier);

    if (!notebook) {
      return NextResponse.next({ status: 404 });
    }

    if (isWikiNotionIdKey(notebookIdentifier)) {
      return getPermanentRedirect(request, `/wiki/${notebook.slug}`);
    }
  }

  return NextResponse.next();
};

export const config = {
  matcher: '/wiki/:path*',
};
