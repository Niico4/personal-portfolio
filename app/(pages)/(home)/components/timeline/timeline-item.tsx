const TimelineIcon = ({ icon }: { icon: React.ReactNode }) => (
  <div className="relative z-10 flex size-7 items-center justify-center rounded-lg border border-ink-600 bg-ink-900 p-[2px] text-ink-300">
    {icon}
  </div>
);

const TimelineConnector = ({ isLast }: { isLast: boolean }) => {
  return (
    <div className="relative flex min-h-10 w-full flex-1 flex-col items-center">
      <span className="w-px flex-1 bg-ink-50/10" />

      {isLast && (
        <span className="absolute bottom-0 left-1/2 h-px w-4 bg-ink-50/10" />
      )}
    </div>
  );
};

export const TimelineItem = ({
  icon,
  isLast = false,
  children,
}: {
  icon: React.ReactNode;
  isLast?: boolean;
  children: React.ReactNode;
}) => (
  <article className="flex gap-4">
    <div className="flex flex-col items-center self-stretch">
      <TimelineIcon icon={icon} />
      <TimelineConnector isLast={isLast} />
    </div>

    <div className={isLast ? '' : 'pb-4'}>{children}</div>
  </article>
);
