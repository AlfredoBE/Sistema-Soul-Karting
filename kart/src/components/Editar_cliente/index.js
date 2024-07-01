import "./index.css";
import React, { useState,handleSubmit, useEffect } from "react";
import axios from "axios";

export default function EditarCliente({ cliente }) {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [rut, setRut] = useState("");
  const [plan, setPlan] = useState("");
  const [fecha, setFecha] = useState("");
  const [estado, setEstado] = useState("");
  const [kart, setKart] = useState("");
  const [karts, setKarts] = useState([]);
  const [tiempoDisponible, setTiempoDisponible] = useState("");

  useEffect(() => {
    if (cliente) {
      setNombre(cliente.nombre_casual);
      setApellido(cliente.apellido_casual);
      setRut(cliente.rut_casual);
      setPlan(cliente.plan_casual);
      setFecha(cliente.fechaRegistro_casual);
      setEstado(cliente.estado_casual);
      setKart(cliente.id_kart);
      setTiempoDisponible(cliente.tiempo_disponible);
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
      setTiempoDisponible("1000");
    } else if (selectedPlan === "Plan 2") {
      setTiempoDisponible("2000");
    } else if (selectedPlan === "Plan 0") {
      setTiempoDisponible("10");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      nombre_casual: nombre,
      apellido_casual: apellido,
      rut_casual: parseInt(rut, 10),
      plan_casual: plan,
      tiempo_disponible: parseInt(tiempoDisponible, 10),
      fechaRegistro_casual: fecha,
      estado_casual: estado,
      id_kart: parseInt(kart, 10),
    };

    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/v1/clientesCas/${cliente.id_casual}/`,
        formData
      );
      if (response.status === 200) {
        alert("Cliente actualizado con éxito!");
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
