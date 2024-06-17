"use client";

import { ImagemType } from "@/app/admin/adicionar-produtos/FormAdicionarProduto";
import { useCallback, useEffect, useState } from "react";
import SelecionarImage from "./SelecionarImage";
import Botao from "../botao";


interface SelecionarCorProps{
    item: ImagemType;
    addImagemToState: (value: ImagemType ) => void;
    removerImagemFromState: (value: ImagemType ) => void;
    isProdutoCriado: boolean;
}

const SelecionarCor: React.FC<SelecionarCorProps> = ({item, addImagemToState, removerImagemFromState, isProdutoCriado}) => {
    const [isSelecionada, setisSelecionada] = useState(false);
    const [file, setFile] = useState<File | null>(null)

    useEffect(() => {
        if(isProdutoCriado){
            setisSelecionada(false);
            setFile(null);
        }

    },[isProdutoCriado]);

    const handleFileChange = useCallback((value:File) => {
        setFile(value);
        addImagemToState({...item, image: value});
    }, []);
    
    const handleCheck = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setisSelecionada(e.target.checked);

        if(!e.target.checked){
            setFile(null);
            removerImagemFromState(item);
        }
    },[]);

    
    return (
        <div className="grid grid-cols-1  overflow-y-auto border-b-[1.2px] border-slate-200 items-center p-2">
            <div className="flex flex-row gap-2 items-center h-[60px]">
                <input id={item.cor} type="checkbox" checked={isSelecionada} onChange={handleCheck} className="cursor-pointer"/>
                <label htmlFor={item.cor} className="font-medium cursor-pointer">
                    {item.cor}
                </label>
            </div>
            <>
            {isSelecionada && !file && (<div className="col-span-2 text-center">
                <SelecionarImage item={item} handleFileChange={handleFileChange} />
                </div>)}
                {file &&(
                    <div className="flex flex-row gap-2 text-sm col-span-2 items-center justify-between">
                        <p>{file?.name}</p>
                        <div className="w-70px">
                            <Botao label="Cancelar" small outline onClick={() => {
                                setFile(null);
                                removerImagemFromState(item);
                            }}/>
                        </div>
                    </div>
                )}
            </>
        </div>
    );
};
 
export default SelecionarCor;