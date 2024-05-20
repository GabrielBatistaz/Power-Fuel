"use client";

import { Usecart } from "@/infocart/usecart";
import { useRouter } from "next/navigation";
import { CiShoppingCart } from "react-icons/ci"; 

const Cartcontitems = () => {
    const { Carttotalqtd } = Usecart();
    const router = useRouter();

    return ( 
        <div className="relative cursor-pointer" onClick={() => router.push("/cart")}>
            <div className="text 3xl">
                <CiShoppingCart/>
            </div>
            <span className="absolute top-[-10px] right-[-10px] bg-slate-700 text-white h-6 w-6 rounded-full flex items-center justify-center text-sm">
                {Carttotalqtd}
            </span>
        </div>
     );
}
 
export default Cartcontitems;