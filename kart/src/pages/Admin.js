import React from 'react';

import Casual from "../components/Casual";
import Competitivo from "../components/Competitivo";
import ListadoKarts from "../components/ListadoKarts";
import Formulario from "../components/Formulario";
import Nav_admin from '../components/Nav_Admin';
import Clasificacion from '../components/TablaClasificacion';


export default function Admin() {  
  return (
    <>
          <Nav_admin></Nav_admin>
          <div className="contenedorusuario">
            <div className="componenteusuario">
              <Casual />
            </div>
            <div className="componenteusuario">
              <Competitivo />
            </div>
          </div>
        </>
  )};
