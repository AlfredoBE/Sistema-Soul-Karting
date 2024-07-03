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
    <div className="table_body">
      <div className="table_box">
        <h1 className="table_h1">Estado de Karts</h1>

      <table className="table_table">
        <thead className="table_thead">
          <tr>
            <th className="table_th">Kart</th>
            <th className="table_th">Estado</th>
          </tr>
        </thead>
        <tbody className="table_tbody">
          {karts.map((item) => (
            <tr key={item.id_kart}>
              <td className="table_td">Kart {item.id_kart}</td>
              <td className={`table_td ${item.estado_kart === 'Ocupado' ? 'occupied' : 'unoccupied'}`}>{item.estado_kart}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      
    </div>
      
    </>
  );
}
