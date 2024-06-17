import prisma from "@/bibliotecas/prismadb";

export interface IProductParametro{
    categoria?: string | null;
    termoPesquisa?: string | null;
}

export default async function getProducts(params: IProductParametro) {
    
    try{
        const {categoria, termoPesquisa} = params;
        let pesquisaString = termoPesquisa;

        if(!termoPesquisa){
            pesquisaString = ""
        }

        let consulta: any =  {}

        if(categoria){
            consulta.categoria = categoria
        }

        const products = await prisma.product.findMany({
            where:{
                ...consulta,
                OR:[{
                    nome:{
                        contains: pesquisaString,
                        mode:"insensitive"
                    },
                    descricao:{
                        contains: pesquisaString,
                        mode:"insensitive"
                    }
                }]
            },
            include:{
                reviews:{
                    include:{
                        user:true
                    },
                    orderBy:{
                        createdDate: "desc"
                    }
                }
            }
        })

        return products

    }catch(error:any){
        throw new Error(error)
    }
}