import { NavLink } from "react-router";
import "@/styles/Header.css";

function Header() {
    return (
        <header className="header">
            <div className="">
                <NavLink to="/">Inicio</NavLink>
            </div>
            <div className="header__navigation">
                <NavLink to="#">Información</NavLink>
                <NavLink to="/pre-registration">Pre-registro</NavLink>
                <NavLink to="#">Contacto</NavLink>
            </div>
        </header>
    )
}

export default Header;