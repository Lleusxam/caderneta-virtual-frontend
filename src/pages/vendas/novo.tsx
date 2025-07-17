import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Sidebar from "../../components/Siderbar";
import Header from "../../components/Header";
import Select, { SingleValue } from "react-select";
import { fetchAPI } from "@/utils/connections";
import { Product } from "@/types/product";

// —— tipos vindos da API ————————————————————————————
type User = {
  id: string;
  name: string;
};

type SaleForm = {
  customerId: string; // ID do comprador
  date: string;
  installments: number;
  products: Product[];
};

export default function CreateSale() {
  const router = useRouter();

  // —— estado principal ——————————————————————————
  const [form, setForm] = useState<SaleForm>({
    customerId: "",
    date: "",
    installments: 1,
    products: [],
  });

  // dados externos
  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  // selects
  const [selectedProduct, setSelectedProduct] = useState<SingleValue<Product>>(null);
  const [selectedUser, setSelectedUser] = useState<SingleValue<User>>(null);

  const [loading, setLoading] = useState(false);

  // —— carrega produtos e usuários ——————————————————
  useEffect(() => {
    async function loadData() {
      try {
        const [prodData, userData] = await Promise.all([
          fetchAPI<Product[]>({ path: "/products", method: "GET" }),
          fetchAPI<User[]>({ path: "/users", method: "GET" }),
        ]);
        setProducts(prodData);
        setUsers(userData);
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
        alert("Erro ao buscar produtos ou usuários.");
      }
    }

    loadData();
  }, []);

  // —— handlers ————————————————————————————————
  function handleAddProduct() {
    if (!selectedProduct) return;
    setForm((prev) => ({
      ...prev,
      products: [...prev.products, selectedProduct as Product],
    }));
    setSelectedProduct(null);
  }

  function handleRemoveProduct(index: number) {
    setForm((prev) => ({
      ...prev,
      products: prev.products.filter((_, i) => i !== index),
    }));
  }

  const total = form.products.reduce((sum, p) => sum + Number(p.price), 0);

  // —— submit ————————————————————————————————
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!selectedUser) {
      alert("Selecione um comprador.");
      return;
    }

    if (!form.products.length) {
      alert("Adicione ao menos um produto.");
      return;
    }

    setLoading(true);
    try {
      await fetchAPI({
        path: "/sales/",
        method: "POST",
        body: {
          customer_id: selectedUser.id,
          sale_date: form.date,
          installments_quantity: form.installments,
          sold_products_ids: form.products.map((p) => p.id),
        },
      });

      alert("Venda cadastrada com sucesso!");
      router.push("/vendas");
    } catch (err) {
      console.error("Erro ao cadastrar venda:", err);
      alert("Erro ao cadastrar venda.");
    } finally {
      setLoading(false);
    }
  }

  // —— UI ———————————————————————————————————————
  return (
    <div className="flex min-h-screen bg-[#f7f6fc] text-[#1e1e2f]">
      <Sidebar />

      <main className="flex-1 p-10 ml-64">
        <Header />

        <form
          onSubmit={handleSubmit}
          className="grid gap-6 max-w-2xl w-full bg-white border border-[#ede9ff] rounded-xl shadow-md p-8 mt-6"
        >
          {/* comprador */}
          <div>
            <label className="block mb-1 font-semibold">Comprador:</label>
            <Select<User, false>
              options={users}
              value={selectedUser}
              onChange={(opt) => setSelectedUser(opt)}
              getOptionLabel={(u) => u.name}
              getOptionValue={(u) => u.id}
              placeholder="Buscar comprador..."
              isDisabled={loading}
              isSearchable
            />
          </div>

          {/* data */}
          <div>
            <label htmlFor="date" className="block mb-1 font-semibold">
              Data da venda:
            </label>
            <input
              id="date"
              name="date"
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="w-full border border-[#d1cafe] rounded-md p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#816bff]"
              required
              disabled={loading}
            />
          </div>

          {/* parcelas */}
          <div>
            <label htmlFor="installments" className="block mb-1 font-semibold">
              Quantidade de parcelas:
            </label>
            <input
              id="installments"
              name="installments"
              type="number"
              min={1}
              value={form.installments}
              onChange={(e) => setForm({ ...form, installments: Number(e.target.value) })}
              className="w-full border border-[#d1cafe] rounded-md p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#816bff]"
              required
              disabled={loading}
            />
          </div>

          {/* produtos */}
          <div>
            <label className="block mb-1 font-semibold">Produtos:</label>
            <div className="flex">
              <Select<Product, false>
                options={products}
                value={selectedProduct}
                onChange={(opt) => setSelectedProduct(opt)}
                getOptionLabel={(p) => p.name}
                getOptionValue={(p) => p.id.toString()}
                placeholder="Buscar produto..."
                className="me-2 flex-1"
                isDisabled={loading}
                isSearchable
              />
              <button
                type="button"
                onClick={handleAddProduct}
                disabled={!selectedProduct || loading}
                className="bg-[#816bff] hover:bg-[#6a55e0] text-white font-medium px-5 py-3 rounded-md transition disabled:opacity-50"
              >
                +
              </button>
            </div>
          </div>

          {/* lista de itens */}
          {!!form.products.length && (
            <div className="border border-[#d1cafe] rounded-md p-4">
              {form.products.map((p, i) => (
                <div
                  key={`${p.id}-${i}`}
                  className="flex justify-between items-center mb-2 last:mb-0"
                >
                  <span>
                    1× {p.name} — R$ {Number(p.price).toFixed(2)}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveProduct(i)}
                    className="text-sm text-red-600 hover:underline"
                  >
                    remover
                  </button>
                </div>
              ))}

              <hr className="my-2" />
              <div className="font-semibold text-right">
                Total: R$ {total.toFixed(2)}
              </div>
            </div>
          )}

          {/* submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#816bff] hover:bg-[#6a55e0] text-white font-medium px-6 py-3 rounded-md transition disabled:opacity-50"
            >
              {loading ? "Salvando..." : "Cadastrar"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
