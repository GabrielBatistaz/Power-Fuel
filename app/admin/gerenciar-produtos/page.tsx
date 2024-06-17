import Container from "@/app/components/container";
import GerenciarProdutosClient from "./GerenciarProdutosClient";
import getProducts from "@/acoes/getProducts";
import { getUsuarioLogado } from "@/acoes/getUsuarioLogado";
import DataNull from "@/app/components/DataNull";


const GerenciarProdutos = async() => {

    const products = await getProducts({categoria:null})
    const UsuarioLogado = await getUsuarioLogado()

    if(!UsuarioLogado || UsuarioLogado.role != "ADMIN"){
        return <DataNull title="Acesso Negado!"/>;
    }

    return ( 
    <div className="pt-8">
        <Container>
            <GerenciarProdutosClient products = {products}/>
        </Container>
    </div> 
    );
}
 
export default GerenciarProdutos;