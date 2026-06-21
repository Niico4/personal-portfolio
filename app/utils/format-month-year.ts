export const formatMonthYear = (date?: string | Date | null) => {
  if (!date) return 'Actualmente';

  if (date instanceof Date) {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${month}.${year}`;
  }

  const [year, month] = date.split('-');

  if (!year || !month) return date;

  return `${month}.${year}`;
};
