import Container from "@/app/components/container";
import Productdetails from "./productdetails";
import Classificacaolista from "./classificacaolista";
import { products } from "@/utils/products";
import getProductbyId from "@/acoes/getProductbyId";
import DataNull from "@/app/components/DataNull";
import AdicionarAvaliacao from "./AdicionarAvaliacao";
import { getUsuarioLogado } from "@/acoes/getUsuarioLogado";
interface IPrams {
    productID?:string;
}

const Product = async({ params } : {params: IPrams}) => {

    const product = await getProductbyId(params)
    const user = await getUsuarioLogado()

    if(!product) return <DataNull title="Produto não existe"/>

    return ( 
    <div className="p-8">
        <Container>
            <Productdetails product={product}/>
            <div className="flex flex-col mt-20 gap-4">
                <AdicionarAvaliacao product={product} user={user}/>
                <Classificacaolista product={product} />
            </div>
        </Container>
    </div>
    );
};

export default Product;