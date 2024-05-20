'use client';

import { ImgselecionadaType, ProductsheetType } from "@/app/product/[productID]/productdetails";
import Image from "next/image";

interface ProductimagemProps{
    Productsheet: ProductsheetType;
    product: any;
    handlecorselecionada: (value: ImgselecionadaType) => void;
}


const Productimagem: React.FC<ProductimagemProps> = ({
    Productsheet,
    product,
    handlecorselecionada,
}) => {
    return <div className="grid grid-cols-6 gap-2 h-full max-h-[500px] min-h-[300px] sm:min-h-[400px]">
        <div className="flex flex-col items-center justify-center gap-4 cursor-pointer border h-full max-h-[500px] min-h-[300px] sm:min-h-[400px]"> 
        {product.images.map((image: ImgselecionadaType) => {
            return (
            <div key={image.cor} onClick={() => handlecorselecionada(image)} className={`relative w-[80%] aspect-square rounded border-teal-300
                ${Productsheet.Imgselecionada.cor === image.cor ? 'border-[1.5px]' : "border-none"}
                `}
                >
                    <Image
                    src={image.image}
                    alt={image.cor}
                    fill
                    className="object-contain"
                    />
                </div>
            );
        })}  
        </div>
        <div className="col-span-5 relative aspect-square">
            <Image 
            fill 
            src={Productsheet.Imgselecionada.image} 
            alt={Productsheet.nome}
            className="w-full h-full object-contain max-h-[500px] min-h-[300px] sm:min-h-[400px]" 
            />
        </div>
    </div>;
}
 
export default Productimagem;