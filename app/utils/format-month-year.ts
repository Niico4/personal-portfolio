const MONTH_LABELS = [
  'Ene.',
  'Feb.',
  'Mar.',
  'Abr.',
  'May.',
  'Jun.',
  'Jul.',
  'Ago.',
  'Sept.',
  'Oct.',
  'Nov.',
  'Dic.',
] as const;

export const formatMonthYear = (date?: string | Date | null) => {
  if (!date) return 'Actualmente';

  if (date instanceof Date) {
    const month = MONTH_LABELS[date.getMonth()];
    const year = date.getFullYear();

    return `${month} ${year}`;
  }

  const [year, month] = date.split('-');
  const monthIndex = Number(month) - 1;
  const monthLabel = MONTH_LABELS[monthIndex];

  if (!year || !monthLabel) return date;

  return `${monthLabel} ${year}`;
};
