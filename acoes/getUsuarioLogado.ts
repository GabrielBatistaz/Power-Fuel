import { OpcoesAutenticacao } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import prisma from "@/bibliotecas/prismadb";

export async function getSession() {
    return await getServerSession(OpcoesAutenticacao);
}

export async function getUsuarioLogado() {
    try {
        const session = await getSession();

        if (!session?.user?.email) {
            return null;
        }
        const UsuarioLogado = await prisma.user.findUnique({
            where:{
                email: session?.user?.email,
            },
        });

        if(!UsuarioLogado){
            return null;
        }

        return{
            ...UsuarioLogado,
            createdAt: UsuarioLogado.createdAt.toISOString(),
            updatedAt: UsuarioLogado.updatedAt.toISOString(),
            emailVerified: UsuarioLogado.emailVerified?.toISOString() || null,
        }

    }catch (error: any) {
        console.log(error);
        return null;
    }
}