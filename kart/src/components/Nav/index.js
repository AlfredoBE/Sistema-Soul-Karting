
import './index.css'

export default function Nav(){

    return<>
    
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/">SoulsKarting</a>
      </div>
      <ul className="navbar-links">
        <li><a href="/">Ingresar Clientes</a></li>
        <li><a href="/about">Listado de Karts</a></li>
        <li><a href="/services">Seccion de Informes</a></li>
        <li><a href="/contact">Contacto</a></li>
      </ul>
    </nav>
    
    </>
}