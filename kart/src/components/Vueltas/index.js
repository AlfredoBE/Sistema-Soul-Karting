import React, {useEffect, useState } from 'react';
import axios from 'axios'; 
import Swal from "sweetalert2";


export default function RestarVueltas({vueltasdisponibles, id}){
    const [vueltas, setVueltas] = useState(
        ()=> parseInt(localStorage.getItem(`vueltas_${id}`) || vueltasdisponibles)
    );

    async function crearRegistroTablaClasificacion(id) {
      try {
          const response = await axios.post(
              'http://127.0.0.1:8000/api/v1/clasificacion/',
              { id_competitivo: id }
          );
      } catch (error) {
          console.error('Hubo un error al crear el registro:', error);
      }
    }

    useEffect(()=>{
        localStorage.setItem(`vueltas_${id}`, vueltas); 
    }, [vueltas, id]);
    
    const restarVueltas = () => {
        setVueltas(prevVueltas => {
          const nuevasVueltas = prevVueltas - 1;
          localStorage.setItem(`vueltas_${id}`, nuevasVueltas.toString());
          return nuevasVueltas;
        });
      };
    
      useEffect(() =>{
        if(vueltas <= 0){
          Swal.fire("¡A un usuario se le acabaron las vueltas!")
          .then(() => {
            window.location.reload();
          });
          localStorage.removeItem(vueltas);
          crearRegistroTablaClasificacion(id);
        }
      }, [vueltas, id])
      return (
        <>
          <h3>{vueltas}</h3>
          <button className='botonRestar' onClick={restarVueltas}>Restar vuelta</button>
        </>
      );
    }


