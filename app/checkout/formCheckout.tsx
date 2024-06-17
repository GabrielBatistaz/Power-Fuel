"use client";

import { Usecart } from "@/infocart/usecart";
import { useStripe, useElements, PaymentElement, AddressElement} from "@stripe/react-stripe-js"
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Titulo from "../components/titulo";
import { Typeprice } from "@/utils/typeprice"
import Botao from "../components/botao";

interface FormCheckoutProps{
    clientSecret: string,
    handleSetPaymentSuccess:(value: boolean) => void;
}

const FormCheckout:React.FC<FormCheckoutProps> = ({clientSecret, handleSetPaymentSuccess}) => {
    const {Totalquantiacart, handleLimparCart, handleSetPaymentIntent} = Usecart();
    const stripe = useStripe();
    const elements = useElements();
    const [isLoading, setIsLoading] = useState(false);
    const formattedPrice = Typeprice(Totalquantiacart);
    
    useEffect(() => {
        if(!stripe){
            return;
        }
        if(!clientSecret){
            return;
        }
        handleSetPaymentSuccess(false);
    },[stripe]);
    
    const handleSubmit = async(e:React.FormEvent)=>{
        e.preventDefault();

        if(!stripe || !elements){
            return;
        }

        setIsLoading(true);

        stripe.confirmPayment({
            elements, redirect:"if_required",
        }).then(result =>{
            if(!result.error){
                toast.success("Successo no Checkout");

                handleLimparCart();
                handleSetPaymentSuccess(true);
                handleSetPaymentIntent(null);
            }
            setIsLoading(false);
        });
    };

    return (<form onSubmit={handleSubmit} id="payment-form">
            <div className="mb-6">
                <Titulo title="Confirme suas informações para completar o Checkout"/>
            </div>
            <h2 className="font-bold mb-2">
                Informação de Indereço
            </h2>
            <AddressElement 
            options={{
                mode: "shipping",
                allowedCountries: ["BR"],
            }}
            />
            <h3 className="font-bold mt-4 mb-2">Informações de Pagamento</h3>
            <PaymentElement id="payment-element" options={{layout:"tabs"}}/>
            <div className="py-4 text-center text-slate-700 text-xl font-bold">
                Total:{formattedPrice}
            </div>
            <Botao label={isLoading? "Processando" : "Pagar Agora"} disabled={isLoading || !stripe || !elements} onClick={() => {}}/>
        </form>
    );
};
 
export default FormCheckout;