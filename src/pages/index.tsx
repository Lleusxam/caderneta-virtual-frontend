// src/index.tsx
import Sidebar from "../components/Siderbar";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-[#f7f6fc] text-[#1e1e2f] fixed">
      <Sidebar />

      <main className="flex-1 p-10 ml-64 space-y-6">
        <Header />

        <section className="bg-white rounded-xl shadow-md p-8 border border-[#ede9ff] max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Caderneta Virtual de Vendas</h1>
          <p className="text-[#5e5e7f] mb-6">
            Plataforma para gerenciar as vendas da sua loja e acompanhar as dívidas dos seus clientes de forma prática e segura. 
            Seus clientes podem visualizar suas compras e débitos a qualquer momento.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#816bff] text-white rounded-lg p-6 shadow">
              <h2 className="text-xl font-semibold mb-2">Gerenciar Vendas</h2>
              <p>Cadastre e controle todas as vendas realizadas na sua loja.</p>
            </div>
            <div className="bg-[#816bff] text-white rounded-lg p-6 shadow">
              <h2 className="text-xl font-semibold mb-2">Acompanhar Dívidas</h2>
              <p>Monitore os débitos e pagamentos pendentes dos seus clientes.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
