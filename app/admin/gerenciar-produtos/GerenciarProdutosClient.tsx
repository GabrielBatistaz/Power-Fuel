"use client";

import { Product } from "@prisma/client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Typeprice } from "@/utils/typeprice";
import Titulo from "@/app/components/titulo";
import Status from "@/app/components/Status";
import { MdCached, MdClose, MdDelete, MdDone, MdRemoveRedEye } from "react-icons/md";
import AcoesGerenciamento from "@/app/components/AcoesGerenciamento";
import { useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { deleteObject, getStorage, ref } from "firebase/storage";
import firebaseApp from "@/bibliotecas/firebase";


interface GerenciarProdutosClientProps {
    products: Product[]
}

const GerenciarProdutosClient: React.FC<GerenciarProdutosClientProps> = ({ products }) => {
    const router = useRouter();
    const storage = getStorage(firebaseApp);
    let rows: any = [];

    if (products) {
        rows = products.map((product) => {
            return {
                id: product.id,
                nome: product.nome,
                preco: Typeprice(product.preco),
                categoria: product.categoria,
                marca: product.marca,
                inEstoque: product.inEstoque,
                images: product.images,
            };
        });
    }

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 225 },
        { field: "nome", headerName: "Nome", width: 225 },
        {
            field: "preco", headerName: "Preço", width: 100,
            renderCell: (params) => {
                return (<div className="font-semibold text-slate-800">{params.row.preco}</div>);
            },
        },
        { field: "categoria", headerName: "Categoria", width: 140 },
        { field: "marca", headerName: "Marca", width: 140 },
        {
            field: "inEstoque", headerName: "Estoque", width: 150,
            renderCell: (params) => {
                return (<div>{params.row.inEstoque === true ? (
                    <Status text="no estoque" icon={MdDone} background="bg-teal-200" cor="text-teal-700" />
                ) : (
                    <Status text="fora de estoque" icon={MdClose} background="bg-rose-200" cor="text-rose-700" />)}</div>);
            },
        },
        {
            field: "action", headerName: "Ações", width: 150,
            renderCell: (params) => {
                return (
                    <div className="flex justify-between gap-3 w-full">
                        <AcoesGerenciamento icon={MdCached} onClick={() => { handleMudarEstoque(params.row.id, params.row.inEstoque); }} />
                        <AcoesGerenciamento icon={MdDelete} onClick={() => { handleDeletar(params.row.id, params.row.images) }} />
                        <AcoesGerenciamento icon={MdRemoveRedEye} onClick={() => { router.push(`/product/${params.row.id}`) }} />

                    </div>
                );
            },
        },
    ];

    const handleMudarEstoque = useCallback((id: string, inEstoque: boolean) => {
        axios.put("/api/product", {
            id,
            inEstoque: !inEstoque,
        }).then((res) => {
            toast.success("Status do produto alterado");
            router.refresh();
        }).catch((erro) => {
            toast.error("Algo deu Errado");
            console.log(erro);
        });
    }, []);

    const handleDeletar = useCallback(async (id: string, images: any[]) => {
        toast("Deletando Produto");

        const handleImagemDelete = async () => {
            try {
                for (const item of images) {
                    if (item.image) {
                        const imageRef = ref(storage, item.image);
                        await deleteObject(imageRef);
                        console.log("Imagem deletada", item.image);
                    }
                }
            } catch (error) {
                return console.log("Erro ao deletar imagens", error);
            }
        };
        await handleImagemDelete();

        axios.delete(`/api/product/${id}`).then(
            (res) => {
                toast.success("Produto deletado");
                router.refresh();
            }
        ).catch((erro) => {
            toast.error("Falha ao deletar o produto");
            console.log(erro);
        });
    }, []);

    return (
        <div className="max-w-[1180px] m-auto text-xl">
            <div className="mb-4 mt-8">
                <Titulo title="Gerenciar Produtos" center />
            </div>
            <div style={{ height: 600, width: "100%" }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 10 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            </div>
        </div>
    );
}

export default GerenciarProdutosClient;