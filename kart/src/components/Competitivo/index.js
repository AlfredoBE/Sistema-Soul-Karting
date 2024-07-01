import React, { useEffect, useState } from "react";
import axios from "axios";

import "./index.css";
import RestarVueltas from "../Vueltas";

export default function Competitivo() {
  const [clientesCompe, setClientesCompe] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/v1/clientesComp/")
      .then((response) => {
        console.log(response.data); // Para verificar los datos recibidos
        setClientesCompe(response.data);
      })
      .catch((error) => {
        console.error("Hubo un error al obtener los datos!", error);
      });
  }, []);

  async function actualizarEstadoCompetitivo(id_competitivo, nuevoEstado) {
    try {
      if(window.confirm("Seguro?")== true){
      const response = await axios.patch(
        `http://127.0.0.1:8000/api/v1/clientesComp/${id_competitivo}/`, // Ajusta la URL
        { estado_competitivo: nuevoEstado }
      );

      if (response.status === 200) {
        // Actualiza el estado local del cliente en React
        setClientesCompe((prevClientes) =>
          prevClientes.map((cliente) =>
            cliente.id_competitivo === id_competitivo
              ? { ...cliente, estado_competitivo: nuevoEstado }
              : cliente
          )
        );
      } else {
        console.error("Error al actualizar el estado:", response.status);
      }
    }else{
      alert("Ta bien");
    }
    } catch (error) {
      console.error("Hubo un error al actualizar el estado:", error);
    }
  }

  async function liberarKart(id_kart, nuevoEstado){
    try{
      const response = await axios.patch(
        `http://127.0.0.1:8000/api/v1/karts/${id_kart}/`,
        { estado_kart: nuevoEstado }
      )
    } catch(error){
      console.error("Hubo un error al actualizar el estado del kart:", error)
    }
  }

  return (
    <>
      <h3 className="titulo">Competitivo</h3>
      {clientesCompe.map((item) => (
        <div className="box" key={item.id_competitivo}>
          {item.estado_competitivo === "Activo" && (
            <div>
              <div
                className="tarjeta"
                style={{
                  background:
                  parseInt(
                    localStorage.getItem(`vueltas_${item.id_competitivo}`)
                  ) === 0 ? "#8a3636" : "#508536",
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

                {parseInt(
                  localStorage.getItem(`vueltas_${item.id_competitivo}`)
                ) !== 0 && (
                  <div className="vueltas">
                    <p>Vueltas Restantes:</p>
                    <h3 className="vueltasRestantes">
                      <RestarVueltas
                        vueltasdisponibles={item.vueltas_disponibles}
                        id={item.id_competitivo}
                      ></RestarVueltas>
                    </h3>
                  </div>
                )}
              </div>

              <div className="botones">
                <a href="modificar">
                  <img src="editar.png" alt="a" width={25}></img>
                </a>
                <button
                  onClick={() =>{actualizarEstadoCompetitivo(item.id_competitivo, "Inactivo");
                    liberarKart(item.id_kart, "Desocupado")
                  }
                  }
              
                >
                  Retirar
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  );
}
