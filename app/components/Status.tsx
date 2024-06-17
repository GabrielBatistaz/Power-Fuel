import { IconType } from "react-icons";

interface StatusProps{
    text: string;
    icon: IconType;
    background: string;
    cor: string;
}

const Status: React.FC<StatusProps> = ({text, icon: Icon, background, cor}) => {
    return ( 
        <div className={`${background} ${cor} px-1 rounded flex items-center gap-1`}>
            {text} <Icon size={17}/>
        </div>
     );
};
 
export default Status;