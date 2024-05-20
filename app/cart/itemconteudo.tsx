"use client";

import { Typeprice } from "@/utils/typeprice";
import { ProductsheetType } from "../product/[productID]/productdetails";
import Link from "next/link";
import { cuttext } from "@/utils/cuttext";
import Image from "next/image";
import Setquantidade from "../components/products/setquantidade";
import { Usecart } from "@/infocart/usecart";


interface ItemconteudoProps{
    item: ProductsheetType;
}

const Itemconteudo: React.FC<ItemconteudoProps> = ({item}) => {

    const {handleRemoverProdutocart,handleaumentarqtd, handlediminuirqtd} = Usecart()

    return ( <div className="grid grid-cols-5 text-xs md:text-sm gap-4 border-t-[1.5px] border-slate-200 py-4 items-center">
        
        <div className="col-span-2 justify-self-start flex gap-2 md:gap-4">
            <Link href={`/product/${item.id}`}>
                <div className="relative w-[70px] aspect-square">
                    <Image src={item.Imgselecionada.image} alt={item.nome} fill className="object-contain" />
                </div>
            </Link>
            <div className="flex flex-col justify-between">
                <Link href={`/product/${item.id}`}>
                    {cuttext(item.nome)}
                </Link>
                <div>{item.Imgselecionada.cor}</div>
                <div className="w-[700px]">
                    <button className="text-slate-500 underline" onClick={() => handleRemoverProdutocart(item)}>
                        Remover
                    </button>
                </div>
            </div>
        </div>
        <div className="justify-self-center">{Typeprice(item.preco)}</div>
        <div className="justify-self-center">
            <Setquantidade 
            Productsheet={item} 
            Contadorcart={true} 
            handleaumentarqtd={() => {handleaumentarqtd(item)}} 
            handlediminuirqtd={() => {handlediminuirqtd(item)}}/>
        </div>
        <div className="justify-self-end font-bold">
            {Typeprice(item.preco  * item.quantidade)}
        </div>
    </div> );
}
 
export default Itemconteudo;