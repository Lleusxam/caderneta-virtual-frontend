import { useState } from "react";
import { useRouter } from "next/router";
import Sidebar from "../../components/Siderbar";
import Header from "../../components/Header";
import { fetchAPI } from "@/utils/connections";
import { Category } from "@/types/category";

export default function CreateCategory() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "" });
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await fetchAPI<Category>({
        path: "/categories/",
        method: "POST",
        body: form,
      });
      alert("Categoria criada com sucesso!");
      router.push("/categorias");
    } catch (err) {
      console.error("Erro ao criar categoria:", err);
      alert("Erro ao criar categoria.");
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
              Nome da Categoria:
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Nome da categoria"
              value={form.name}
              onChange={handleChange}
              className="w-full border border-[#d1cafe] bg-white text-[#1e1e2f] rounded-md p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#816bff]"
              required
              disabled={loading}
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
