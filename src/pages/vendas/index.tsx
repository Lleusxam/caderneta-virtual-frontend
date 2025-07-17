// src/pages/vendas.tsx
import { useEffect, useState } from "react";
import Sidebar from "@/components/Siderbar";
import Header from "@/components/Header";
import HeaderSales from "@/components/sales/HeaderSales";
import { fetchAPI } from "@/utils/connections";
import { User } from "@/types/user";
import { SoldProduct } from "@/types/sold_product";

interface Sale {
  id: string;
  customer: User;
  sale_date: string;
  installments_quantity: number;
  sold_products: SoldProduct[];
}

export default function ListSales() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSales() {
      try {
        const data = await fetchAPI<Sale[]>({ path: "/sales", method: "GET" });

        console.log("Vendas carregadas:", data);

        setSales(data);
      } catch (err) {
        console.error("Erro ao buscar vendas:", err);
        alert("Erro ao buscar vendas.");
      } finally {
        setLoading(false);
      }
    }
    loadSales();
  }, []);

  return (
    <div className="flex min-h-screen bg-[#f7f6fc] text-[#1e1e2f]">
      <Sidebar />

      <main className="flex-1 p-10 ml-64 space-y-6">
        <Header />
        <HeaderSales />

        <div className="bg-white rounded-xl shadow-md p-6 border border-[#ede9ff]">
          {/* filtros (ainda sem lógica) */}
          <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
            <select className="border border-[#d1cafe] bg-[#f7f6fc] text-[#1e1e2f] rounded-md p-2 w-full md:w-48 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#816bff]">
              <option>Data</option>
              <option>Comprador</option>
            </select>

            <input
              type="text"
              placeholder="Digite para buscar"
              className="border border-[#d1cafe] bg-white text-[#1e1e2f] rounded-md p-2 w-full flex-1 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#816bff]"
            />

            <button className="bg-[#816bff] hover:bg-[#6a55e0] text-white font-medium rounded-md px-6 py-2 transition duration-200 shadow-sm">
              Buscar
            </button>
          </div>

          {loading ? (
            <p className="text-center text-[#666]">Carregando vendas...</p>
          ) : (
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="text-left bg-[#f1effb]">
                  <th className="p-3 border-b border-[#ede9ff]">Data</th>
                  <th className="p-3 border-b border-[#ede9ff]">Comprador</th>
                  <th className="p-3 border-b border-[#ede9ff]">Parcelas</th>
                  <th className="p-3 border-b border-[#ede9ff]">Produtos</th>
                  <th className="p-3 border-b border-[#ede9ff]">Ação</th>
                </tr>
              </thead>
              <tbody>
                {sales.map((s) => (
                  <tr key={s.id} className="hover:bg-[#f9f9fc]">
                    <td className="p-3 border-b border-[#ede9ff]">
                      {new Date(s.sale_date).toLocaleString("pt-BR", {
                        dateStyle: "short",
                        timeStyle: "short",
                      })}
                    </td>
                    <td className="p-3 border-b border-[#ede9ff]">{s.customer.name}</td>
                    <td className="p-3 border-b border-[#ede9ff]">{s.installments_quantity}</td>
                    <td className="p-3 border-b border-[#ede9ff]">
                      {
                        s.sold_products.map((sp) => sp.product.name).join(", ")
                      }
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}
