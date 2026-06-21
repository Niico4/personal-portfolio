import { formatMonthYear } from './format-month-year';

export const getJobDateRange = ({
  startDate,
  endDate,
  isCurrentJob,
}: {
  startDate?: string | Date | null;
  endDate?: string | Date | null;
  isCurrentJob?: boolean;
}) => {
  const formattedStartDate = formatMonthYear(startDate);
  const formattedEndDate = isCurrentJob
    ? 'Actualmente'
    : formatMonthYear(endDate);

  return `${formattedStartDate} - ${formattedEndDate}`;
};
