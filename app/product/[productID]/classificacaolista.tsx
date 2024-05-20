'use client';

import moment from "moment";
import Headerclassificacao from "./headerclassificacao";
import { Rating } from "@mui/material";
import Avatar from "@/app/components/avatar";

interface ClassificacaolistaProps{
    product: any;
} 

const Classificacaolista:React.FC<ClassificacaolistaProps> = ({product}) => {
    return <div>
        <Headerclassificacao titulo="Avaliação Produto" />
        <div className="text-sm mt-2">
            {product.reviews && product.reviews.map((review:any) => {
                return <div key={review.id} className="max-w-[350px]">
                    <div className="flex gap-2 items-center">
                       
                       <Avatar src={review?.user.image}/>

                        <div className="font-bold">{review?.user.nome}</div>
                        <div className="font-light">{moment(review.createdDate).fromNow()}</div>
                    </div>
                    <div className="mt-2">
                        <Rating value={review.rating} readOnly/>
                        <div className="ml-2">{review.comentario}</div>
                        <hr className="mt-4 mb-4" />
                    </div>
                </div>
                
            })}
        </div>
    </div>;
}
 
export default Classificacaolista;