import "../styles/Header.css"
import { useNavigate } from "react-router-dom"
import { useCookies } from "react-cookie"

export const Header = () => {
    const jwtToken = `${useCookies()[0].jwtToken}`
    const navigate = useNavigate()

    const [cookies, setCookie, removeCookie] = useCookies(["jwtToken"])

    const Logout = () => {
        if (jwtToken) {
            removeCookie("jwtToken")
            navigate('/login')
        }
    }

    return (
        <header>
            <div className="header">
                <img id="logo" src={`${process.env.PUBLIC_URL}/images/marese.png`} alt="Marese" />       
             </div>
             <div className="header-nav">
                <span className="logout" onClick={Logout}>Logout</span>
             </div>
        </header>
    )
}