import React from "react";

import Formulario from "../components/Formulario";
import Nav from "../components/Nav";
import Nav_admin from "../components/Nav_Admin";

export default function IngresoClientes() {
  const sesionAdmin = localStorage.getItem("sesionAdmin");
  const sesionUsuario = localStorage.getItem("sesionUsuario");
  return (
    <>
      {sesionAdmin === "true" && sesionUsuario == "false" && <Nav_admin />}
      {sesionAdmin === "false" && sesionUsuario == "true" && <Nav />}
      <Formulario />
    </>
  );
}
