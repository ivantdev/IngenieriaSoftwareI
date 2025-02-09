import "/src/styles/Navbar.css"; // Importamos los estilos de la navbar
//import Home from "/src/pages/Home";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <a href="/">Inicio</a>
        </div>
        <div className="navbar-right">
          <a href="#">Información</a>
          <a href="#">Pre-Registro</a>
          <a href="#">Contacto</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
