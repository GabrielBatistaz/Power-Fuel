import Container from "../components/container";
import Encobrir from "../components/encobrir";
import ClientCheckout from "./clientCheckout";

const Checkout = () => {
    return (
        <div className="p-8">
            <Container>
                <Encobrir>
                    <ClientCheckout></ClientCheckout>
                </Encobrir>
            </Container>
        </div>
    );
}
 
export default Checkout;