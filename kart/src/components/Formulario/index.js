import "./index.css";
import React, { useState, handleSubmit, useEffect } from "react";
import axios from "axios";
import Clasificacion from "../TablaClasificacion";
import Swal from "sweetalert2";

export default function Formulario() {
  const idUsuario = localStorage.getItem("id_usuario");

  const [tipoCliente, setTipoCliente] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [rut, setRut] = useState("");
  const [plan, setPlan] = useState("");
  

  const [kart, setKart] = useState("");

  const [fechaActual, setfechaActual] = useState(new Date());
  const [datoclienteCas, setDatoclienteCas]= useState("")
  const [datoclienteCom, setDatoclienteCom]= useState("")

  const [karts, setKarts] = useState([]);

  const [tiempoDisponible, setTiempoDisponible] = useState("");
  const [vueltasDisponibles, setVueltasDisponibles] = useState("");

  useEffect(() => {
    const hoy = new Date();
    const formattedDate = hoy.toISOString().split('T')[0]; // Formatea la fecha como YYYY-MM-DD
    setfechaActual(formattedDate);

    const obtenerKarts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/v1/karts/");
        setKarts(response.data);
      } catch (error) {
        console.error("Error al obtener los karts:", error);
      }
    };

    const obtenerclientes = async () => {
      try {
        const responseCas = await axios.get("http://127.0.0.1:8000/api/v1/clientesCas/");
        const responseCom = await axios.get("http://127.0.0.1:8000/api/v1/clientesComp/")
        setDatoclienteCas(responseCas.data);
        setDatoclienteCom(responseCom.data);
        console.log(responseCas);
      } catch (error) {
        console.error("Error al obtener los karts:", error);
      }
    };
    

    if (datoclienteCas || datoclienteCom ){
      console.log("hola")
      const casualEncontrado = datoclienteCas.find(cliente => cliente.rut_casual == rut);
      const compeEncontrado = datoclienteCom.find(cliente => cliente.rut_competitivo == rut);
      if (casualEncontrado) {
      setNombre(casualEncontrado.nombre_casual);
      setApellido(casualEncontrado.apellido_casual);
      } 
      if (compeEncontrado) {
        setNombre(compeEncontrado.nombre_competitivo);
        setApellido(compeEncontrado.apellido_competitivo);
        } 
    }
    


    
    console.log(rut)

    obtenerKarts();
    obtenerclientes();
  }, [rut]);

  const handleTipoClienteChange = (e) => {
    const selectedPlan = e.target.value;
    setPlan(selectedPlan);

    if (tipoCliente === "Casual") {
      if (selectedPlan === "Plan 1") {
        setTiempoDisponible("600");
      } else if (selectedPlan === "Plan 2") {
        setTiempoDisponible("1200");
      } else if (selectedPlan === "Plan 0") {
        setTiempoDisponible("10");
      }
    }
    if (tipoCliente === "Competitivo") {
      if (selectedPlan === "Plan 1") {
        setVueltasDisponibles("10");
      } else if (selectedPlan === "Plan 2") {
        setVueltasDisponibles("15");
      } else if (selectedPlan === "Plan 0") {
        setVueltasDisponibles("5");
      }
    }
  };

  const handleLimpiarClasificacion = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/v1/clasificacion/"
      );
      const ids = response.data.map((item) => item.id_tablaClasificacion);

      for (const id of ids) {
        await axios.delete(`http://127.0.0.1:8000/api/v1/clasificacion/${id}/`);
      }

      console.log("Registros de clasificación eliminados con éxito");
    } catch (error) {
      console.error("Hubo un error al eliminar los registros:", error);
    }
  };

  const actualizarKart = async (id_kart) => {
    try {
      axios.patch(`http://127.0.0.1:8000/api/v1/karts/${id_kart}/`, {
        estado_kart: "Ocupado",
      });
    } catch (error) {
      console.log("Ocurrio un error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataCasual = {
      nombre_casual: nombre,
      apellido_casual: apellido,
      rut_casual: parseInt(rut, 10),
      plan_casual: plan,
      tiempo_disponible: parseInt(tiempoDisponible, 10),
      fechaRegistro_casual: fechaActual,
      estado_casual: "Activo",
      id_kart: parseInt(kart, 10),
      id_usuario: idUsuario,
    };
    const formDataCompe = {
      nombre_competitivo: nombre,
      apellido_competitivo: apellido,
      rut_competitivo: parseInt(rut, 10),
      plan_competitivo: plan,
      vueltas_disponibles: parseInt(vueltasDisponibles, 10),
      fechaRegistro_competitivo: fechaActual,
      estado_competitivo: "Activo",
      id_usuario: idUsuario,
      id_kart: parseInt(kart, 10),
    };

    console.log("Datos del formulario Compe:", formDataCompe);
    console.log("Datos del formularioCasual:", formDataCasual);
    if (tipoCliente === "Competitivo") {
      const num_kart = formDataCompe.id_kart;
      axios
        .post("http://127.0.0.1:8000/api/v1/clientesComp/", formDataCompe)
        .then((response) => {
          console.log("Formulario enviado:", response.data);
          actualizarKart(num_kart);
          Swal.fire({
            title: '¡Se ha creado un cliente correctamente!',
            icon: "success",
            confirmButtonText: 'OK'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.reload();
                }
            });
          handleLimpiarClasificacion();
        })
        .catch((error) => {
          console.error("Hubo un error al enviar el formulario!", error);
        });
    }
    if (tipoCliente === "Casual") {
      const num_kart = formDataCasual.id_kart;
      axios
        .post("http://127.0.0.1:8000/api/v1/clientesCas/", formDataCasual)
        .then((response) => {
          console.log("Formulario enviado:", response.data);
          actualizarKart(num_kart);
          Swal.fire({
            title: '¡Se ha creado un cliente correctamente!',
            icon: "success",
            confirmButtonText: 'OK'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.reload();
                }
            });
        })
        .catch((error) => {
          console.error("Hubo un error al enviar el formulario!", error);
        });
    }
  };
  
  const validarEntradaTexto = (texto) => {
    const regex = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/;
    return regex.test(texto);
  };

  const handleNombreChange = (e) => {
    const valor = e.target.value;
    if (validarEntradaTexto(valor)) {
      setNombre(valor);
    }
  };

  const handleApellidoChange = (e) => {
    const valor = e.target.value;
    if (validarEntradaTexto(valor)) {
      setApellido(valor);
    }
  };




  return (
    <>
      <div className="formu_body">
        <h2 className="form_h2">Formulario de Cliente</h2>
        <div className="form_box">
            <form onSubmit={handleSubmit} className="form_grid">

              <div className="formu_clientes">
                <label className="form_label" htmlFor="tipoCliente">Tipo de Cliente</label>
                <select
                  id="tipoCliente"
                  name="tipoCliente"
                  value={tipoCliente}
                  onChange={(e) => setTipoCliente(e.target.value)}
                >
                  <option value=""></option>
                  <option value="Casual">Casual</option>
                  <option value="Competitivo">Competitivo</option>
                </select>
              </div>

              <div className="formu_clientes">
                <label className="form_label" htmlFor="rut">RUT</label>
                <input
                  type="number"
                  id="rut"
                  name="rut"
                  value={rut}
                  onChange={(e) => setRut(e.target.value)}
                  required
                />
              </div>

              <div className="formu_clientes">
                <label className="form_label" htmlFor="nombre">Nombre</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={nombre}
                  onChange={handleNombreChange}
                  required
                />
              </div>

              <div className="formu_clientes">
                <label className="form_label" htmlFor="apellido">Apellido</label>
                <input
                  type="text"
                  id="apellido"
                  name="apellido"
                  value={apellido}
                  onChange={handleApellidoChange}
                  required
                />
              </div>
              <div className="formu_clientes">
                <label className="form_label" htmlFor="plan">Plan</label>
                <select
                  id="plan"
                  name="plan"
                  value={plan}
                  onChange={handleTipoClienteChange}
                >
                  <option value=""></option>
                  <option value="Plan 0">Plan 0</option>
                  <option value="Plan 1">Plan 1</option>
                  <option value="Plan 2">Plan 2</option>
                </select>
              </div>

              <div className="formu_clientes">
                <label className="form_label" htmlFor="kart">Kart</label>
                <select
                  id="kart"
                  name="kart"
                  value={kart}
                  onChange={(e) => setKart(e.target.value)}
                  required
                >
                  <option value=""></option>
                  {karts
                    .filter((k) => k.estado_kart === "Desocupado")
                    .map((kart) => (
                      <option key={kart.id_kart} value={kart.id_kart}>
                        Kart {kart.id_kart}
                      </option>
                    ))}
                </select>
              </div>

              <div className="formu_box_button">
                <button className="formu_button" type="submit">Enviar</button>
              </div>
            </form>
        </div>
        
      </div>
      
    </>
  );
}
