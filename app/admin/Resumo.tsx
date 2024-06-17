"use client";

import { Order, Product, User } from "@prisma/client";
import { useEffect, useState } from "react";
import Titulo from "../components/titulo";
import { Typeprice } from "@/utils/typeprice";
import { Typenumber } from "@/utils/typenumber";

interface ResumoProps {
    orders: Order[];
    products: Product[];
    users: User[];
}

type ResumoDataType = {
    [key: string]: {
        label: string;
        digit: number;
    }
}

const Resumo: React.FC<ResumoProps> = ({ orders, products, users }) => {
    const [resumoData, setresumoData] = useState<ResumoDataType>({
        sale: {
            label: "Total sale",
            digit: 0
        },
        products: {
            label: "Total Produtos",
            digit: 0
        },
        orders: {
            label: "Total Pedidos",
            digit: 0
        },
        paidOrders: {
            label: "Pedidos pagos",
            digit: 0
        },
        unpaidOrders: {
            label: "Pedidos não pagos",
            digit: 0
        },
        users: {
            label: "Total Usuarios",
            digit: 0
        },
    })

    useEffect(() => {
        setresumoData((prev) => {
            let tempData = { ...prev }

            const totalVendido = orders.reduce((acc, item) => {
                if (item.status === "completo") {
                    return acc + item.amount
                } else return acc
            }, 0)

            const paidOrders = orders.filter((order => {
                return order.status === "completo"
            }))
            const unpaidOrders = orders.filter((order => {
                return order.status === "pendente"
            }))

            tempData.sale.digit = totalVendido;
            tempData.orders.digit = orders.length;
            tempData.paidOrders.digit = paidOrders.length;
            tempData.unpaidOrders.digit = unpaidOrders.length;
            tempData.products.digit = products.length;
            tempData.users.digit = users.length;

            return tempData
        })
    }, [orders, products, users])

    const resumoKeys = Object.keys(resumoData)

    return (
        <div className="max-w-[1150px] m-auto">
            <div className="mb-4 mt-8">
                <Titulo title="Status " center />
            </div>
            <div className="grid grid-cols-2 gap-3 max-h-50vh overflow-y-auto">
                {resumoKeys && resumoKeys.map((key) => {
                    return <div key={key} className="rounded-xl border-2 p-4 flex flex-col items-center gap-2 transition">
                        <div className="text-xl md:text-4xl font-semibold">
                            {resumoData[key].label === "Total sale" ?
                                <>{Typeprice(resumoData[key].digit)}</>
                                :
                                <>{Typenumber(resumoData[key].digit)}</>
                            }
                        </div>
                        <div>{resumoData[key].label}</div>
                    </div>
                })
                }
            </div>
        </div>
    );
}

export default Resumo;