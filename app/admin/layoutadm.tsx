export const metadata = {
    title:"Power-Fuel-Admin",
    description: "Power Fuel Admin Dashboard"
}

const LayoutAdm = ({children}: {children:React.ReactNode}) => {
    return ( 
        <div>
            <div>nav</div>
            {children}
        </div>
     );
}
 
export default LayoutAdm;