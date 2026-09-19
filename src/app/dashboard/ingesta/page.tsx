import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";

export default function IngestaPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold text-slate-100">Ingesta manual</h1>
          <p className="mt-2 text-sm text-slate-400">
            Próximamente: formulario para crear expedientes manualmente.
          </p>
        </main>
      </div>
    </div>
  );
}
