"use client";

import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Usecart } from "@/infocart/usecart";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Botao from "../components/botao";
import FormCheckout from "./formCheckout";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string)

const ClientCheckout = () => {
    const { Productsheets, paymentIntent, handleSetPaymentIntent } = Usecart();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [clientSecret, setclientSecret] = useState("");
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    const router = useRouter();

    console.log("paymentIntent", paymentIntent);
    console.log("clientSecret", clientSecret);

    useEffect(() => {
        if (Productsheets) {
            setLoading(true);
            setError(false);

            fetch("/api/gerar-pagamento", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    items: Productsheets,
                    intencao_pagamento_id: paymentIntent,
                }),
            }).then((res) => {
                setLoading(false);
                if (res.status === 401) {
                    return router.push('/login');
                }
                return res.json();
            }).then((data) => {
                setclientSecret(data.paymentIntent.client_secret);
                handleSetPaymentIntent(data.paymentIntent.id);
            }).catch((error) => {
                setError(true);
                console.log("Error", error);
                toast.error('Algo deu errado');
            });
        }
    }, [Productsheets, paymentIntent]);

    const options: StripeElementsOptions = {
        clientSecret,
        appearance: {
            theme: 'stripe',
            labels: 'floating',
        },
    };

    const handleSetPaymentSuccess = useCallback((value: boolean) => {
        setPaymentSuccess(value);
    }, []);

    return (<div className="w-full">
        {clientSecret && Productsheets && (
            <Elements options={options} stripe={stripePromise}>
                <FormCheckout clientSecret={clientSecret} handleSetPaymentSuccess={handleSetPaymentSuccess} />
            </Elements>
        )}
        {loading && <div className="text-center">Carregando Checkout...</div>}
        {error && (<div className="text-center text-rose-500">Algo deu errado</div>)}
        {paymentSuccess && (
            <div className="flex items-center flex-col gap-4">
                <div className="text-teal-500 text-center">Sucesso no Pagamento</div>
                <div className="max-w-[220px] w-full">
                    <Botao label="Ver seus pedidos" onClick={() => router.push('/order')} />
                </div>
            </div>
        )}
    </div>
    );
}

export default ClientCheckout;