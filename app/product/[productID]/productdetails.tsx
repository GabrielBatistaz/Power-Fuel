"use client";

import Botao from "@/app/components/botao";
import Productimagem from "@/app/components/products/produtosimagem";
import Setcor from "@/app/components/products/setcor";
import Setquantidade from "@/app/components/products/setquantidade";
import { Usecart } from "@/infocart/usecart";
import { Rating } from "@mui/material";
import { useRouter } from "next/navigation";
import { handleClientScriptLoad } from "next/script";
import { useCallback, useEffect, useState } from "react";
import { MdCheckCircle } from "react-icons/md";


interface ProductdetailsProps {
    product: any
}

export type ProductsheetType = {
    id: string,
    nome: string,
    descricao: string,
    categoria: string,
    marca: string,
    Imgselecionada: ImgselecionadaType,
    quantidade: number,
    preco: number,
}

export type ImgselecionadaType = {
    cor: string,
    codigocor: string,
    image: string,
}

const Horizontal = () => {
    return <hr className="w-[30%] my-2" />
}

const Productdetails: React.FC<ProductdetailsProps> = ({ product }) => {

    const { handleAddProducttocart, Productsheets } = Usecart();

    const [isProductincart, setIsProductincart] = useState(false);

    const [Productsheet, setProductsheet] =
        useState<ProductsheetType>({
            id: product.id,
            nome: product.nome, 
            descricao: product.descricao,
            categoria: product.categoria,
            marca: product.marca,
            Imgselecionada: { ...product.images[0] },
            quantidade: 1,
            preco: product.preco,
        })
    const router = useRouter()
    
    console.log(Productsheets);

    useEffect(() => {
        setIsProductincart(false)
        if(Productsheets){
            const existirIndex = Productsheets.findIndex(
                (item) => item.id === product.id
            );
            if(existirIndex > -1){
                setIsProductincart(true);
            }
        }
    },[Productsheets]);

    const productRating = product.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) / product.reviews.length;

    const handleCorSelecionada = useCallback((value: ImgselecionadaType) => {
        setProductsheet((prev) => {
            return { ...prev, Imgselecionada: value }
        });
    }, [Productsheet.Imgselecionada]);

    const handleaumentarqtd = useCallback(() => {
        if (Productsheet.quantidade === 10) {
            return;
        }
        setProductsheet((prev) => {
            return { ...prev, quantidade: prev.quantidade + 1 };
        });
    }, [Productsheet]);

    const handlediminuirqtd = useCallback(() => {
        if (Productsheet.quantidade <= 1) {
            return;
        }
        setProductsheet((prev) => {
            return { ...prev, quantidade: prev.quantidade - 1 };
        });
    }, [Productsheet]);

    return <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <Productimagem Productsheet={Productsheet} product={product} handlecorselecionada={handleCorSelecionada} />
        <div className="flex flex-col gap-1 text-slate-500 text-sm">
            <h3 className="text-3xl font-medium text-slate-700">{product.nome}</h3>
            <div className="flex items-center gap-2">
                <Rating value={productRating} readOnly />
                <div>{product.reviews.length} reviews</div>
            </div>
            <Horizontal />
            <div className="text-justify">{product.descricao}</div>
            <Horizontal />
            <div>
                <span className="font-bold">Categoria:</span> {product.categoria}
            </div>
            <div>
                <span className="font-bold">Marca:</span> {product.marca}
            </div>
            <div className={product.inEstoque ? "text-teal-400" : "text-red-400"}>{product.inEstoque ? "No estoque" : "Fora de estoque"}</div>
            <Horizontal />
            {isProductincart ? (
            <>
            <p className="mb-2 text-slate-500 flex items-center gap-1">
                <MdCheckCircle className="text-teal-400"/>
                <span>Produto adicionado ao Carrinho</span>
            </p>
            <div className="max-w-[300px]">
                <Botao  label="Ver Carrinho" outline onClick={() => {
                    router.push('/cart');
                }}
                />
            </div>
            </>) : 
            
            (<>
            <Setcor
                Productsheet={Productsheet}
                images={product.images}
                handleCorSelecionada={handleCorSelecionada}
            />
            <Horizontal />
            <Setquantidade
                Productsheet={Productsheet} handleaumentarqtd={handleaumentarqtd} handlediminuirqtd={handlediminuirqtd}
            />
            <Horizontal />
            <div className="max-w-[300px]">
                <Botao label="Adicionar ao Carrinho" onClick={() => handleAddProducttocart(Productsheet)}
                />
            </div>
            </>)}
            
        </div>
    </div>
}

export default Productdetails;