"use client";

import { useEffect, useState } from "react";
import Input from "../components/inputs/input";
import Titulo from "../components/titulo";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import Botao from "../components/botao";
import Link from "next/link";
import { AiFillGoogleCircle } from "react-icons/ai";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SafeUser } from "@/tipos";
import axios from "axios";

interface FormregisterProps {
  UsuarioLogado: SafeUser | null;
}

const Formregister: React.FC<FormregisterProps> = ({ UsuarioLogado }) => {
  const [isLoading, setisLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  useEffect(() => {
    if (UsuarioLogado) {
      router.push('/cart');
      router.refresh();
    }
  }, [UsuarioLogado, router]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setisLoading(true);

    // Verificação de domínio de e-mail válido
    const emailDomain = data.email.split("@")[1];
    if (emailDomain !== "gmail.com") {
      toast.error('Por favor, use um e-mail do Gmail');
      setisLoading(false);
      return;
    }

    try {
      const response = await axios.post('/api/register', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        toast.success('Conta Criada');

        const callback = await signIn('credentials', {
          email: data.email,
          password: data.password,
          redirect: false,
        });

        if (callback?.ok) {
          router.push('/');
          router.refresh();
          toast.success('Logado');
        } else if (callback?.error) {
          toast.error(callback.error);
        }
      } else {
        toast.error('Erro');
      }
    } catch (error) {
      toast.error('Erro');
    } finally {
      setisLoading(false);
    }
  };

  if (UsuarioLogado) {
    return <p className="text-center">Você já está Logado! Redirecionando</p>;
  }

  return (
    <>
      <Titulo title="Registrar" />
      <hr className="bg-slate-300 w-full h-px" />

      <Input
        id="name"
        label="Nome"
        disabled={isLoading}
        register={register}
        erros={errors}
        required
      />
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
      <Botao label={isLoading ? "Carregando" : 'Registrar'} onClick={handleSubmit(onSubmit)} />
      <Botao label="Registrar com o Google" icon={AiFillGoogleCircle} onClick={() => { signIn('google') }} />
      <p className="text-sm">
        Já tem uma conta? <Link className="underline" href='/login'>Logar</Link>
      </p>
    </>
  );
}

export default Formregister;
