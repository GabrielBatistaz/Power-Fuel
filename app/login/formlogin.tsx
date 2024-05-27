"use client";

import { useEffect, useState } from "react";
import Input from "../components/inputs/input";
import Titulo from "../components/titulo";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Botao from "../components/botao";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { SafeUser } from "@/tipos";

interface FormloginProps{
  UsuarioLogado: SafeUser | null
}

const Formlogin: React.FC<FormloginProps> = ({UsuarioLogado}) => {
    const [isLoading, setisLoading] = useState(false);
    const {register, handleSubmit, formState:{errors},} = useForm<FieldValues>({
        defaultValues:{
            email:"",
            password:"",
        },
    });

    const router = useRouter();

    useEffect(() => {
      if(UsuarioLogado){
        router.push('/cart');
        router.refresh();
      }
    }, []);
    
    const onSubmit:SubmitHandler<FieldValues> = (data) => {
        setisLoading(true)
        signIn("credentials", {
          ...data, redirect:false
        }).then((callback) => {
          setisLoading(false);
          if (callback?.ok) {
            router.push("/cart");
            router.refresh();
            toast.success("Logado");
        }
        if (callback?.error) {
            toast.error(callback.error);
        }
        })
    };

    if(UsuarioLogado){
      return <p className="text-center">Logado. Redirecionando</p>
    }

    return ( 
        <>
          <Titulo title="Logar"/>

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
          id="password"
          label="Senha"
          disabled={isLoading}
          register={register}
          erros={errors}
          required
          type="password"
          />
          <Botao label={isLoading ? "Carregando" : 'Login'} onClick={handleSubmit(onSubmit)}/>
          <Botao outline label="Logar com Google" icon={AiOutlineGoogle} onClick={() => {signIn('google');
          }}/>
          <p className="text-sm">
            Não tem uma conta?{" "}
            <Link className="underline" href="/register">Registre-se Aqui</Link>

          </p>
        </>
     );
}
 
export default Formlogin;