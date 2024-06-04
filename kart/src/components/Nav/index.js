import React from 'react';
import './index.css'

export default function Nav(){

    return<>
    
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/">SoulsKarting</a>
      </div>
      <ul className="navbar-links">
        <li><a href="/ingreso">Ingresar Clientes</a></li>
        <li><a href="/karts">Listado de Karts</a></li>
        <li><a href="/services">Seccion de Informes</a></li>
        <li><a href="/contacto">Contacto</a></li>
      </ul>
    </nav>
    
    </>
}