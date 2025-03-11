'use client';

import React, { useState } from 'react';
import GitHubCalendar from 'react-github-calendar';
import { Select, SelectItem } from '@heroui/select';

import SubTitle from '@/components/common/SubTitle';

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
    <section className="flex flex-col gap-3">
      <SubTitle title="Cada commit cuenta" className="mb-6" />
      <div className="flex items-center justify-center order-2">
        <Select
          color="secondary"
          variant="bordered"
          aria-label="Seleccionar el año"
          size="sm"
          className="w-2/5 md:w-[15%] min-[1500px]:w-[10%]"
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
