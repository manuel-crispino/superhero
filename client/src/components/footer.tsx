
export default function Footer(){
    const date = new Date();
    
    return(

        <div className="footer">
        <h2>Manuel Crispino © {date.getFullYear()}</h2>
        </div>
    )
}