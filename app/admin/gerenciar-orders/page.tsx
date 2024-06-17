import Container from "@/app/components/container";
import GerenciarOrdersClient from "./GerenciarOrdersClient";
import { getUsuarioLogado } from "@/acoes/getUsuarioLogado";
import DataNull from "@/app/components/DataNull";
import getOrders from "@/acoes/getOrders";

const GerenciarOrders = async() => {

    const orders = await getOrders();
    const UsuarioLogado = await getUsuarioLogado();

    if(!UsuarioLogado || UsuarioLogado.role != "ADMIN"){
        return <DataNull title="Acesso Negado!"/>;
    }

    return ( 
    <div className="pt-8">
        <Container>
            <GerenciarOrdersClient orders = {orders}/>
        </Container>
    </div> 
    );
}
 
export default GerenciarOrders;