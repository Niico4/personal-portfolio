import React from 'react';

export const SectionLabel = ({ label }: { label: string }) => {
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0">
        {/* Círculo */}
        <div className="size-1.5 rounded-full bg-zinc-500" />

        {/* Línea */}
        <div className="w-6 h-[1px] rounded-full bg-zinc-500" />
      </div>

      <p className="text-zinc-400 italic text-sm">{label}</p>
    </div>
  );
};
