"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import MenuItem from "./menuitem";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/tipos";
import { User } from "@prisma/client";
import Avatar from "../avatar";

interface MenuUsuarioProps {
    UsuarioLogado: SafeUser | null;
}

const MenuUsuario: React.FC<MenuUsuarioProps> = ({ UsuarioLogado }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, []);

    return (
        <>
            <div className="relative z-30">
                <div onClick={toggleOpen} className="p-2 border-[1px] border-slate-400 flex flex-row items-center gap-1 rounded-full cursor-pointer houver:shadow-md transition text-slate-700">
                    <Avatar src={UsuarioLogado?.image} />
                    <AiFillCaretDown />
                </div>
                {isOpen && (
                    <div className="absolute rounded-md shadow-md w-[170px] bg-white overflow-hidden right-0 top-12 text-sm flex flex-col cursor-pointer">
                        {UsuarioLogado ?
                            (<div>
                                <Link href="/orders">
                                    <MenuItem onClick={toggleOpen}>Seus Pedidos</MenuItem>
                                </Link>
                                <Link href="/admin">
                                    <MenuItem onClick={toggleOpen}>Admin Dashboard</MenuItem>
                                </Link>
                                <hr />
                                <MenuItem onClick={() => {
                                    toggleOpen();
                                    signOut();
                                }}>Deslogar</MenuItem>
                            </div>
                            ) : (
                                <div>
                                    <Link href="/login">
                                        <MenuItem onClick={toggleOpen}>Logar</MenuItem>
                                    </Link>
                                    <Link href="/register">
                                        <MenuItem onClick={toggleOpen}>Registrar-se</MenuItem>
                                    </Link>
                                </div>)}
                    </div>
                )}
            </div>
        </>
    );
};

export default MenuUsuario;