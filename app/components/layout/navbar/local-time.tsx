'use client';

import { useEffect, useState } from 'react';

const TIME_ZONE = 'America/Bogota';

const timeFormatter = new Intl.DateTimeFormat('es-CO', {
  timeZone: TIME_ZONE,
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hourCycle: 'h23',
});

export function LocalTime() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const update = () => setNow(new Date());

    update();

    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2 text-xs whitespace-nowrap text-fg-subtle">
      <span aria-hidden="true" className="size-1.5 rounded-full bg-brand" />

      <span>Bogotá, CO</span>

      <span aria-hidden="true">·</span>

      <time dateTime={now?.toISOString()} className="font-mono tabular-nums">
        {now ? timeFormatter.format(now) : '--:--:--'}
      </time>
    </div>
  );
}
