import React from 'react'
import Informes from '../components/Informes';
import Nav from "../components/Nav";
import Nav_admin from "../components/Nav_Admin";

export default function SeccionInforme() {
  const sesionAdmin = localStorage.getItem("sesionAdmin");
  const sesionUsuario = localStorage.getItem("sesionUsuario");
  return (
    <>
      {sesionAdmin === "true" && sesionUsuario == "false" && <Nav_admin />}
      {sesionAdmin === "false" && sesionUsuario == "true" && <Nav />}
      <Informes></Informes>
      </>
  );
}