import Container from "@/app/components/container";
import ClientOrder from "./ClientOrder";
import { getUsuarioLogado } from "@/acoes/getUsuarioLogado";
import DataNull from "@/app/components/DataNull";
import getOrdersbyUserId from "@/acoes/getOrdersbyUserId";


const Orders = async() => {
    const UsuarioLogado = await getUsuarioLogado();

    if(!UsuarioLogado){
        return <DataNull title="Acesso Negado!"/>;
    }

    const orders = await getOrdersbyUserId(UsuarioLogado.id)

    if(!orders){
        return <DataNull title="Sem Pedidos!"/>;
    }

    return ( 
    <div className="pt-8">
        <Container>
            <ClientOrder orders = {orders}/>
        </Container>
    </div> 
    );
}
 
export default Orders;