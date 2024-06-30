/*
cuando un cliente competitivo termina sus rondas disponibles
renderiza en el componente Clasificacion el registro creado en el modelo tablaClasificacion


Cuando se añade un nuevo cliente competitivo se reinicia el tablero de clasificion
porque una carrera competitiva ocurre entre un grupo de clientes, a diferencia de los casuales
*/

import React, { useEffect, useState } from "react";
import axios from "axios";

import "./index.css";

export default function Clasificacion({}) {
  const [Clasificacion, setClasificacion] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/v1/clasificacion/")
      .then((response) => {
        console.log(response.data); // Para verificar los datos recibidos
        setClasificacion(response.data);
      })
      .catch((error) => {
        console.error("Hubo un error al obtener los datos!", error);
      });
  }, []);
 
  return (
    <>
      <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Tiempo Vuelta Más Rápida</th>
            </tr>
          </thead>
          <tbody>
            {Clasificacion.map((item) => (
              <tr key={item.id_tablaClasificacion}>
                <td>
                  {item.nombre_clienteCompetitivo} {item.apellido_clienteCompetitivo} 
                </td>
                <td>{item.tiempoVueltaMasRapida}</td> 
              </tr>
            ))}
          </tbody>
        </table>
    </>
  );
}
