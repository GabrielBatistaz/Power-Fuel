import getProducts from "@/acoes/getProducts";
import Resumo from "./Resumo";
import getOrders from "@/acoes/getOrders";
import getUsers from "@/acoes/getUsers";
import Container from "../components/container";
import getDataGrafico from "@/acoes/getDataGrafico";
import BarraGrafico from "./BarraGrafico";
import { getUsuarioLogado } from "@/acoes/getUsuarioLogado";
import DataNull from "@/app/components/DataNull";

const Administrador = async () => {
    const products = await getProducts({ categoria: null })
    const orders = await getOrders()
    const users = await getUsers()
    const dataGrafico = await getDataGrafico()
    const UsuarioLogado = await getUsuarioLogado()
    
    if(!UsuarioLogado || UsuarioLogado.role != "ADMIN"){
        return <DataNull title="Acesso Negado!"/>;
    }

    return (
        <div className="pt-8">
            <Container>
                <Resumo products={products} orders={orders} users={users} />
                <div className="mt-4 mx-auto max-w-[1150px]">
                    <BarraGrafico data={dataGrafico}/>
                </div>
            </Container>
        </div>
    );
}

export default Administrador;