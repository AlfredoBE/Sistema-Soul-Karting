import React from 'react';

import Casual from "../components/Casual";
import Competitivo from "../components/Competitivo";
import ListadoKarts from "../components/ListadoKarts";
import Formulario from "../components/Formulario";
import Nav from "../components/Nav";
import Clasificacion from '../components/TablaClasificacion';

export default function Usuario() {
  return (
        <>
          <Nav></Nav>
          <div className="contenedorusuario">
            <div className="componenteusuario">
              <Casual />
            </div>
            <div className="componenteusuario">
              <Competitivo />
            </div>
            <div>
              <Clasificacion />
            </div>
          </div>
        </>
  );}