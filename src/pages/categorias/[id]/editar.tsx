import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Sidebar from "../../../components/Siderbar";
import Header from "../../../components/Header";
import { fetchAPI } from "@/utils/connections";

type Category = {
  id: string;
  name: string;
};

export default function EditCategory() {
  const router = useRouter();
  const { id } = router.query;

  const [form, setForm] = useState({
    name: "",
  });

  useEffect(() => {
    if (!id || Array.isArray(id)) return;

    fetchAPI<Category>({
      path: `/categories/${id}`,
      method: "GET",
    })
      .then((data) => {
        if (data) {
          setForm({
            name: data.name,
          });
        }
      })
      .catch((err) => {
        console.error("Erro ao buscar categoria:", err);
      });
  }, [id]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      await fetchAPI({
        path: `/categories/${id}/`,
        method: "PUT",
        body: form,
      });
      alert("Categoria atualizada com sucesso!");
      router.push(`/categorias/${id}/`);
    } catch (err) {
      console.error("Erro ao atualizar categoria:", err);
      alert("Erro ao atualizar categoria.");
    }
  }

  return (
    <div className="flex min-h-screen bg-[#f7f6fc] text-[#1e1e2f]">
      <Sidebar />

      <main className="flex-1 p-10">
        <Header />
        <h1 className="text-2xl font-bold mb-6">Editar Categoria</h1>

        <form
          onSubmit={handleSubmit}
          className="max-w-2xl bg-white border border-[#ede9ff] rounded-xl shadow-md p-8 grid gap-6"
        >
          <div>
            <label className="block mb-1 font-semibold text-[#1e1e2f]">Nome:</label>
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              className="border border-[#d1cafe] bg-white rounded-md p-3 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#816bff]"
              required
            />
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
