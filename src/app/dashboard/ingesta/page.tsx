import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { FormularioIngesta } from "@/components/FormularioIngesta";

export default function IngestaPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-100">Ingesta manual</h1>
            <p className="mt-1 text-sm text-slate-400">
              Ingresa información al pipeline CIID con trazabilidad completa.
            </p>
          </div>
          <FormularioIngesta />
        </main>
      </div>
    </div>
  );
}
