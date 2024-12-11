import React, { useEffect, useState } from "react";
import axios from "axios";
import Cronometro from "../Cronometro";
import EditarClienteCas from "../Editar_cliente";

import "./index.css";

export default function Casual() {
  const [clientesCas, setClientesCas] = useState([]);
  
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/v1/clientesCas/")
      .then((response) => {
        console.log(response.data); // Para verificar los datos recibidos
        setClientesCas(response.data);
      })
      .catch((error) => {
        console.error("Hubo un error al obtener los datos!", error);
      });
  }, []);

  async function actualizarEstadoCasual(id_casual, nuevoEstado) {
    try {
      if (window.confirm("¿Desea retirar a este cliente Casual? ") == true) {
        const response = await axios.patch(
          `http://127.0.0.1:8000/api/v1/clientesCas/${id_casual}/`, // Ajusta la URL
          { estado_casual: nuevoEstado }
        );

        if (response.status === 200) {
          // Actualiza el estado local del cliente en React
          setClientesCas((prevClientes) =>
            prevClientes.map((cliente) =>
              cliente.id_casual === id_casual
                ? { ...cliente, estado_casual: nuevoEstado }
                : cliente
            )
          );
        } else {
          console.error(
            "Error al actualizar el estado del cliente casual:",
            response.status
          );
        }
      } else {
      }
    } catch (error) {
      console.error(
        "Hubo un error al actualizar el estado del cliente casual:",
        error
      );
    }
  }

  async function liberarKart(id_kart, nuevoEstado) {
    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/api/v1/karts/${id_kart}/`,
        { estado_kart: nuevoEstado }
      );
    } catch (error) {
      console.error("Hubo un error al actualizar el estado del kart:", error);
    }
  }

  const [mostrarFormulario, setMostrarFormulario] = useState({});

  const toggleFormulario = (id_casual) => {
    setMostrarFormulario((prevState) => ({
      ...prevState,
      [id_casual]: !prevState[id_casual],
    }));
  };

  return (
    <>
    
      <h3 className="titulo">Casuales</h3>
      
      <div className="casuales">
      {clientesCas.map((item) => (
        <div className="box" key={item.id_casual}>
          {item.estado_casual === "Activo" && (
            <div>
              <div
                className="tarjeta"
                style={{
                  background:
                    parseInt(
                      localStorage.getItem(`contador_${item.id_casual}`)
                    ) === 0
                      ? "#8a3636"
                      : "#45a049cb",
                }}
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

                {parseInt(
                  localStorage.getItem(`contador_${item.id_casual}`)
                ) !== 0 && (
                  <div className="tiempo">
                    <p>Tiempo Restante:</p>
                    <h3 className="cronometro">
                      <Cronometro
                        seconds={item.tiempo_disponible}
                        id={item.id_casual}
                      ></Cronometro>
                    </h3>
                  </div>
                )}
              </div>

              <div className="botones">
              <button onClick={() => toggleFormulario(item.id_casual)}>
              Modificar
            </button>{mostrarFormulario[item.id_casual] && (
              <EditarClienteCas cliente={item} />
                )}
                <button
                  onClick={() => {
                    actualizarEstadoCasual(item.id_casual, "Inactivo");
                    liberarKart(item.id_kart, "Desocupado");
                  }}
                >
                  Retirar
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
      </div>
      
    </>
  );
}
