
import Container from "../container";
import Link from "next/link";
import { Redressed } from "next/font/google";
import Cartcontitems from "./cartcontitems";
import MenuUsuario from "./menuusuario";
import { getUsuarioLogado } from "@/acoes/getUsuarioLogado";
import Categorias from "./Categorias";
import BarradePesquisa from "./BarradePesquisa";
import Image from "next/image";


const redressed = Redressed({ subsets: ["latin"], weight: ["400"] });

const Navbar = async () => {
    const UsuarioLogado = await getUsuarioLogado();

    return (<div className="sticky top-0 w-full bg-slate-200 z-30 shadow-sm">
        <div className="py-4 border-b-[1px]">
            <Container>
                <div className="flex items-center justify-between gap-3 md:gap-0">
                    <Link href={"/"}>
                        <Image
                            src="/logo.png"
                            alt="Imagem Banner"
                            className="object-contain"
                            width={60} // Ajuste a largura conforme necessário
                            height={60} // Ajuste a altura conforme necessário
                        />
                    </Link>
                    <div className="hidden md:block"><BarradePesquisa /></div>
                    <div className="flex items-center gap-8 md-gap-12">
                        <Cartcontitems />
                        <MenuUsuario UsuarioLogado={UsuarioLogado} />
                    </div>
                </div>
            </Container>
        </div>
        <Categorias />
    </div>);
}

export default Navbar;