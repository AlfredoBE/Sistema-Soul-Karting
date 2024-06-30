import React from "react";
import Nav from "../components/Nav";
import Nav_admin from "../components/Nav_Admin";
import ListadoKarts from "../components/ListadoKarts";
export default function Karts() {
  const sesionAdmin = localStorage.getItem("sesionAdmin");
  const sesionUsuario = localStorage.getItem("sesionUsuario");
  return (
    <>
      {sesionAdmin === "true" && sesionUsuario == "false" && <Nav_admin />}
      {sesionAdmin === "false" && sesionUsuario == "true" && <Nav />}
      <ListadoKarts></ListadoKarts>
    </>
  );
}
