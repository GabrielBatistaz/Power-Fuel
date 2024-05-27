"use client";


import {  FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface AreaTextoProps{
    id: string;
    label: string;
    disabled?: boolean;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    erros: FieldErrors;
}

const AreaTexto: React.FC<AreaTextoProps> = ({id, label, disabled, required, register, erros,}) => {
    return ( 
        <div className="w-full relative">
            <textarea
            id={id} disabled={disabled} {...register(id, {required})} placeholder=""
            className={`peer w-full p-4 pt-6 max-h-[150px] min-h-[150px] outline-none bg-white font-light border-2 rounded-md transition disabled:opacity-70 disabled:cursor-not-allowed 
            ${erros[id] ? 'border-rose-400' : 'border-slate-300'}
            ${erros[id] ? 'focus:border-rose-400' : 'focus:border-slate-300'}`} />
            
            <label htmlFor={id} className={`absolute cursor-text text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 ${erros[id] ? "text-rose-500" : "text-slate-300"}`}>
                {label}</label>
        </div>

     );
}
 
export default AreaTexto;