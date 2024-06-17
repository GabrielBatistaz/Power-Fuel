export const revalidate = 0;

import Image from 'next/image'
import Container from './components/container';
import Homebanner from './components/nav/homebanner';
import { products } from '@/utils/products';
import { cuttext } from '@/utils/cuttext';
import Productsheet from './components/products/Productsheet';
import getProducts, { IProductParametro } from '@/acoes/getProducts';
import DataNull from './components/DataNull';

interface HomeProps{
  searchParams: IProductParametro
}

export default async function Home({searchParams}: HomeProps) {
  const products = await getProducts(searchParams)
  
  if(products.length === 0){
    return<DataNull title='Nenhum Produto encontrado. Clique "Todos" para limpar filtros'/>
  }

  function shuffleArray(array: any){
    for(let i = array.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * (i+1));
      [array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }

  const shuffledProducts = shuffleArray(products)

  return <div >
    <Container>
      <div>
        <Homebanner />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {shuffledProducts.map((product: any)=>{
          return <Productsheet data={product} key={product.id}/>
        })}
      </div>
    </Container>
  </div>;
}
