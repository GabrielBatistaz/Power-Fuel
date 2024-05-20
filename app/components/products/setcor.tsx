'use client'

import { ProductsheetType, ImgselecionadaType } from "@/app/product/[productID]/productdetails";
import React from "react";

interface SetcorProps {
    images: ImgselecionadaType[],
    Productsheet: ProductsheetType,
    handleCorSelecionada: (value: ImgselecionadaType) => void
}

const Setcor: React.FC<SetcorProps> = ({
    images, Productsheet, handleCorSelecionada,
}) => {
    return <div className="flex gap-4 items-center">
        <div>
            <span className="font-bold">Cor:</span>
            <div className="flex gap-1">{images.map((image) => {
                return (
                    <div key={image.cor} onClick={() => handleCorSelecionada(image)} className={`
                    h-7 w-7 rounded-full border-teal-300 flex items-center justify-center
                    ${Productsheet.Imgselecionada.cor ===
                            image.cor ? "border-[1.5px]" : "border-none"}`}>

                        <div style={{background: image.codigocor}} className="h-5 w-5 rounded-full border-[1.2px] border-slate-300 cursor-pointer"></div>
                    </div>
                )
            })}
            </div>
        </div>
    </div>
}

export default Setcor;