"use client";

import Status from "@/app/components/Status";
import Titulo from "@/app/components/titulo";
import { Typeprice } from "@/utils/typeprice";
import { Order } from "@prisma/client";
import moment from "moment";
import { MdAccessTimeFilled, MdDeliveryDining, MdDone } from "react-icons/md";
import ItemOrder from "./ItemOrder";


interface DetalhesOrderProps {
    order: Order
}


const DetalhesOrder: React.FC<DetalhesOrderProps> = ({ order }) => {
    return (
        <div className="max-w-[1180px] m-auto flex flex-col gap-2">
            <div className="mt-8">
                <Titulo title="Detalhes Do Pedido" />
            </div>
            <div>Order ID:{order.id}</div>
            <div>Total:{" "} <span>{Typeprice(order.amount)}</span></div>
            <div className="flex gap-2 items-center">
                <div>Status de pagamento:</div>
                <div>{order.status === "pendente" ? (<Status text="pendente" icon={MdAccessTimeFilled} background="bg-slate-200" cor="text-slate-700" />
                ) :
                    order.status === "completo" ? (<Status text="completo" icon={MdDone} background="bg-green-200" cor="text-green-700" />
                    ) : (
                        <></>
                    )}
                </div>
            </div>

            <div className="flex gap-2 items-center">
                <div>Status de entrega:</div>
                <div>{order.statusEntrega === "pendente" ? (<Status text="pendente" icon={MdAccessTimeFilled} background="bg-slate-200" cor="text-slate-700" />
                    ) : order.statusEntrega === "enviado" ? (<Status text="enviado" icon={MdDeliveryDining} background="bg-purple-200" cor="text-purple-700" />
                    ) : order.statusEntrega === "entregue" ? (<Status text="entregue" icon={MdDone} background="bg-green-200" cor="text-green-700" />
                    ) : (
                        <></>
                    )}
                </div>
            </div>
            <div>Date:{moment(order.createDate).fromNow()}</div>
            <div>
                <h3 className="font-semibold mt-4 mb-2">Produtos Pedidos</h3>
                <div className="grid grid-cols-5 text-xs gap-4 pb-2 items-center">
                    <div className="col-span-2 justify-self-start">PRODUTO</div>
                    <div className="justify-self-center">PREÇO</div>
                    <div className="justify-self-center">QUANTIDADE</div>
                    <div className="justify-self-end">TOTAL</div>
                </div>
                {order.products && order.products.map(item =>{
                    return <ItemOrder key={item.id} item={item}/>;
                })}
            </div>
        </div>
    );
}

export default DetalhesOrder;