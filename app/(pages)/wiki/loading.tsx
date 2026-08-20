export default function WikiLoading() {
  return (
    <main
      aria-label="Cargando Wiki"
      aria-busy="true"
      className="animate-pulse motion-reduce:animate-none"
    >
      <div className="h-4 w-36 rounded bg-zinc-800" />
      <div className="mt-6 h-12 w-56 rounded-xl bg-zinc-800" />
      <div className="mt-5 h-5 max-w-xl rounded bg-zinc-900" />
      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="aspect-[4/3] rounded-[1.5rem] border border-zinc-800 bg-zinc-900/40"
          />
        ))}
      </div>
    </main>
  );
}
