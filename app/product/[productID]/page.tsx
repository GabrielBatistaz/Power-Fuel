import Container from "@/app/components/container";
import Productdetails from "./productdetails";
import Classificacaolista from "./classificacaolista";
import { products } from "@/utils/products";
interface Iprams {
    productID?:string;
}

const Product = ({params } : {params: Iprams}) => {
    console.log("params", params);

    const product = products.find((item) => item.id === params.productID)

    return ( 
    <div className="p-8">
        <Container>
            <Productdetails product={product}/>
            <div className="flex flex-col mt-20 gap-4">
                <div>Adicionar Classificação</div>
                <Classificacaolista product={product} />
            </div>
        </Container>
    </div>
    );
};

export default Product;