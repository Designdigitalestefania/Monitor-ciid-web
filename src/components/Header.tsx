export function Header() {
  return (
    <header className="border-b border-slate-800 bg-slate-900 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 font-bold text-white">
            M
          </div>
          <div>
            <h1 className="text-base font-bold tracking-wide text-slate-100">
              MONITOR CIID
            </h1>
            <p className="text-xs text-slate-400">
              Centro Inteligente de Información Digital
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="rounded-md bg-red-600 px-2 py-1 text-xs font-bold tracking-wider text-white">
            DEMO
          </span>
          <span className="text-xs text-slate-400">
            Monitor Noticias
          </span>
        </div>
      </div>
    </header>
  );
}
