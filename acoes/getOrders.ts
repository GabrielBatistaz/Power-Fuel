import prisma from "@/bibliotecas/prismadb";

export default async function getOrders() {
    try {
      const orders = await prisma.order.findMany({
        include: {
          user: true,
        },
        where: {
          user: {
            isNot: null,
          },
        },
        orderBy: {
          createDate: "desc",
        },
      });
      return orders;
    } catch (error: any) {
      throw new Error(error);
    }
  }


// export default async function getOrders() {
//     try{
//         const orders = await prisma.order.findMany({
//             include:{
//                 user: true
//             },
//             orderBy:{
//                 createDate: "desc"
//             }
//         })
//         return orders
//     }catch(error: any){
//         throw new Error(error)
//     }
// }