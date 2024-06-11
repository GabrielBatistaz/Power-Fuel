import { useContext, useState, createContext, useCallback, useEffect, ContextType } from "react";
import { ProductsheetType } from "@/app/product/[productID]/productdetails";
import toast, { Toast } from "react-hot-toast";


type CartcontextoType = {
    Carttotalqtd: number;
    Totalquantiacart: number;
    Productsheets: ProductsheetType[] | null;
    handleAddProducttocart: (product: ProductsheetType) => void;
    handleRemoverProdutocart: (product: ProductsheetType) => void;
    handleaumentarqtd: (product: ProductsheetType) => void;
    handlediminuirqtd: (product: ProductsheetType) => void;
    handleLimparCart: () => void;
    paymentIntent: string | null;
    handleSetPaymentIntent: (val: string | null) => void;
}

export const Cartcontexto = createContext<CartcontextoType | null>(null);

interface Props {
    [propNome: string]: any;
}

export const Cartcontextoprovider = (props: Props) => {
    const [Carttotalqtd, setcartotalqtd] = useState(0);
    const [Totalquantiacart, setTotalquantiacart] = useState(0);
    const [Productsheets, setProductsheets] = useState<ProductsheetType[] | null>(null);
    const [paymentIntent, setPaymentIntent] = useState<string | null>(null);

    useEffect(() => {
        const Itemscart: any = localStorage.getItem('PowerFuelItems')
        const Psheets: ProductsheetType[] | null = JSON.parse(Itemscart)
        const PowerFuelPaymentIntent: any = localStorage.getItem('PowerFuelPaymentIntent');
        const paymentIntent: string | null = JSON.parse(PowerFuelPaymentIntent);

        setProductsheets(Psheets);
        setPaymentIntent(paymentIntent);
    }, []);


    useEffect(() => {
        const getTotal = () =>{
            if(Productsheets){
                const {total, qtd} = Productsheets?.reduce((acumulado,item) => {
                    const Totalitem = item.preco * item.quantidade;

                    acumulado.total += Totalitem;
                    acumulado.qtd += item.quantidade;
    
                    return acumulado;
                },
                {
                    total:0,
                    qtd:0
                }
            );
            setcartotalqtd(qtd);
            setTotalquantiacart(total);
            } 
        };
        getTotal()
    },[Productsheets])

    const handleAddProducttocart = useCallback((product: ProductsheetType) => {
        setProductsheets((prev) => {
            let Cartatualizado;

            if (prev) {
                Cartatualizado = [...prev, product];
            }
            else {
                Cartatualizado = [product];
            }
            toast.success("Produto adicionado ao Carrinho");
            localStorage.setItem('PowerFuelItems', JSON.stringify(Cartatualizado));
            return Cartatualizado;
        });
    }, []);

    const handleRemoverProdutocart = useCallback((product: ProductsheetType) => {
        if(Productsheets){
            const Produtosfiltrado = Productsheets.filter((item) => {
                return item.id !== product.id
            })

            setProductsheets(Produtosfiltrado)
            toast.success("Produto removido do Carrinho");
            localStorage.setItem('PowerFuelItems', JSON.stringify(Produtosfiltrado));
        }

    }, [Productsheets]);

    const handleaumentarqtd = useCallback((product: ProductsheetType) => {
        let Atualizarcart;
        if(product.quantidade === 10){
            return toast.error("Máximo de itens alcançado")
        }
        if(Productsheets){
            Atualizarcart = [...Productsheets]

            const existirIndex = Productsheets.findIndex(
                (item) => item.id === product.id
            );

            if(existirIndex > -1){
                Atualizarcart[existirIndex].quantidade = ++Atualizarcart[existirIndex].quantidade
            }

            setProductsheets(Atualizarcart)
            localStorage.setItem('PowerFuelItems', JSON.stringify(Atualizarcart));
        }

    }, [Productsheets]);

    const handlediminuirqtd = useCallback((product: ProductsheetType) => {
        let Atualizarcart;
        if(product.quantidade === 1){
            return toast.error("Mínimo de itens alcançado")
        }
        if(Productsheets){
            Atualizarcart = [...Productsheets]

            const existirIndex = Productsheets.findIndex(
                (item) => item.id === product.id
            );

            if(existirIndex > -1){
                Atualizarcart[existirIndex].quantidade = --Atualizarcart[existirIndex].quantidade
            }

            setProductsheets(Atualizarcart)
            localStorage.setItem('PowerFuelItems', JSON.stringify(Atualizarcart));
        }

    }, [Productsheets]);

    const handleLimparCart = useCallback(() => {
        setProductsheets(null)
        setcartotalqtd(0)
        localStorage.setItem('PowerFuelItems', JSON.stringify(null));
    
    }, [Productsheets]) ;

    const handleSetPaymentIntent = useCallback((val: string | null) => {
        setPaymentIntent(val);
        localStorage.setItem("PowerFuelPaymentIntent", JSON.stringify(val));
    }, [paymentIntent]);

    const value = {
        Carttotalqtd,
        Productsheets,
        Totalquantiacart,
        handleAddProducttocart,
        handleRemoverProdutocart,
        handleaumentarqtd,
        handlediminuirqtd,
        handleLimparCart,
        paymentIntent,
        handleSetPaymentIntent,
    };

    return <Cartcontexto.Provider value={value}  {...props} />
}

export const Usecart = () => {
    const contexto = useContext(Cartcontexto);
    if (contexto === null) {
        throw new Error("TESTANDOOAODOOA")
    }

    return contexto;
}