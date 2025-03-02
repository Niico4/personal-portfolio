'use client';

import React, { useState } from 'react';
import { Grandstander } from 'next/font/google';
import GitHubCalendar from 'react-github-calendar';
import { Select, SelectItem } from '@heroui/select';

const grandstander = Grandstander({
  subsets: ['latin'],
  display: 'swap',
});

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
    <section className="flex flex-col gap-10">
      <div className="flex flex-col justify-between md:items-center md:flex-row max-sm:gap-4">
        <h2 className={`title-section ${grandstander.className}`}>
          Cada commit cuenta
        </h2>
        <Select
          color="secondary"
          variant="faded"
          aria-label="Select the year"
          className="w-2/5 md:w-[12%]"
          placeholder={selectedYear.toString()}
          value={selectedYear.toString()}
          onChange={handleYearChange}
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
        theme={{ dark: ['#373131', '#ea83fa'] }}
        colorScheme="dark"
        year={selectedYear}
        style={{
          color: '#E6E6E7',
          margin: '16px auto',
        }}
        labels={{
          totalCount: `{{count}} contribuciones en ${selectedYear}`,
        }}
      />
    </section>
  );
};

export default GitHubContribution;
