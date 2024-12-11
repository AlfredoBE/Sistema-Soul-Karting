import './index.css' 
import React, { useState, handleSubmit, useEffect } from 'react';
import axios from 'axios';

export default function Informes(){

const [showYears, setShowYears] = useState(false);
const [años, setAños] = useState([]);
const [selectedYear, setSelectedYear] = useState(null);


  const generarClientesRecurrentess = () => {
    // Muestra los botones de los años al hacer clic en el primer botón
    setShowYears(true);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
    window.location.href = `http://127.0.0.1:8000/api/v1/total-clientes-recurrentes/${e.target.value}`;  // Llamada a tu función para redirigir al año seleccionado
  };

  
  useEffect(() => {
    // Realizar la petición para obtener los datos de ambas tablas
    const obtenerFechas = async () => {
      try {
        const [resCasual, resCompetitivo] = await Promise.all([
          axios.get('http://127.0.0.1:8000/api/v1/clientesCas/'),  // Asegúrate de cambiar la URL
          axios.get('http://127.0.0.1:8000/api/v1/clientesComp/') // Asegúrate de cambiar la URL
        ]);
        
        // Obtener las fechas de las respuestas
        const fechasCasual = resCasual.data.map(item => new Date(item.fechaRegistro_casual));
        const fechasCompetitivo = resCompetitivo.data.map(item => new Date(item.fechaRegistro_competitivo));
        
        // Extraer los años de las fechas y combinar los dos arrays
        const añosCasual = fechasCasual.map(fecha => fecha.getFullYear());
        const añosCompetitivo = fechasCompetitivo.map(fecha => fecha.getFullYear());
        
        // Combinar los años y eliminar los duplicados usando Set
        const añosUnicos = [...new Set([...añosCasual, ...añosCompetitivo])];
        
        // Actualizar el estado con los años únicos
        setAños(añosUnicos);
      } catch (error) {
        console.error("Error al obtener las fechas", error);
      }
    };
    
    obtenerFechas();
  }, []);



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
                <div className='button_reporte'>
                    <select 
                        value={selectedYear || ''} 
                        onChange={handleYearChange} 
                        className='select_reporte'>
                        <option value='' disabled>Reporte Recurrentes</option>
                        {años.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                        ))}
                    </select>
                </div>
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