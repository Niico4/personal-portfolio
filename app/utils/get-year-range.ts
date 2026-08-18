export const getYearRange = ({
  startDate,
  endDate,
  isCurrent,
}: {
  startDate: string;
  endDate: string | null;
  isCurrent: boolean;
}) => {
  const startYear = new Date(startDate).getUTCFullYear();

  const endYear =
    isCurrent || !endDate ? 'Actualidad' : new Date(endDate).getUTCFullYear();

  return `${startYear} - ${endYear}`;
};
