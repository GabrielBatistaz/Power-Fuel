"use client";

import Link from "next/link";
import NavAdmItems from "./NavAdmItems";
import { MdDashboard, MdDns, MdFormatListBulleted, MdLibraryAdd } from "react-icons/md";
import { usePathname } from "next/navigation";
import Container from "../container";

const NavAdm = () => {
    const pathname = usePathname();

    return ( 
        <div className="w-full shadow-sm top-20 border-b-[1px] pt-4">
            <Container>
                <div className="flex flex-row items-center justify-between md:justify-center gap-8 md:gap-12 overflow-x-auto flex-nowrap">
                    <Link href="/admin">
                        <NavAdmItems label="Summary" icon={MdDashboard} selected={pathname === "/admin"}></NavAdmItems>
                    </Link>
                    <Link href="/admin/adicionar-produtos">
                        <NavAdmItems label="Adicionar Produtos" icon={MdLibraryAdd} selected={pathname === "/admin/adicionar-produtos"}></NavAdmItems>
                    </Link>
                    <Link href="/admin/gerenciar-produtos">
                        <NavAdmItems label="Gerenciar Produtos" icon={MdDns} selected={pathname === "/admin/gerenciar-produtos"}></NavAdmItems>
                    </Link>
                    <Link href="/admin/gerenciar-orders">
                        <NavAdmItems label="Gerenciar Pedidos" icon={MdFormatListBulleted} selected={pathname === "/admin/gerenciar-orders"}></NavAdmItems>
                    </Link>
                </div>
            </Container>
        </div>
     );
}
 
export default NavAdm;