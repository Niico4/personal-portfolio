export const calculateDuration = ({
  startDate,
  endDate,
  isCurrent,
}: {
  startDate?: string | Date | null;
  endDate?: string | Date | null;
  isCurrent?: boolean;
}) => {
  if (!startDate) return null;

  const parseDate = (date: string | Date) => {
    if (date instanceof Date) {
      return {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
      };
    }

    const [year, month] = date.split('-').map(Number);

    return { year, month };
  };

  const start = parseDate(startDate);
  const end =
    isCurrent || !endDate ? parseDate(new Date()) : parseDate(endDate);

  const totalMonths =
    (end.year - start.year) * 12 + (end.month - start.month) + 1;

  if (totalMonths <= 0) return null;

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  const yearLabel = years === 1 ? 'año' : 'años';
  const monthLabel = months === 1 ? 'mes' : 'meses';

  if (years > 0 && months > 0) {
    return `${years} ${yearLabel} y ${months} ${monthLabel}`;
  }

  if (years > 0) {
    return `${years} ${yearLabel}`;
  }

  return `${months} ${monthLabel}`;
};
