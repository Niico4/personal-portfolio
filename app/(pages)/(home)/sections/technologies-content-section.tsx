export const TechnologiesContent = () => (
  <div className="flex flex-col">
    <div className="flex gap-4 items-start">
      <span className="text-xs text-brand-300/70 mr-0.5 sm:text-sm">01</span>

      <div className="flex flex-col gap-2 border-l border-brand-400/30 pl-4 sm:gap-1">
        <h3 className="text-xs text-zinc-500 sm:text-sm">FRONTEND</h3>
        <p className="text-zinc-300 text-lg">
          TypeScript · React · Next.js · Astro
        </p>

        <p className="text-xs text-zinc-400 sm:text-sm">
          Construyo interfaces, arquitectura de componentes y experiencias
          fáciles de entender y usar.
        </p>
      </div>
    </div>

    <hr className="shrink-0 bg-zinc-900 border-none w-full h-[1px] my-3" />

    <div className="flex gap-4 items-start">
      <span className="text-xs text-brand-300/70 sm:text-sm">02</span>

      <div className="flex flex-col gap-2 border-l border-brand-400/30 pl-4 sm:gap-1">
        <h3 className="text-xs text-zinc-500 sm:text-sm">BACKEND & DATA</h3>
        <p className="text-zinc-300 text-lg">
          Node.js · Express PostgreSQL · MongoDB
        </p>

        <p className="text-xs text-zinc-400 sm:text-sm">
          APIs, lógica de negocio y datos cuando la aplicación lo necesita.
        </p>
      </div>
    </div>

    <hr className="shrink-0 bg-zinc-900 border-none w-full h-[1px] my-3" />

    <div className="flex gap-4 items-start">
      <span className="text-xs text-brand-300/70 sm:text-sm">03</span>

      <div className="flex flex-col gap-2 border-l border-brand-400/30 pl-4 sm:gap-1">
        <h3 className="text-xs text-zinc-500 sm:text-sm">WORKFLOW</h3>
        <p className="text-zinc-300 text-lg">Git · GitHub · Docker · Figma</p>

        <p className="text-xs text-zinc-400 sm:text-sm">
          Herramientas que uso para organizar mejor el trabajo y mantener todo
          bajo control.
        </p>
      </div>
    </div>
  </div>
);
