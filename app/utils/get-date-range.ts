import { formatMonthYear } from './format-month-year';

export const getDateRange = ({
  startDate,
  endDate,
  isCurrent,
}: {
  startDate?: string | Date | null;
  endDate?: string | Date | null;
  isCurrent?: boolean;
}) => {
  const formattedStartDate = formatMonthYear(startDate);
  const formattedEndDate = isCurrent ? 'Actualmente' : formatMonthYear(endDate);

  return `${formattedStartDate} - ${formattedEndDate}`;
};
