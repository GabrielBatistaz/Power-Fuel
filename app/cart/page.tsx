import {getUsuarioLogado} from "@/acoes/getUsuarioLogado";
import Container from "../components/container";
import Cartcliente from "./cartcliente";

const Cart = async () => {
    const UsuarioLogado = await getUsuarioLogado();
    
    return <div className="pt-8">
        <Container>
            <Cartcliente UsuarioLogado={UsuarioLogado}/>
        </Container>
    </div>
}
 
export default Cart;