"use client";

import { useState } from "react";
import Input from "../components/inputs/input";
import Titulo from "../components/titulo";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Botao from "../components/botao";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";


const Formlogin = () => {
    const [isLoading, setisLoading] = useState(false)
    const {register, handleSubmit, formState:{errors}} = useForm<FieldValues>({
        defaultValues:{
            email:"",
            senha:"",
        }
    });

    const onSubmit:SubmitHandler<FieldValues> = (data) => {
        setisLoading(true)
        console.log(data)
    };

    return ( 
        <>
          <Titulo title="Logar"/>

          <Botao outline label="Logar com Google" icon={AiOutlineGoogle} onClick={() => {}}/>

          <hr className="bg-slate-300 w-full h-px"/>
        

          <Input
          id="email"
          label="Email"
          disabled={isLoading}
          register={register}
          erros={errors}
          required
          />

          <Input
          id="senha"
          label="Senha"
          disabled={isLoading}
          register={register}
          erros={errors}
          required
          type="password"
          />
          <Botao label={isLoading ? "Carregando" : 'Logar'} onClick={handleSubmit(onSubmit)}/>
          <p className="text-sm">
            Não tem uma conta?{" "}
            <Link className="underline" href="/register">Registre-se Aqui</Link>

          </p>
        </>
     );
}
 
export default Formlogin;