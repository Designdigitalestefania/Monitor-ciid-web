import Link from "next/link";

const NAVEGACION = [
  { href: "/dashboard", label: "Bandeja", icon: "📥" },
  { href: "/dashboard/ingesta", label: "Ingesta", icon: "➕" },
  { href: "/dashboard/archivo", label: "Archivo patrimonial", icon: "🗄️" },
  { href: "/dashboard/metricas", label: "Métricas", icon: "📊" },
];

export function Sidebar() {
  return (
    <aside className="w-64 border-r border-slate-800 bg-slate-900 p-4">
      <nav className="space-y-1">
        {NAVEGACION.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
          >
            <span className="text-base">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="mt-8 rounded-lg border border-slate-800 bg-slate-950 p-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Principio rector
        </p>
        <p className="mt-2 text-xs italic leading-relaxed text-slate-400">
          &ldquo;La tecnología asiste. El periodista decide.&rdquo;
        </p>
      </div>
    </aside>
  );
}
