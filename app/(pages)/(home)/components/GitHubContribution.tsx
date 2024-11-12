'use client';

import React, { useState } from 'react';
import { Select, SelectItem } from '@nextui-org/react';
import { IconCalendarMonth } from '@tabler/icons-react';
import GitHubCalendar from 'react-github-calendar';

const GitHubContribution = () => {
  const [selectedYear, setSelectedYear] = useState(2023);

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2022 + 1 },
    (_, i) => 2022 + i
  );

  const handleYearChange = (event: { target: { value: string } }) => {
    setSelectedYear(parseInt(event.target.value, 10));
  };

  const colourTheme = {
    dark: ['#161B22', '#ea83fa'],
  };

  return (
    <article className="flex flex-col gap-10">
      <div className="flex items-center justify-between">
        <h2 className="text-IColorSecondary text-2xl font-semibold">
          Mi Huella en GitHub
        </h2>
        <Select
          color="secondary"
          placeholder={selectedYear.toString()}
          value={selectedYear.toString()}
          onChange={handleYearChange}
          aria-label="Select the year"
          startContent={<IconCalendarMonth />}
          className="w-28"
          size="sm"
        >
          {years.map((year) => (
            <SelectItem key={year} color="secondary" variant="flat">
              {year.toString()}
            </SelectItem>
          ))}
        </Select>
      </div>

      <GitHubCalendar
        username="Niico4"
        theme={colourTheme}
        colorScheme="dark"
        year={selectedYear}
        style={{
          color: '#f3f3f3',
          width: '100%',
          margin: '0 auto',
        }}
        labels={{
          totalCount: `{{count}} contribuciones en ${selectedYear}`,
        }}
      />
    </article>
  );
};

export default GitHubContribution;
