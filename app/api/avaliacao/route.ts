import { getUsuarioLogado } from "@/acoes/getUsuarioLogado";
import { Review } from "@prisma/client";
import { NextResponse } from "next/server";


export async function POST(request:Request) {
    const UsuarioLogado = await getUsuarioLogado();

    if(!UsuarioLogado){
        return NextResponse.error();
    }

    const body = await request.json()
    const{comentario,rating, product, userId} = body;

    const deliveredOrder = UsuarioLogado?.orders.some(order => order.products.find(item => item.id === product.id) 
    && order.statusEntrega === "entregue")

    const userAvaliacao = product?.reviews.find(((review: Review) =>{
        return review.userId === UsuarioLogado.id
    }))

    if(userAvaliacao || !deliveredOrder){
        return NextResponse.error();
    }

    const review = await prisma?.review.create({
        data:{
            comentario,
            rating,
            productId:product.id,
            userId
        }
    })

    return NextResponse.json(review)
}