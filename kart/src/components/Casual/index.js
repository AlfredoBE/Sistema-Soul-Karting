import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cronometro from "../Cronometro";

import "./index.css";

export default function Casual() {
  const [clientesCas, setClientesCas] = useState([]);
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/v1/clientesCas/')
      .then(response => {
        console.log(response.data); // Para verificar los datos recibidos
        setClientesCas(response.data);
      })
      .catch(error => {
        console.error("Hubo un error al obtener los datos!", error);
      });
  }, []);
  
  return (
    <>
      <h3 className="titulo" >Casuales</h3>
      {clientesCas.map((item) => (

        <div className="box" key={item.id_casual}>
          {item.estado_casual === 'Activo' &&
          <div>

            <div
            className="tarjeta"
            style={{ background:parseInt(localStorage.getItem(`contador_${item.id_casual}`)) === 0 ? "#8a3636" : "#508536"}}
          >
            <div className="t_superior">
              <div className="nombre_plan">
                <div className="nombre">
                  <p>{item.nombre_casual}</p>
                  <p>{item.apellido_casual}</p>
                </div>

                <div className="plan">
                  <p>{item.plan_casual}</p>
                </div>
              </div>

              <div className="kart">
                <p>Kart</p>
                <p>{item.id_kart}</p>
              </div>
            </div>

            {parseInt(localStorage.getItem(`contador_${item.id_casual}`)) !== 0 &&
              <div className="tiempo">
              <p>Tiempo Restante:</p>
              <h3 className="cronometro"><Cronometro seconds={item.tiempo_disponible} id={item.id_casual} ></Cronometro></h3>
            </div>
            }

          </div>

          <div className="botones">
            <a href="a">
              <img src="editar.png" alt="a" width={25}></img>
            </a>
            <button>Retirar</button>
          </div>
          </div>}


        </div>
      ))}
    </>
  );
}
