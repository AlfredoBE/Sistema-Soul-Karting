import React, { useEffect, useState } from "react";
import axios from "axios";

import "./index.css";

export default function ListadoKarts() {
  const [karts, setKarts] = useState([]);
  useEffect(() => {
    const obtenerKarts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/v1/karts/");
        setKarts(response.data);
      } catch (error) {
        console.error("Error al obtener los karts:", error);
      }
    };

    obtenerKarts();
  }, []);
  
  return (
    <>
      <h1>Estado de Karts</h1>

      <table>
        <thead>
          <tr>
            <th>Kart</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {karts.map((item) => (
            <tr key={item.id_kart}>
              <td>Kart {item.id_kart}</td>
              <td>{item.estado_kart}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
