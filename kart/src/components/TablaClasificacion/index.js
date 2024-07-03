import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";

export default function Clasificacion() {
  const [Clasificacion, setClasificacion] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/v1/clasificacion/")
      .then((response) => {
        console.log(response.data); // Para verificar los datos recibidos
        // Ordenar los datos por el tiempo de vuelta más rápido (ascendente)
        const datosOrdenados = response.data.sort((a, b) => {
          // Convertir los tiempos a segundos para comparar
          const tiempoA = tiempoASegundos(a.tiempoVueltaMasRapida);
          const tiempoB = tiempoASegundos(b.tiempoVueltaMasRapida);
          return tiempoA - tiempoB;
        });
        setClasificacion(datosOrdenados);
      })
      .catch((error) => {
        console.error("Hubo un error al obtener los datos!", error);
      });
  }, []);

  // Función para convertir tiempo "00:00:00" a segundos
  const tiempoASegundos = (tiempo) => {
    const partes = tiempo.split(":");
    return parseInt(partes[0]) * 3600 + parseInt(partes[1]) * 60 + parseInt(partes[2]);
  };

  return (
    <div className="clasificacion_body">
      <div className="tabla-container">
      <div className="clasificacion_h1">
        <h1>Posiciones de carrera</h1>
      </div>
        <table className="tabla-clasificacion">
          <thead className="clasificacion_thead">
            <tr className="clasificacion_th">
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
      </div>
    </div>
  );
}
