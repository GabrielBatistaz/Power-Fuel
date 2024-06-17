import prisma from "@/bibliotecas/prismadb";
import moment from "moment";

export default async function getDataGrafico() {
    try {
        const startDate = moment().subtract(6, "days").startOf("day");
        const endDate = moment().endOf("day");

        const resultado = await prisma.order.groupBy({
            by: ["createDate"],
            where: {
                createDate: {
                    gte: startDate.toISOString(),
                    lte: endDate.toISOString(),
                },
                status: "completo",
            },
            _sum: {
                amount: true,
            },
        });

        const aggregatedData: {
            [day: string]: { day: string; date: string; totalAmount:number };
        } = {};

        const currentDate = startDate.clone();

        while(currentDate <= endDate){
            const day = currentDate.format("dddd");
            console.log("day<<<", day, currentDate);

            aggregatedData[day] = {
                day,
                date:currentDate.format("YYYY-MM-DD"),
                totalAmount:0,
            };

            currentDate.add(1,"day");
        }

        resultado.forEach((entry) =>{
            const day = moment(entry.createDate).format("dddd");
            const amount = entry._sum.amount || 0;
            aggregatedData[day].totalAmount += amount;
        });

        const formattedData = Object.values(aggregatedData).sort((a,b) => 
            moment(a.date).diff(moment(b.date))
        );
        
        return formattedData;
    } catch(error:any){
        throw new Error(error);
    }
}