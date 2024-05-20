export const Typeprice = (amount : number) =>{
    return new Intl.NumberFormat
    ('pt-BR',{style:'currency', currency:'BRL'}).format(amount)
};