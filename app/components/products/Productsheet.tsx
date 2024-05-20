import { cuttext } from "@/utils/cuttext";
import { Typeprice } from "@/utils/typeprice";
import { Rating } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProductsheetProps {
    data: any
}

const Productsheet: React.FC<ProductsheetProps> = ({ data }) => {

    const router = useRouter();

    const productRating = data.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) / data.reviews.length;

    return (
        <div onClick={() => router.push(`/product/${data.id}`)} className="col-span-1 cursor-pointer border-[1.2px] border-slate-200 bg-slate-50 rounded-sm p-2 transition hover:scale-105 text-center text-sm">
            <div className="flex flex-col items-center w-full gap-1">
                {data.images.map((image: any, index: number) => (
                    <div key={index} className="aspect-square overflow-hidden relative w-full">
                        <Image
                            fill
                            src={image.image}
                            alt={data.nome}
                            className="w-full h-full object-contain"
                        />
                    </div>
                ))}
                <div className="mt-4">{cuttext(data.nome)}</div>
                <div><Rating value={productRating} readOnly /></div>
                <div>{data.reviews.length} reviews</div>
                <div className="font-bold">{Typeprice(data.preco)}</div>
            </div>
        </div>
    );
}

export default Productsheet;
