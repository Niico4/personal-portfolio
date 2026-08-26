export const TechnologiesContent = () => (
  <div className="flex flex-col">
    <div className="flex gap-4 items-start">
      <span className="mr-0.5 text-xs text-brand-300 sm:text-sm">01</span>

      <div className="flex flex-col gap-2 border-l border-brand-400/40 pl-4 sm:gap-1">
        <h3 className="text-xs font-medium text-content-muted sm:text-sm">
          FRONTEND
        </h3>
        <p className="text-lg text-content-primary">
          TypeScript · React · Next.js · Astro
        </p>

        <p className="text-xs text-content sm:text-sm">
          Construyo interfaces, arquitectura de componentes y experiencias
          fáciles de entender y usar.
        </p>
      </div>
    </div>

    <hr className="my-3 h-px w-full shrink-0 border-none bg-line/10" />

    <div className="flex gap-4 items-start">
      <span className="text-xs text-brand-300 sm:text-sm">02</span>

      <div className="flex flex-col gap-2 border-l border-brand-400/40 pl-4 sm:gap-1">
        <h3 className="text-xs font-medium text-content-muted sm:text-sm">
          BACKEND & DATA
        </h3>
        <p className="text-lg text-content-primary">
          Node.js · Express · PostgreSQL · MongoDB
        </p>

        <p className="text-xs text-content sm:text-sm">
          APIs, lógica de negocio y datos cuando la aplicación lo necesita.
        </p>
      </div>
    </div>

    <hr className="my-3 h-px w-full shrink-0 border-none bg-line/10" />

    <div className="flex gap-4 items-start">
      <span className="text-xs text-brand-300 sm:text-sm">03</span>

      <div className="flex flex-col gap-2 border-l border-brand-400/40 pl-4 sm:gap-1">
        <h3 className="text-xs font-medium text-content-muted sm:text-sm">
          WORKFLOW
        </h3>
        <p className="text-lg text-content-primary">
          Git · GitHub · Docker · Figma
        </p>

        <p className="text-xs text-content sm:text-sm">
          Herramientas que uso para organizar mejor el trabajo y mantener todo
          bajo control.
        </p>
      </div>
    </div>
  </div>
);
