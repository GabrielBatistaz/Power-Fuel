import Container from "@/app/components/container";
import Encobrir from "@/app/components/encobrir";
import FormAdicionarProduto from "./FormAdicionarProduto";
import { getUsuarioLogado } from "@/acoes/getUsuarioLogado";
import DataNull from "@/app/components/DataNull";

const AdicionarProdutos = async() => {
    const UsuarioLogado = await getUsuarioLogado()

    if(!UsuarioLogado || UsuarioLogado.role != "ADMIN"){
        return <DataNull title="Acesso Negado"/>
    }

    return <div className="p-8">
        <Container>
            <Encobrir>
                <AdicionarProdutos></AdicionarProdutos>
            </Encobrir>
        </Container>
        </div>;
}
 
export default AdicionarProdutos;