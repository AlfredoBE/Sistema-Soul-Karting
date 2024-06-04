import React from 'react';

import Casual from "../components/Casual";
import Competitivo from "../components/Competitivo";
import ListadoKarts from "../components/ListadoKarts";
import Formulario from "../components/Formulario";


export default function Usuario() {
  return (
    <>
      <div className="contenedorusuario">
        <div className="componenteusuario">
          <Casual />
        </div>
        <div className="componenteusuario">
          <Competitivo />
        </div>
      </div>


    </>
  );
}
