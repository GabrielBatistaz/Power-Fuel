import prisma from "@/bibliotecas/prismadb";
import Stripe from "stripe";
import { NextResponse } from "next/server";
import { ProductsheetType } from "@/app/product/[productID]/productdetails";
import { getUsuarioLogado } from "@/acoes/getUsuarioLogado";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: "2024-04-10", });

const CalcularValorCompra = (items: ProductsheetType[]) => {
    const precoTotal = items.reduce((acc, item) => {
        const totalItem = item.preco * item.quantidade

        return acc + totalItem;
    }, 0);

    const preco: any = Math.floor(precoTotal);

    return preco;
};

export async function POST(request: Request) {
    const UsuarioLogado = await getUsuarioLogado();

    if (!UsuarioLogado) {
        return NextResponse.json({ error: "Não Autorizado" }, { status: 401 });
    }
    const body = await request.json();
    const { items, intencao_pagamento_id } = body;
    const total = CalcularValorCompra(items) * 100;
    const ordemData = {
        user: { connect: { id: UsuarioLogado.id } },
        amount: total,
        currency: "brl",
        status: "pendente",
        statusEntrega: "pendente",
        intencaodePagamentoId: intencao_pagamento_id,
        products: items
    }

    if (intencao_pagamento_id) {
        const current_intent = await stripe.paymentIntents.retrieve(intencao_pagamento_id);

        if (current_intent) {
            const updated_intent = await stripe.paymentIntents.update(intencao_pagamento_id, { amount: total }
            );

            const [existing_order, update_order] = await Promise.all([
                prisma.order.findFirst({
                    where: { intencaodePagamentoId: intencao_pagamento_id },
                }),
                await prisma.order.update({
                    where: { intencaodePagamentoId: intencao_pagamento_id },
                    data: {
                        amount: total,
                        products: items
                    },
                }),
            ]);

            if (!existing_order) {
                return NextResponse.json({ error: "Intenção de Pagamento Inválida" }, { status: 400 });
            }
            return NextResponse.json({ paymentIntent: updated_intent });
        }

    } else {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: total,
            currency: "brl",
            automatic_payment_methods: { enabled: true },
        });

        ordemData.intencaodePagamentoId = paymentIntent.id;

        await prisma.order.create({
            data: ordemData,
        });

        return NextResponse.json({ paymentIntent });
    }
}