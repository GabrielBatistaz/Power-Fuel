"use client";

import { Order, User } from "@prisma/client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Typeprice } from "@/utils/typeprice";
import Titulo from "@/app/components/titulo";
import Status from "@/app/components/Status";
import { MdAccessTimeFilled, MdDeliveryDining, MdDone, MdRemoveRedEye } from "react-icons/md";
import AcoesGerenciamento from "@/app/components/AcoesGerenciamento";
import { useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import moment from "moment";



interface GerenciarOrdersClientProps {
    orders: ExtendedOrder[];
}
type ExtendedOrder = Order & {
    user: User;
}

const GerenciarOrdersClient: React.FC<GerenciarOrdersClientProps> = ({ orders }) => {
    const router = useRouter();
    let rows: any = [];

    if (orders) {
        rows = orders.map((order) => {
            return {
                id: order.id,
                customer: order.user.name,
                amount: Typeprice(order.amount / 100),
                paymentStatus: order.status,
                date: moment(order.createDate).fromNow(),
                statusEntrega: order.statusEntrega,
            };
        });
    }

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 225 },
        { field: "customer", headerName: "Customer name", width: 130 },
        {
            field: "amount", headerName: "Amount", width: 130,
            renderCell: (params) => {
                return (<div className="font-semibold text-slate-800">{params.row.amount}</div>);
            },
        },
        {
            field: "paymentStatus", headerName: "Payment Status", width: 130,
            renderCell: (params) => {
                return (<div>{params.row.paymentStatus === "pendente" ? (
                    <Status text="pendente" icon={MdAccessTimeFilled} background="bg-slate-200" cor="text-slate-700" />
                ) : params.row.paymentStatus === "completo" ? (
                    <Status text="completo" icon={MdDone} background="bg-purple-200" cor="text-purple-700" />
                ) : (
                <></>
                )}
                </div>);
            },
        },
        {
            field: "statusEntrega", headerName: "Delivery Status", width: 130,
            renderCell: (params) => {
                return (<div>{params.row.statusEntrega === "pendente" ? (
                    <Status text="pendente" icon={MdAccessTimeFilled} background="bg-slate-200" cor="text-slate-700" />
                ) : params.row.statusEntrega === "enviado" ? (
                    <Status text="enviado" icon={MdDeliveryDining} background="bg-purple-200" cor="text-purple-700" />
                ) : params.row.statusEntrega === "entregue" ? (
                    <Status text="entregue" icon={MdDone} background="bg-green-200" cor="text-green-700" />
                ) : (
                <></>
                )}
                </div>);
            },
        },
        { field: "date", headerName: "Date", width: 225 },
        {
            field: "action", headerName: "Ações", width: 150,
            renderCell: (params) => {
                return (
                    <div className="flex justify-between gap-3 w-full">
                        <AcoesGerenciamento icon={MdDeliveryDining} onClick={() => { handleDespachar(params.row.id); }} />
                        <AcoesGerenciamento icon={MdDone} onClick={() => { handleDelivery(params.row.id); }} />
                        <AcoesGerenciamento icon={MdRemoveRedEye} onClick={() => { router.push(`/order/${params.row.id}`); }} />
                    </div>
                );
            },
        },
    ];

    const handleDespachar = useCallback((id: string) => {
        axios.put("/api/order", {
            id,
            statusEntrega: "enviado"
        }).then((res) => {
            toast.success("Pedido despachado");
            router.refresh();
        }).catch((err) => {
            toast.error("Algo deu Errado");
            console.log(err);
        });
    }, []);

    const handleDelivery = useCallback((id: string) => {
        axios.put("/api/order", {
            id,
            statusEntrega: "entregue"
        }).then((res) => {
            toast.success("Pedido entregue");
            router.refresh();
        }).catch((err) => {
            toast.error("Algo deu Errado");
            console.log(err);
        });
    }, []);


    return (
        <div className="max-w-[1180px] m-auto text-xl">
            <div className="mb-4 mt-8">
                <Titulo title="Gerenciar Pedidos" center />
            </div>
            <div style={{ height: 600, width: "100%" }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
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

export default GerenciarOrdersClient;