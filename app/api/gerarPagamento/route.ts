import prisma from "@/bibliotecas/prismadb";
import Stripe from "stripe";
import { NextResponse } from "next/server";
import { ProductsheetType } from "@/app/product/[productID]/productdetails";
import { getUsuarioLogado } from "@/acoes/getUsuarioLogado";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {apiVersion:"2024-04-10",});

const CalcularValorCompra = (items: ProductsheetType[]) => {
    const precoTotal = items.reduce((acc,  item) => {
        const Totalitem = item.preco * item.quantidade

        return acc + Totalitem;
    },0);

    const preco : any = Math.floor(precoTotal);

    return preco;
};

export async function POST(request:Request) {
    const UsuarioLogado = await getUsuarioLogado();
    
    if(!UsuarioLogado){
        return NextResponse.json({error: "Não Autorizado"}, {status: 401})
    }
    const body = await request.json()
    const {items, intencaode_pagamento_id} = body
    const total = CalcularValorCompra(items) * 100
    const ordemData = {
        user: {connect: {id: UsuarioLogado.id}},
        amount: total,
        currency: "brl",
        status: "pendente",
        statusEntrega: "pendente",
        intencaodePagamentoId:intencaode_pagamento_id,
        products:items
    }

    if(intencaode_pagamento_id){
        const current_intent = await stripe.paymentIntents.retrieve(intencaode_pagamento_id);

        if(current_intent){
            const updated_intent = await stripe.paymentIntents.update(intencaode_pagamento_id,{amount: total});
            
            const [existing_order, update_order] = await Promise.all([
                prisma.order.findFirst({
                    where: {intencaodePagamentoId:intencaode_pagamento_id}
                }),
                prisma.order.update({
                    where:{intencaodePagamentoId: intencaode_pagamento_id},
                    data: {
                        amount: total,
                        products: items
                    },
                }),
            ]);
    
            if(!existing_order){
                return NextResponse.json({error: "Intenção de Pagamento Inválida"},{status: 400});
            }
            return NextResponse.json({paymentIntend: updated_intent})
        }
        
    }
    else{
        const paymentIntend = await stripe.paymentIntents.create({
            amount: total,
            currency: "brl",
            automatic_payment_methods:{enabled: true},
        });

        ordemData.intencaodePagamentoId = paymentIntend.id

        await prisma.order.create({
            data: ordemData
        });

        return NextResponse.json({paymentIntend});
    }
}