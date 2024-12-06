import React from "react";

import Nav from "../components/Nav";
import Nav_admin from "../components/Nav_Admin";
import Clasificacion from "../components/TablaClasificacion";
export default function TablaClasificacion() {
  const sesionAdmin = localStorage.getItem("sesionAdmin");
  const sesionUsuario = localStorage.getItem("sesionUsuario");
  return (
    <>
      {sesionAdmin === "true" && sesionUsuario == "false" && <Nav_admin />}
      {sesionAdmin === "false" && sesionUsuario == "true" && <Nav />}
      <Clasificacion></Clasificacion>
    </>
  );
}