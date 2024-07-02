import "./index.css";
import React, { useState,handleSubmit, useEffect } from "react";
import axios from "axios";

export default function EditarClienteCompe({ cliente }) {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [rut, setRut] = useState("");
  const [plan, setPlan] = useState("");
  const [fecha, setFecha] = useState("");
  const [estado, setEstado] = useState("");
  const [kart, setKart] = useState("");
  const [karts, setKarts] = useState([]);
  const [vueltasDisponibles, setVueltasDisponibles] = useState("");
  
  useEffect(() => {
    if (cliente) {
      setNombre(cliente.nombre_competitivo);
      setApellido(cliente.apellido_competitivo);
      setRut(cliente.rut_competitivo);
      setPlan(cliente.plan_competitivo);
      setFecha(cliente.fechaRegistro_competitivo);
      setEstado(cliente.estado_competitivo);
      setKart(cliente.id_kart);
      setVueltasDisponibles(cliente.vueltas_disponibles);
    }
  }, [cliente]);
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

  const handleTipoClienteChange = (e) => {
    const selectedPlan = e.target.value;
    setPlan(selectedPlan);

    if (selectedPlan === "Plan 1") {
      setVueltasDisponibles("10");
    } else if (selectedPlan === "Plan 2") {
      setVueltasDisponibles("15");
    } else if (selectedPlan === "Plan 0") {
      setVueltasDisponibles("5");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      nombre_casual: nombre,
      apellido_casual: apellido,
      rut_casual: parseInt(rut, 10),
      plan_casual: plan,
      vueltasDisponibles: parseInt(vueltasDisponibles, 10),
      fechaRegistro_casual: fecha,
      estado_casual: estado,
      id_kart: parseInt(kart, 10),
    };

    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/api/v1/clientesComp/${cliente.id_competitivo}/`,
        formData
      );
      if (response.status === 200) {
        alert("Cliente actualizado con éxito!");
        window.location.reload();
      } else {
        console.error("Error al actualizar el cliente:", response.status);
      }
    } catch (error) {
      console.error("Hubo un error al actualizar el cliente!", error);
    }
  };

  return (
    <>
      <h2>Editar Cliente</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="apellido">Apellido</label>
          <input
            type="text"
            id="apellido"
            name="apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="rut">RUT</label>
          <input
            disabled
            type="number"
            id="rut"
            name="rut"
            value={rut}
            onChange={(e) => setRut(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="plan">Plan</label>
          <select
          disabled
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

        <div className="form-group">
          <label htmlFor="fecha">Fecha</label>
          <input
          disabled
            type="date"
            id="fecha"
            name="fecha"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="estado">Estado</label>
          <select
          disabled
            id="estado"
            name="estado"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
          >
            <option value=""></option>
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="kart">Kart</label>
          <select
          disabled
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

        <div className="form-group">
          <button type="submit">Actualizar</button>
        </div>
      </form>
    </>
  );
}
