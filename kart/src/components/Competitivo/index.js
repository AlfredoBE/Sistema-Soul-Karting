import React, { useEffect, useState } from 'react';
import axios from 'axios';

import "./index.css";

export default function Competitivo() {
  const [clientesCompe, setClientesCompe] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/v1/clientesComp/')
      .then(response => {
        console.log(response.data); // Para verificar los datos recibidos
        setClientesCompe(response.data);
      })
      .catch(error => {
        console.error("Hubo un error al obtener los datos!", error);
      });
  }, []);




  return (
    <>
      <h3 className="titulo">Competitivo</h3>
      {clientesCompe.map((item) => (
        <div className="box" key={item.id_competitivo}>
          {item.estado_competitivo === 'Activo' && (
            <div>
              <div
                className="tarjeta"
                style={{
                  background: item.vueltas_disponibles === 0 ? "#8a3636" : "#508536",
                }}
              >
                <div className="t_superior">
                  <div className="nombre_plan">
                    <div className="nombre">
                      <p>{item.nombre_competitivo}</p>
                      <p>{item.apellido_competitivo}</p>
                    </div>

                    <div className="plan">
                      <p>{item.plan_competitivo}</p>
                    </div>
                  </div>

                  <div className="kart">
                    <p>Kart</p>
                    <p>{item.id_kart}</p>
                  </div>
                </div>

                <div className="vueltas">
                  <p>Vueltas Restantes:</p>
                  <h3>{item.vueltas_disponibles}</h3>
                </div>
              </div>

              <div className="botones">
                <a href="a">
                  <img src="editar.png" alt="a" width={25}></img>
                </a>
                <button>Retirar</button>
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  );
}
