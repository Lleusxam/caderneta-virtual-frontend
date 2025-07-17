// src/pages/usuarios/novo.tsx
import Sidebar from "@/components/Siderbar";
import Header from "@/components/Header";

export default function CreateUser() {
    return (
        <div className="flex min-h-screen bg-[#f7f6fc] text-[#1e1e2f]">
            <Sidebar />

            <main className="flex-1 p-10 ml-64">
                <Header />

                <form className="grid gap-6 max-w-2xl w-full bg-white border border-[#ede9ff] rounded-xl shadow-md p-8 mt-6">
                    <div>
                        <label htmlFor="name" className="block mb-1 font-semibold text-[#1e1e2f]">Nome:</label>
                        <input id="name" type="text" placeholder="Nome" className="w-full border border-[#d1cafe] bg-white text-[#1e1e2f] rounded-md p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#816bff]" />
                    </div>

                    <div>
                        <label htmlFor="email" className="block mb-1 font-semibold text-[#1e1e2f]">Email:</label>
                        <input id="email" type="email" placeholder="Email" className="w-full border border-[#d1cafe] bg-white text-[#1e1e2f] rounded-md p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#816bff]" />
                    </div>

                    <div>
                        <label htmlFor="phone" className="block mb-1 font-semibold text-[#1e1e2f]">Telefone:</label>
                        <input id="phone" type="text" placeholder="(00)00000-0000" className="w-full border border-[#d1cafe] bg-white text-[#1e1e2f] rounded-md p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#816bff]" />
                    </div>

                    <div>
                        <label htmlFor="password" className="block mb-1 font-semibold text-[#1e1e2f]">Senha:</label>
                        <input id="password" type="password" placeholder="Senha" className="w-full border border-[#d1cafe] bg-white text-[#1e1e2f] rounded-md p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#816bff]" />
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                        <input type="text" placeholder="UF" className="col-span-1 border border-[#d1cafe] rounded-md p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#816bff]" />
                        <input type="text" placeholder="CEP" className="col-span-1 border border-[#d1cafe] rounded-md p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#816bff]" />
                        <input type="text" placeholder="Rua" className="col-span-2 border border-[#d1cafe] rounded-md p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#816bff]" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <input type="text" placeholder="Nº" className="border border-[#d1cafe] rounded-md p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#816bff]" />
                        <input type="text" placeholder="Bairro" className="border border-[#d1cafe] rounded-md p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#816bff]" />
                    </div>

                    <div className="flex justify-end">
                        <button type="submit" className="bg-[#27ae60] hover:bg-[#219653] text-white font-medium px-6 py-3 rounded-md transition duration-200 shadow-sm">
                            Cadastrar
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}
