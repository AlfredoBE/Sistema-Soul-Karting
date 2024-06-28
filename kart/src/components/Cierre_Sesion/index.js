import React, { useState, handleSubmit, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Cierre_Sesion() {
    const navegar = useNavigate();

    const handleCierreDeSesion = () => {
  localStorage.setItem("sesionAdmin", "false");
  localStorage.setItem("sesionUsuario", "false");
  localStorage.setItem("IsAuthenticated", "false");
  navegar("/");
    };
  return handleCierreDeSesion;
}
