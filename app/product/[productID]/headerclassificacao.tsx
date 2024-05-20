interface HeaderclassificacaoProps{
    titulo: string;
    center?: boolean;
}

const Headerclassificacao: React.FC<HeaderclassificacaoProps> = ({ titulo, center}) => {
    return ( 
        <div className={center ? 'text-center' : 'text-start'}>
            <h1 className="text-2xl font-bold text-gray-800">{titulo}</h1>
        </div>
     );
}
 
export default Headerclassificacao;