'use client'

import { Cartcontextoprovider } from "@/infocart/usecart"

interface CartprovedorProps{
    children: React.ReactNode
}

const Cartprovedor : React.FC<CartprovedorProps> = ({children}) => {
    return <Cartcontextoprovider>{children}</ Cartcontextoprovider>;
}

export default Cartprovedor