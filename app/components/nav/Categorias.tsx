"use client";

import Container from "../container";
import { categorias } from "@/utils/Categorias";
import Categoria from "./Categoria";
import { usePathname, useSearchParams } from "next/navigation";
const Categorias = () => {

    const params = useSearchParams()
    const categoria = params?.get("categoria")
    const pathname = usePathname();
    const isMainPage = pathname ==="/"

    if(!isMainPage) return null;

    return (
        <div className="bg-white">
            <Container>
                <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
                    {categorias.map((item) =>(
                        <Categoria
                            key={item.label}
                            label={item.label}
                            icon={item.icon}
                            selected={categoria === item.label || (categoria === null && item.label === "Todos")}
                        />
                    ))}

                </div>
            </Container>
        </div>
    );
}

export default Categorias;