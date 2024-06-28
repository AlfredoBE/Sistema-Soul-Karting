import "./index.css";
import React, { useState, handleSubmit, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Inicio_Sesion() {
  const [idUsuario, setidUsuario] = useState();
  const [nombreUsuario, setnombreUsuario] = useState("");
  const [passwordUsuario, setpasswordUsuario] = useState("");
  const [rolUsuario, setrolUsuario] = useState("");

  const navegar = useNavigate();

  const handleVerificarCredenciales = async () => {
    if (!nombreUsuario) {
      alert("¡Campo de nombre vacio! Debe ingresar un nombre de usuario");
      return;
    } else if(!passwordUsuario){
      alert("¡Campo de contraseña vacio! Debe ingresar la contraseña");
      return;
    }
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/v1/usuario/",
        {
          params: {
            nombre_usuario: nombreUsuario,
            password_usuario: passwordUsuario,
          },
        }
      );

      //Guardar la respuesta
      const datos = response.data;

      //Confirmar si el ingreso coincide con informacion
      //de la base de datos
      const usuario = datos.find(
        (item) =>
          item.nombre_usuario === nombreUsuario &&
          item.password_usuario === passwordUsuario
      );

      if (usuario) {
        //Fijamos el rol, puede ser Usuario o Administrador
        const rol = usuario.rol_usuario;
        setrolUsuario(rol);

        localStorage.setItem("id_usuario", usuario.id_usuario);
        localStorage.setItem("IsAuthenticated", "true");

        if (rol === "Usuario") {
          alert("Ingreso exitoso");
          localStorage.setItem("sesionUsuario", "true");
          localStorage.setItem("sesionAdmin", "false");
          //Esta linea es para darle un poco de tiempo a localStorage antes de cambiar de pagina
          //await new Promise(resolve => setTimeout(resolve, 100));
          navegar("/usuario");
        } else if (rol === "Administrador") {
          alert("Bienvenido Administrador");
          localStorage.setItem("sesionUsuario", "false");
          localStorage.setItem("sesionAdmin","true");
          //await new Promise(resolve => setTimeout(resolve, 100));
          navegar("/admin");
        }
      } else if (usuario == null) {
        alert("Error en Usuario o Contraseña");
      }
    } catch {
      alert("Ha ocurrido un error al iniciar sesion");
    }
  };
  return (
    <div>
      <h2>Inicio de Sesión</h2>
      <div className="form-group">
        <label htmlFor="username">Nombre de Usuario</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Ej: CarlosGomezSepulveda"
          value={nombreUsuario}
          onChange={(e) => setnombreUsuario(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Ej: j65@ams0"
          value={passwordUsuario}
          onChange={(e) => setpasswordUsuario(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <button type="submit" onClick={handleVerificarCredenciales}>
          Iniciar Sesión
        </button>
      </div>
    </div>
  );
  
}