
import prisma from "@/bibliotecas/prismadb";
import { NextResponse } from "next/server";
import {getUsuarioLogado} from "@/acoes/getUsuarioLogado";

export async function PUT(request: Request) {
    const UsuarioLogado = await getUsuarioLogado();
    
    if(!UsuarioLogado) return NextResponse.error();

    if(!UsuarioLogado || UsuarioLogado.role != "ADMIN"){
        return NextResponse.error();
    }
    const body = await request.json();
    const {id, statusEntrega} = body;

    const order = await prisma.order.update({
        where: {id: id},
        data: {statusEntrega},
    });

    return NextResponse.json(order);
}