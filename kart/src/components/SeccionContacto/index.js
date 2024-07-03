import React from 'react';
import './index.css'

export default function SeccionContacto(){
    return(<>
      <body class="cuerpoContacto">
        <h1 class="tituloContacto">Sección de contacto</h1>
        <p class="textoContacto">
          En caso de problemas de funcionamiento o sugerencias, por favor contactar por el medio de correo electrónico al equipo desarrollador:
        </p>
        <ul class="listaContacto">
          <li>Alfredo Becerra: <a href="mailto:alfredo.becerra@alu.ucm.cl">alfredo.becerra@alu.ucm.cl</a></li>
          <li>Sebastian Gallegos: <a href="mailto:sebastian.gallegos@alu.ucm.cl">sebastian.gallegos@alu.ucm.cl</a></li>
          <li>Nicolas Gutierrez: <a href="mailto:nicolas.gutierrez.02@alu.ucm.cl">nicolas.gutierrez.02@alu.ucm.cl</a></li>
          <li>Felipe Henriquez: <a href="mailto:felipe.henriquez.01@alu.ucm.cl">felipe.henriquez.01@alu.ucm.cl</a></li>
          <li>Cristóbal Ramirez: <a href="mailto:cristobal.ramirez@alu.ucm.cl">cristobal.ramirez@alu.ucm.cl</a></li>
        </ul>
      </body>
    </>);
}