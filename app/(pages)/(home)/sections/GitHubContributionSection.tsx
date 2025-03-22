'use client';

import React, { useState } from 'react';
import GitHubCalendar from 'react-github-calendar';
import { Tab, Tabs } from '@heroui/tabs';

import SubTitle from '@/components/common/Heading';

const GitHubContribution = () => {
  const [selectedYear, setSelectedYear] = useState(2023);

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2023 + 1 },
    (_, i) => 2023 + i
  );

  return (
    <section className="flex flex-col gap-4">
      <SubTitle
        type="h2"
        title="Cada commit cuenta"
        className="mb-2 text-center sm:text-start"
      />

      <GitHubCalendar
        username="Niico4"
        theme={{ dark: ['rgba(255, 255, 255, 0.08)', '#CD93FF'] }}
        colorScheme="dark"
        year={selectedYear}
        style={{
          color: '#adadad',
          margin: '16px auto',
        }}
        labels={{
          totalCount: `{{count}} contribuciones en ${selectedYear}`,
        }}
      />

      <div className="mx-auto">
        <Tabs
          aria-label="Seleccionar año"
          color="secondary"
          selectedKey={selectedYear.toString()}
          onSelectionChange={(key) =>
            setSelectedYear(parseInt(key as string, 10))
          }
        >
          {years.map((year) => (
            <Tab key={year.toString()} title={year.toString()}></Tab>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default GitHubContribution;
