"use client";

import { useSearchParams } from "next/dist/client/components/navigation";
import { useRouter } from "next/navigation";
import queryString from "query-string";
import { useCallback } from "react";
import { IconType } from "react-icons";

interface CategoriaProps{
    label: string;
    icon: IconType;
    selected?: boolean;
}

const Categoria:React.FC<CategoriaProps> = ({label, icon:Icon, selected}) => {
    const router = useRouter();
    const params = useSearchParams()
    const handleClick = useCallback(() =>{
        if(label === "Todos"){
            router.push("/")
        }else{
            let consultaAtual = {};

            if(params){
                consultaAtual = queryString.parse(params.toString())
            }

            const atualizarConsulta:any ={
                ...consultaAtual,
                categoria:label
            }

            const url = queryString.stringifyUrl(
                {
                    url:"/",
                    query: atualizarConsulta
                },
                {
                    skipNull:true
                }
            )

            router.push(url)
        }
    }, [label,params,router])

    return ( <div onClick={handleClick} className={`flex items-center justify-center text-center gap-2 p-2 border-b-2 hover:text-slate-800 trasnsition cursor-pointer
    ${selected ? 'border-b-slate-800 text-slate-800':'border-transparent text-slate-500'}`}>
        <Icon size={20}/>
        <div className="font-medium text-sm">{label}</div>
    </div> );
}
 
export default Categoria;