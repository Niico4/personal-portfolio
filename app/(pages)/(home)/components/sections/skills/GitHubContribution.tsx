'use client';

import { Select, SelectItem } from '@nextui-org/react';
import { IconCalendarMonth } from '@tabler/icons-react';
import React, { useState } from 'react';
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
  return (
    <article className="w-[90%] flex flex-col items-end gap-10 mx-auto">
      <div className="w-full flex items-center justify-between">
        <h2 className="text-IColorSecondary text-2xl font-semibold">
          Mi Huella en GitHub
        </h2>
        <Select
          placeholder={selectedYear.toString()}
          value={selectedYear.toString()}
          onChange={handleYearChange}
          aria-label="Select the year"
          className="w-[12%]"
          startContent={<IconCalendarMonth />}
          size="sm"
        >
          {years.map((year) => (
            <SelectItem key={year}>{year.toString()}</SelectItem>
          ))}
        </Select>
      </div>

      <GitHubCalendar
        username="Niico4"
        year={selectedYear}
        style={{ color: '#e1e1e1', width: '100%', margin: '0 auto' }}
        labels={{
          totalCount: `{{count}} contribuciones en ${selectedYear}`,
        }}
      />
    </article>
  );
};

export default GitHubContribution;
