"use client";

import { useState } from "react";
import Input from "../components/inputs/input";
import Titulo from "../components/titulo";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import Botao from "../components/botao";
import Link from "next/link";

const Formregister = () => {
    const [isLoading, setisLoading] = useState(false)
    const { register, handleSubmit, formState:{errors}} = useForm<FieldValues>({defaultValues:{
        name:'',
        email:'',
        password:''
    }})

    const onSubmit:SubmitHandler<FieldValues> = (data) => {
        setisLoading(true);
        console.log(data);
    };

    return ( 
        <>
        <Titulo title="Registrar" />
        <hr className="bg-slate-300 w-full h-px"/>

        <Input id="name" 
        label="Nome" 
        disabled={isLoading} 
        register={register} 
        erros={errors} 
        required
        />
         <Input id="email" 
        label="Email" 
        disabled={isLoading} 
        register={register} 
        erros={errors} 
        required
        />
         <Input id="password" 
        label="Senha" 
        disabled={isLoading} 
        register={register} 
        erros={errors} 
        required
        type="password"
        />
        <Botao label={isLoading ? "Carregando" : 'Registrar'} onClick={handleSubmit(onSubmit)}/>
        <p className="text-sm">
            Já tem uma conta? <Link className="underline" href='/login'>Logar</Link>
        </p>
        </>
        
     );
}
 
export default Formregister;