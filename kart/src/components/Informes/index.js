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
<div className='button_body_informes'>

    <div className='box_informe'>
        <div className='informes_h1'>
        <h1>Informes SoulKarting</h1>
        </div>
        <div className='button_box_informes'>
            <div className='button_box_reporte'>
            <button className='button_reporte' onClick={generarClientesPorPlan}>Reporte Plan</button>
            </div>
            <div className='button_box_reporte'>
                <button className='button_reporte' onClick={generarClientesRecurrentes}>Reporte Recurrentes</button>
            </div>
            <div className='button_box_reporte'>
                <button className='button_reporte' onClick={generarTablaDeClasificacion}>Reporte Clasificacion</button>
            </div>
        </div>
    </div>

    

    
</div>

</>
    );
}