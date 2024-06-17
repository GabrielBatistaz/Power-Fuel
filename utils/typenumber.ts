export const Typenumber = (digit:number) =>{
    return new Intl.NumberFormat("pt-BR").format(digit)
}