import { getUsuarioLogado } from "@/acoes/getUsuarioLogado";
import Container from "../components/container";
import Encobrir from "../components/encobrir";
import Formregister from "./formregister";

const Register = async() => {
    const UsuarioLogado = await getUsuarioLogado();
    return ( <Container>
        <Encobrir>
            <Formregister UsuarioLogado = {UsuarioLogado} />
        </Encobrir>
    </Container> );
}
 
export default Register;