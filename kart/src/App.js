import  Usuario  from "./pages/Usuario";
import React from 'react';
import ListadoKarts from "./components/ListadoKarts"
import  IngresoClientes  from "./pages/IngresoClientes";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
/*import {login} from ":/Pages/login"; */

import Nav from "./components/Nav"

import "../src/app.css";

function App() {
  return   <>


      <Nav></Nav>
      <Router>
        <Routes>
          <Route path="/" element={<Usuario></Usuario>}/>
          <Route path="/ingreso" element={<IngresoClientes></IngresoClientes>}/>
          <Route path="/karts" element={<ListadoKarts></ListadoKarts>} />
          
        </Routes>
      </Router>

      
    </>
}
/*  
import './App.css';
import React, {useState} from 'react';
import { Tecnico } from './Pages/rolTecnico';
import { Recepcion } from './Pages/rolRecepcion';
import { DuenoST } from './Pages/rolDueno';


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './Pages/home';
import { Login } from './Pages/login';
import { HomeRols } from './components/notData';
return < >
   <Router>

      <Routes>
        <Route path="*" element={ <HomeRols></HomeRols> }></Route>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/login" element={<Login onAuthentication={handleAuthentication} ></Login>}></Route>
          {isAuthenticated && rol ==='recepcionista' && <Route path="/recepcion/*" element={<Recepcion></Recepcion>}></Route>}
          {isAuthenticated && rol ==='tecnico' && <Route path="/tecnico/*" element={<Tecnico></Tecnico>}></Route>}
          {isAuthenticated && rol ==='administrador' && <Route path="/dueno/*" element={<DuenoST></DuenoST>}></Route>}
      </Routes>
      {isAuthenticated && (
                    
                    <button className='logout' onClick={handleLogout}><img src="/logout.png" alt="logout" /></button>
                )}
    </Router>
  </>
}*/
export default App;
