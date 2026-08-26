import React from 'react';

export const SectionLabel = ({ label }: { label: string }) => {
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0">
        <div className="size-1.5 rounded-full bg-content-muted" />

        <div className="h-px w-6 rounded-full bg-content-muted" />
      </div>

      <p className="text-sm italic text-content-muted">{label}</p>
    </div>
  );
};
