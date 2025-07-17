import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Sidebar from "../../components/Siderbar";
import Header from "../../components/Header";
import { fetchAPI } from "@/utils/connections";
import { Product } from "@/types/product";
import { Category } from "@/types/category";
import { Color } from "@/types/color";
import { Metric } from "@/types/metric";

export default function CreateProduct() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    category_id: "",
    color_id: "",
    capacity: "",
    metric_id: "",
    price: "",
  });
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [colors, setColors] = useState<Color[]>([]);
  const [metrics, setMetrics] = useState<Metric[]>([]);

  useEffect(() => {
    async function loadOptions() {
      try {
        const [cats, cols, met] = await Promise.all([
          fetchAPI<Category[]>({ path: "/categories/", method: "GET" }),
          fetchAPI<Color[]>({ path: "/colors/", method: "GET" }),
          fetchAPI<Color[]>({ path: "/metrics/", method: "GET" }),
        ]);
        setCategories(cats);
        setColors(cols);
        setMetrics(met);
      } catch (err) {
        console.error("Erro ao carregar opções:", err);
      }
    }
    loadOptions();
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await fetchAPI<Product>({
        path: "/products/",
        method: "POST",
        body: form,
      });
      alert("Produto cadastrado com sucesso!");
      router.push("/produtos");
    } catch (err) {
      console.error("Erro ao cadastrar produto:", err);
      alert("Erro ao cadastrar produto.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen bg-[#f7f6fc] text-[#1e1e2f]">
      <Sidebar />

      <main className="flex-1 p-10 ml-64">
        <Header />

        <form
          onSubmit={handleSubmit}
          className="grid gap-6 max-w-2xl w-full bg-white border border-[#ede9ff] rounded-xl shadow-md p-8 mt-6"
        >
          <div>
            <label htmlFor="name" className="block mb-1 font-semibold text-[#1e1e2f]">
              Nome do Produto:
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Nome do produto"
              value={form.name}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full border border-[#d1cafe] bg-white text-[#1e1e2f] rounded-md p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#816bff]"
            />
          </div>

          <div>
            <label htmlFor="category_id" className="block mb-1 font-semibold text-[#1e1e2f]">
              Categoria:
            </label>
            <select
              id="category_id"
              name="category_id"
              value={form.category_id}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full border border-[#d1cafe] bg-white text-[#1e1e2f] rounded-md p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#816bff]"
            >
              <option value="">Selecione uma categoria</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="color_id" className="block mb-1 font-semibold text-[#1e1e2f]">
              Cor:
            </label>
            <select
              id="color_id"
              name="color_id"
              value={form.color_id}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full border border-[#d1cafe] bg-white text-[#1e1e2f] rounded-md p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#816bff]"
            >
              <option value="">Selecione uma cor</option>
              {colors.map((col) => (
                <option key={col.id} value={col.id}>
                  {col.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="capacity" className="block mb-1 font-semibold text-[#1e1e2f]">
              Capacidade:
            </label>
            <input
              id="capacity"
              name="capacity"
              type="text"
              placeholder="Capacidade (apenas número)"
              value={form.capacity}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full border border-[#d1cafe] bg-white text-[#1e1e2f] rounded-md p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#816bff]"
            />
          </div>

          <div>
            <label htmlFor="metric_id" className="block mb-1 font-semibold text-[#1e1e2f]">
              Unidade de Medida:
            </label>
            <select
              id="metric_id"
              name="metric_id"
              value={form.metric_id}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full border border-[#d1cafe] bg-white text-[#1e1e2f] rounded-md p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#816bff]"
            >
              <option value="">Selecione uma unidade</option>
              {metrics.map((met) => (
                <option key={met.id} value={met.id}>
                  {met.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="price" className="block mb-1 font-semibold text-[#1e1e2f]">
              Preço:
            </label>
            <input
              id="price"
              name="price"
              type="text"
              placeholder="Preço"
              value={form.price}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full border border-[#d1cafe] bg-white text-[#1e1e2f] rounded-md p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#816bff]"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#816bff] hover:bg-[#6a55e0] text-white font-medium px-6 py-3 rounded-md transition duration-200 shadow-sm disabled:opacity-50"
            >
              {loading ? "Cadastrando..." : "Cadastrar"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
