import { getUsuarioLogado } from "@/acoes/getUsuarioLogado";
import { NextResponse } from "next/server";

export async function DELETE( request: Request , {params} : {params: {id: string}}) {
    const UsuarioLogado = await getUsuarioLogado();

    if(!UsuarioLogado) return NextResponse.error();

    if(UsuarioLogado.role != "ADMIN"){
        return NextResponse.error();
    }

    const product = await prisma?.product.delete({
        where: {id: params.id},
    })
    return NextResponse.json(product);
}