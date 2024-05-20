import Image from 'next/image'
import Container from '../container';
import Footeritems from './footeritems';
import Link from 'next/link';
import {MdFacebook} from 'react-icons/md';
import {AiFillInstagram, AiFillTwitterCircle,AiFillYoutube} from 'react-icons/ai';


export default function Home() {
  return <footer className="bg-slate-700 text-slate-200 text-sm mt-16">
    <Container>
      <div className="flex flex-col md:flex-row justify-between pt-16 pb-8">
        <Footeritems>
          <h3 className="text-base font-bold mb-2">Categorias</h3>
          <Link href='#'>Wheys</Link>
          <Link href='#'>Creatinas</Link>
          <Link href='#'>Hipercaloricos</Link>
        </Footeritems>
        <Footeritems>
          <h3 className="text-base font-bold mb-2">Serviços</h3>
          <Link href='#'>Entrar em contato</Link>
          <Link href='#'>Politicas</Link>
          <Link href='#'>devolução de produto</Link>
        </Footeritems>
        <div className="w-full md:w-1/3 mb-6 md:mb-0">
        <h3 className="text-base font-bold mb-2">Sobre nós</h3>
        <p className="mb-2">Somos uma loja online de suplementos
         de musculação, oferecemos produtos para melhorar seu desempenho
        físico. Garantimos descrições detalhadas, compras convenientes,
        entregas rápidas e atendimento ao cliente eficiente.
        </p>
        <p>&copy;{new Date().getFullYear()} Power Fuel. Todos os direitos reservados</p>
        </div>
        <Footeritems>
        <h3 className="text-base font-bold mb-2">Redes Sociais</h3>
        <div className="flex gap-2">
        <Link href='#'>
            <MdFacebook size={25} /> 
        </Link>            
        <Link href='#'>
            <AiFillInstagram size={25} /> 
        </Link>            
        <Link href='#'>
            <AiFillTwitterCircle size={25} /> 
        </Link>            
        <Link href='#'>
            <AiFillYoutube size={25} /> 
        </Link>            
        </div>
        </Footeritems>
      </div>
    </Container>
  </footer >;
}
