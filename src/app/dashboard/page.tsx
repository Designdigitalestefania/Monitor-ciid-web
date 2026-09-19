import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { BandejaExpedientes } from "@/components/BandejaExpedientes";
import { EXPEDIENTES_DEMO } from "@/lib/mock-data";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-100">Bandeja de expedientes</h1>
            <p className="mt-1 text-sm text-slate-400">
              Información que ha entrado al ecosistema CIID y está siendo procesada.
            </p>
          </div>
          <BandejaExpedientes expedientes={EXPEDIENTES_DEMO} />
        </main>
      </div>
    </div>
  );
}
