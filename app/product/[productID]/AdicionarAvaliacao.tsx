"use client"

import Botao from "@/app/components/botao";
import Input from "@/app/components/inputs/input";
import Titulo from "@/app/components/titulo";
import { SafeUser } from "@/tipos";
import { Rating } from "@mui/material";
import { Order, Product, Review } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface AdicionarAvaliacaoProps{
    product: Product &{
        reviews: Review[]
    };
    user:(SafeUser &{
        orders: Order[];
    }) | null
}

const AdicionarAvaliacao:React.FC<AdicionarAvaliacaoProps> = ({product, user}) => {

    const[isLoading, setisLoading] = useState(false)
    const router = useRouter()
    const {register, handleSubmit, setValue, reset, formState: {errors}} = useForm<FieldValues>({
        defaultValues:{
            comentario: "",
            rating: 0
        }
    })

    const setCustomValue = (id: string, value: any) =>{
        setValue(id,value,{
            shouldTouch:true,
            shouldDirty:true,
            shouldValidate:true
        })
    }

    const onSubmit:SubmitHandler<FieldValues> = async(data) =>{
        setisLoading(true);
        if(data.rating === 0) {
            setisLoading(false)
            return toast.error("Avaliação não selecionada")
        }
            const avaliacaoData = {...data, userId:user?.id, product:product}
            axios.post("/api/avaliacao",avaliacaoData).then(() =>{
                toast.success("Avaliação enviada");
                router.refresh();
                reset();
            }).catch((error)=>{
                toast.error("Algo deu errado")
            }).finally(()=>{
                setisLoading(false)
            })
    }

    if(!user || !product) return null;

    const deliveredOrder = user?.orders.some(order => order.products.find(item => item.id === product.id) 
    && order.statusEntrega === "entregue")

    const userAvaliacao = product?.reviews.find(((review: Review) =>{
        return review.userId === user.id
    }))

    if(userAvaliacao || !deliveredOrder) return null


    return ( 
        <div className="flex flex-col gap-2 max-w-[500px]">
            <Titulo title="Avalie esse produto" />
            <Rating onChange={(event, newValue) =>{
                setCustomValue("rating", newValue)
            }}/>
            <Input id="comentario" label="Comentario" disabled = {isLoading} register={register} erros={errors} required/>
            <Botao label={isLoading ? "Carregando" : "Avaliar Produto"} onClick={handleSubmit(onSubmit)}/>
        </div>
     );
}
 
export default AdicionarAvaliacao;