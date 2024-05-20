import Image from 'next/image'
import Container from './components/container';
import Homebanner from './components/nav/homebanner';
import { products } from '@/utils/products';
import { cuttext } from '@/utils/cuttext';
import Productsheet from './components/products/Productsheet';


export default function Home() {
  return <div >
    <Container>
      <div>
        <Homebanner />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {products.map((product: any)=>{
          return <Productsheet data={product}/>
        })}
      </div>
    </Container>
  </div>;
}
