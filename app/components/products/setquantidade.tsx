'use client';

import { ProductsheetType } from "@/app/product/[productID]/productdetails";


interface SetqtdProps {
    Contadorcart?: boolean;
    Productsheet: ProductsheetType;
    handleaumentarqtd: () => void;
    handlediminuirqtd: () => void;
}

const botao = 'border-[1.2px] border-slate-300 px-2 rounded'

const Setquantidade: React.FC<SetqtdProps> = ({
    Contadorcart,
    Productsheet,
    handleaumentarqtd,
    handlediminuirqtd,
}) => {
    return (<div className="flex gap-8 items-center">
        {Contadorcart ? null : <div className="font-bold">Quantidade:</div>}
        <div className="flex gap-4 items-center text-base">
            <button onClick={handlediminuirqtd} className={botao}>-</button>
            <div>{Productsheet.quantidade}</div>
            <button onClick={handleaumentarqtd} className={botao}>+</button>
        </div>
    </div>
    )
}

export default Setquantidade;