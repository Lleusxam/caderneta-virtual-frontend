import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Sidebar from "../../../components/Siderbar";
import Header from "../../../components/Header";
import { consortia } from "../../../data/consortia"; // Substitua com seu array real
import { products } from "../../../data/products";

export default function EditConsortium() {
  const router = useRouter();
  const { id } = router.query;

  const [form, setForm] = useState({
    nome: "",
    produto: "",
    valorTotal: "",
    parcelas: "",
    dataInicio: "",
  });

  useEffect(() => {
    if (id) {
      const consortium = consortia.find((c) => c.id === id);
      if (consortium) {
        setForm({
          nome: consortium.nome,
          produto: consortium.produto,
          valorTotal: consortium.valor_total,
          parcelas: consortium.quantidade_parcelas,
          dataInicio: consortium.data,
        });
      }
    }
  }, [id]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Consórcio atualizado:", form);
    alert("Consórcio atualizado com sucesso!");
    router.push(`/consorcios/${id}`);
  }

  return (
    <div className="flex min-h-screen bg-[#f7f6fc] text-[#1e1e2f]">
      <Sidebar />

      <main className="flex-1 p-10 ml-64">
        <Header />
        <h1 className="text-2xl font-bold mb-6">Editar Consórcio</h1>

        <form
          onSubmit={handleSubmit}
          className="grid gap-6 max-w-4xl bg-white border border-[#ede9ff] rounded-xl shadow-md p-8"
        >
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block mb-1 font-semibold text-[#1e1e2f]">
                Nome do consórcio:
              </label>
              <input
                id="name"
                name="nome"
                type="text"
                value={form.nome}
                onChange={handleChange}
                className="border border-[#d1cafe] bg-white rounded-md p-3 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#816bff]"
              />
            </div>

            <div>
              <label htmlFor="product" className="block mb-1 font-semibold text-[#1e1e2f]">
                Produto:
              </label>
              <select
                id="product"
                name="produto"
                value={form.produto}
                onChange={handleChange}
                className="border border-[#d1cafe] bg-white rounded-md p-3 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#816bff]"
              >
                <option value="">Selecione um produto</option>
                {products.map((product) => (
                  <option key={product.id} value={product.nome}>
                    {product.nome}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="total_value" className="block mb-1 font-semibold text-[#1e1e2f]">
                Valor Total:
              </label>
              <input
                id="total_value"
                name="valorTotal"
                type="number"
                value={form.valorTotal}
                onChange={handleChange}
                placeholder="ex: 1200.00"
                className="border border-[#d1cafe] bg-white rounded-md p-3 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#816bff]"
              />
            </div>

            <div>
              <label htmlFor="installment" className="block mb-1 font-semibold text-[#1e1e2f]">
                Parcelas:
              </label>
              <input
                id="installment"
                name="parcelas"
                type="number"
                value={form.parcelas}
                onChange={handleChange}
                placeholder="ex: 12"
                className="border border-[#d1cafe] bg-white rounded-md p-3 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#816bff]"
              />
            </div>

            <div>
              <label htmlFor="start_date" className="block mb-1 font-semibold text-[#1e1e2f]">
                Data de Início:
              </label>
              <input
                id="start_date"
                name="dataInicio"
                type="date"
                value={form.dataInicio}
                onChange={handleChange}
                className="border border-[#d1cafe] bg-white rounded-md p-3 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#816bff]"
              />
            </div>
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
