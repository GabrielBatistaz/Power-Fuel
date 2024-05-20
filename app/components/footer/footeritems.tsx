import React from "react";

interface FooteritemsProps{children: React.ReactNode;}

const Footeritems  : React.FC<FooteritemsProps> = ({children}) => {
    return ( <div className="w-full sm:w-1/2 md:w1/4 lg:w-1/6 mb-6 flex flex-col gap-2">
        {children}
    </div> );
}
 
export default Footeritems;