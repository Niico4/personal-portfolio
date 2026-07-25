export const formatWikiDate = (value: string | null): string | null => {
  if (!value) {
    return null;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return new Intl.DateTimeFormat('es-CO', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
};

export const getWikiNotePath = (
  notebookSlug: string,
  noteSlug: string,
): `/wiki/${string}/${string}` => `/wiki/${notebookSlug}/${noteSlug}`;
