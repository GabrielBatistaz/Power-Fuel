import Container from "@/app/components/container";
import DetalhesOrder from "./DetalhesOrder";
import getOrderbyId from "@/acoes/getOrderbyId";
import DataNull from "@/app/components/DataNull";

interface Iprams {
    orderId?:string;
}

const Order = async ({params } : {params: Iprams}) => {
    const order = await getOrderbyId(params)

    if(!order) return <DataNull title="Sem Pedidos"></DataNull>;

    return ( 
    <div className="p-8">
        <Container>
            <DetalhesOrder order={order}/>
        </Container>
    </div>
    );
};

export default Order;