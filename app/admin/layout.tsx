import NavAdm from "../components/admin/NavAdm";

export const metadata = {
    title:"Power-Fuel-Admin",
    description: "Power Fuel Admin Dashboard"
}

const LayoutAdmin = ({children}: {children:React.ReactNode}) => {
    return ( 
        <div>
            <NavAdm />
            {children}  
        </div>
     );
};
 
export default LayoutAdmin;