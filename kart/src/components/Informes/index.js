import './index.css' 
import React, { useState, handleSubmit, useEffect } from 'react';
import axios from 'axios';

export default function Informes(){
   async function generarClientesRecurrentes(){
    const response = await axios.get("http://127.0.0.1:8000/api/v1/total-clientes-recurrentes/", { responseType: 'blob' });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'total_clientes_recurrentes.pdf');
    document.body.appendChild(link);
    link.click();
   }
   async function generarClientesPorPlan(){
    const response = await axios.get("http://127.0.0.1:8000/api/v1/clientes-pdf/", { responseType: 'blob' });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'clientes_tipo.pdf');
    document.body.appendChild(link);
    link.click();
   }
   async function generarTablaDeClasificacion() {
    const response = await axios.get("http://127.0.0.1:8000/api/v1/tabla-clasificacion-pdf/", { responseType: 'blob' });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'tabla_clasificacion.pdf');
    document.body.appendChild(link);
    link.click();
}
    return (
<>
<button onClick={generarClientesRecurrentes}>Reporte Recurrentes</button>
<button onClick={generarClientesPorPlan}>Reporte Plan</button>
<button onClick={generarTablaDeClasificacion}>Reporte Clasificacion</button>
</>
    );
}