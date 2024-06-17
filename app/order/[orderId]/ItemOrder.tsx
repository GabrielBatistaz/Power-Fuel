"use client";

import { cuttext } from "@/utils/cuttext";
import { Typeprice } from "@/utils/typeprice";
import { ProductsheetType } from "@prisma/client";
import Image from "next/image";

interface ItemOrderProps {
    item: ProductsheetType
}

const ItemOrder: React.FC<ItemOrderProps> = ({ item }) => {
    return (
        <div className="grid grid-cols-5 text-xs md:text-sm gap-4 border-t[1.5px] border-slate-200 py-4 items-center">
            <div className="col-span-2 justify-self-start flex gap-2 md:gap-4">
                <div className="relative w-[70px] aspect-square">
                    <Image src={item.Imgselecionada.image} alt={item.nome} fill className="object-contain" />
                </div>
                <div className="flex flex-col gap-1">
                    <div>{cuttext(item.nome)}</div>
                    <div>{item.Imgselecionada.cor}</div>
                </div>
            </div>
            <div className="justify-self-center">{Typeprice(item.preco)}</div>
            <div className="justify-self-center">{item.quantidade}</div>
            <div className="justify-self-end font-semibold">R${(item.preco * item.quantidade).toFixed(2)}</div>
        </div>
    );
};

export default ItemOrder;