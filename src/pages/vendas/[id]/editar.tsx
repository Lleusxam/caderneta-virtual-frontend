import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Sidebar from "../../../components/Siderbar";
import Header from "../../../components/Header";
import sales from "../../../data/sales";
import Select from "react-select";

const products = [
  { value: 'garrafa_rosa_325ml', label: 'Garrafa Rosa 325 ml' },
  { value: 'caneca_branca', label: 'Caneca Branca' },
  { value: 'camiseta_preta_p', label: 'Camiseta Preta P' },
];

export default function EditSale() {
  const router = useRouter();
  const { id } = router.query;

  const [formData, setFormData] = useState({
    cliente: "",
    data: "",
    quantidade_parcelas: "",
    produtos: "",
  });

  useEffect(() => {
    if (id) {
      const sale = sales.find((v) => v.id === id);
      if (sale) {
        setFormData({
          cliente: sale.cliente,
          data: sale.data,
          quantidade_parcelas: sale.quantidade_parcelas,
          produtos: sale.produtos,
        });
      }
    }
  }, [id]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Venda atualizada:", formData);
    alert("Venda atualizada com sucesso!");
    router.push(`/vendas/${id}`);
  }

  return (
    <div className="flex min-h-screen bg-[#f7f6fc] text-[#1e1e2f]">
      <Sidebar />

      <main className="flex-1 p-10 ml-64">
        <Header />
        <h1 className="text-2xl font-bold mb-6">Editar Venda</h1>

        <form
          onSubmit={handleSubmit}
          className="grid gap-6 max-w-2xl bg-white border border-[#ede9ff] rounded-xl shadow-md p-8"
        >
          <div>
            <label htmlFor="customer" className="block mb-1 font-semibold text-[#1e1e2f]">
              Cliente:
            </label>
            <input
              id="customer"
              name="cliente"
              type="text"
              value={formData.cliente}
              onChange={handleChange}
              className="border border-[#d1cafe] bg-white rounded-md p-3 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#816bff]"
            />
          </div>

          <div>
            <label htmlFor="date" className="block mb-1 font-semibold text-[#1e1e2f]">
              Data:
            </label>
            <input
              id="date"
              name="data"
              type="date"
              value={formData.data}
              onChange={handleChange}
              className="border border-[#d1cafe] bg-white rounded-md p-3 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#816bff]"
            />
          </div>

          <div>
            <label htmlFor="installment" className="block mb-1 font-semibold text-[#1e1e2f]">
              Parcelas:
            </label>
            <input
              id="installment"
              name="quantidade_parcelas"
              type="number"
              value={formData.quantidade_parcelas}
              onChange={handleChange}
              className="border border-[#d1cafe] bg-white rounded-md p-3 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#816bff]"
            />
          </div>

          <div>
            <label htmlFor="products" className="block mb-1 font-semibold text-[#1e1e2f]">
              Produtos:
            </label>
            <div className="flex">
              <Select
                id="products"
                options={products}
                className="me-2 w-full"
                placeholder="Buscar produto(s)..."
              />
              <button
                type="submit"
                className="bg-[#816bff] hover:bg-[#6a55e0] text-white font-medium px-6 py-3 rounded-md transition duration-200 shadow-sm"
              >
                +
              </button>
            </div>
          </div>
          <div>
            1x Garrafa EcoTupper azul 325 ml <br/>
            1x Pote Cristalwave rosa 1,2 L <br/>
            ...
          </div>
          <div>
            Valor total: <br/>
            120,00
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-md shadow-sm transition"
            >
              Salvar
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
