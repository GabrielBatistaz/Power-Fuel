import prisma from "@/bibliotecas/prismadb"

interface IParams{
    productID?: string
}

export default async function getProductbyId(params:IParams) {
    try{
        const{productID} = params;
        
        const product = await prisma.product.findUnique({
            where:{
                id:productID
            },
            include:{
                reviews:{
                    include:{
                        user: true
                    },
                    orderBy:{
                        createdDate:"desc"
                    }
                }
            }
        })

        if(!product){
            return null;
        }
        return product;
    } catch(error: any){
        throw new Error(error)
    }

}