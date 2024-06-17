
import prisma from "@/bibliotecas/prismadb";
import { NextResponse } from "next/server";
import {getUsuarioLogado} from "@/acoes/getUsuarioLogado";

export async function POST(request : Request) {
    const UsuarioLogado = await getUsuarioLogado();
 
    if(!UsuarioLogado) return NextResponse.error();

    if(UsuarioLogado.role != "ADMIN"){
        return NextResponse.error();
    }
    const body = await request.json();
    const { nome, descricao, preco, marca, categoria, inEstoque, images } = body;


    const product = await prisma.product.create({
        data:{
            nome,
            descricao,
            marca,
            categoria,
            inEstoque,
            images,
            preco: parseFloat(preco)
        },
    });

    return NextResponse.json(product);
}

export async function PUT(request: Request) {
    const UsuarioLogado = await getUsuarioLogado();
 
    if(!UsuarioLogado || UsuarioLogado.role != "ADMIN"){
        return NextResponse.error();
    }
    const body = await request.json();
    const {id, inEstoque} = body;

    const product = await prisma.product.update({
        where: {id: id},
        data: {inEstoque},
    });

    return NextResponse.json(product);
}