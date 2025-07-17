import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Sidebar from "@/components/Siderbar";
import Header from "@/components/Header";
import { users } from "@/data/users";

export default function EditUser() {
    const router = useRouter();
    const { id } = router.query;

    const [userData, setUserData] = useState({
        nome: "",
        email: "",
        telefone: "",
        senha: "",
        endereco: {
            uf: "",
            cep: "",
            rua: "",
            numero: "",
            bairro: "",
        },
    });

    useEffect(() => {
        if (id) {
            const foundUser = users.find((u) => u.id === id);
            if (foundUser) setUserData(foundUser);
        }
    }, [id]);

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;

        if (name in userData.endereco) {
            setUserData({
                ...userData,
                endereco: { ...userData.endereco, [name]: value },
            });
        } else {
            setUserData({ ...userData, [name]: value });
        }
    }

    function handleFormSubmit(e: React.FormEvent) {
        e.preventDefault();
        console.log("Usuário atualizado:", userData);
        alert("Usuário atualizado com sucesso!");
        router.push("/usuarios");
    }

    return (
        <div className="flex min-h-screen bg-[#f7f6fc] text-[#1e1e2f]">
            <Sidebar />

            <main className="flex-1 p-10 ml-64">
                <Header />
                <h1 className="text-2xl font-bold mb-6">Editar Usuário</h1>

                <form
                    onSubmit={handleFormSubmit}
                    className="grid gap-6 max-w-2xl bg-white border border-[#ede9ff] rounded-xl shadow-md p-8"
                >
                    <input
                        name="nome"
                        value={userData.nome}
                        onChange={handleInputChange}
                        placeholder="Nome"
                        className="border border-[#d1cafe] rounded-md p-3 w-full"
                    />
                    <input
                        name="email"
                        value={userData.email}
                        onChange={handleInputChange}
                        placeholder="Email"
                        className="border border-[#d1cafe] rounded-md p-3 w-full"
                    />
                    <input
                        name="telefone"
                        value={userData.telefone}
                        onChange={handleInputChange}
                        placeholder="Telefone"
                        className="border border-[#d1cafe] rounded-md p-3 w-full"
                    />
                    <input
                        name="senha"
                        value={userData.senha}
                        onChange={handleInputChange}
                        placeholder="Senha"
                        className="border border-[#d1cafe] rounded-md p-3 w-full"
                    />

                    <div className="grid grid-cols-4 gap-4">
                        <input
                            name="uf"
                            value={userData.endereco.uf}
                            onChange={handleInputChange}
                            placeholder="UF"
                            className="col-span-1 border border-[#d1cafe] rounded-md p-3"
                        />
                        <input
                            name="cep"
                            value={userData.endereco.cep}
                            onChange={handleInputChange}
                            placeholder="CEP"
                            className="col-span-1 border border-[#d1cafe] rounded-md p-3"
                        />
                        <input
                            name="rua"
                            value={userData.endereco.rua}
                            onChange={handleInputChange}
                            placeholder="Rua"
                            className="col-span-2 border border-[#d1cafe] rounded-md p-3"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            name="numero"
                            value={userData.endereco.numero}
                            onChange={handleInputChange}
                            placeholder="Nº"
                            className="border border-[#d1cafe] rounded-md p-3"
                        />
                        <input
                            name="bairro"
                            value={userData.endereco.bairro}
                            onChange={handleInputChange}
                            placeholder="Bairro"
                            className="border border-[#d1cafe] rounded-md p-3"
                        />
                    </div>

                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="bg-gray-300 hover:bg-gray-400 text-[#1e1e2f] px-6 py-3 rounded-md shadow-sm"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="bg-[#27ae60] hover:bg-[#219653] text-white font-medium px-6 py-3 rounded-md shadow-sm"
                        >
                            Confirmar
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}
