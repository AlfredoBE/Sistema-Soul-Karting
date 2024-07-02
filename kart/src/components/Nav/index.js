import React from 'react';
import './index.css'
import Cierre_Sesion from "../Cierre_Sesion";
export default function Nav(){
  const handleCierreDeSesion = Cierre_Sesion();
    return<>
    
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/usuario">SoulKarting</a>
      </div>
      <ul className="navbar-links">
        <li><a href="/ingreso">Ingresar Clientes</a></li>
        <li><a href="/karts">Listado de Karts</a></li>
        <li><a href="/informes">Seccion de Informes</a></li>
        <li><a href="/contacto">Contacto</a></li>
        <li><a href='/' onClick={handleCierreDeSesion}>Cerrar Sesión</a></li>
      </ul>
    </nav>
    
    </>
}