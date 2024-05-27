import { getUsuarioLogado } from "@/acoes/getUsuarioLogado";
import Container from "../components/container";
import Encobrir from "../components/encobrir";
import Formlogin from "./formlogin";


const Login = async() => {
    const UsuarioLogado = await getUsuarioLogado();

    return ( 
        <Container>
            <Encobrir>
                <Formlogin UsuarioLogado = {UsuarioLogado} />
            </Encobrir>
        </Container>
     );
}
 
export default Login;