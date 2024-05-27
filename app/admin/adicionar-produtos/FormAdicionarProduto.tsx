"use client";

import AreaTexto from "@/app/components/inputs/Areatexto";
import CheckEstoque from "@/app/components/inputs/CheckEstoque";
import Input from "@/app/components/inputs/input";
import Titulo from "@/app/components/titulo";
import { categorias } from "@/utils/Categorias";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

const FormAdicionarProduto = () => {
    const [isLoading, setisLoading] = useState(false);
    const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            nome: "",
            descricao: "",
            marca: "",
            categoria: "",
            inEstoque: false,
            images: [],
            preco: "",
        }
    })

    return (
        <>
            <Titulo title="Adicionar Produto" center />
            <Input id="nome" label="Name" disabled={isLoading} register={register} erros={errors} required />
            <Input id="preco" label="Preço" disabled={isLoading} register={register} erros={errors} type="number" required />
            <Input id="marca" label="Marca" disabled={isLoading} register={register} erros={errors} required />
            <AreaTexto id="descricao" label="Descrição" disabled={isLoading} register={register} erros={errors} required />

            <CheckEstoque id="inEstoque" register={register} label="Esse produto está no estoque" />
            <div className="w-full font-medium">
                <div className="mb-2 font-bold">Selecionar uma Categoria</div>
                <div className="grid grid-cols-2 md:grid-cols-3 max-h[50vh] overflow-y-auto">
                    {categorias.map((item) => {
                        if(item.label === "All"){
                            return null;
                        }
                        return <div>
                            
                        </div>
                    })}</div>
            </div>
        </>);
};

export default FormAdicionarProduto;