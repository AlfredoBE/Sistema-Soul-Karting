import React, {useEffect, useState } from 'react';

export default function RestarVueltas({vueltasdisponibles, id}){
    const [vueltas, setVueltas] = useState(
        ()=> parseInt(localStorage.getItem(`vueltas_${id}`) || vueltasdisponibles)
    );

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
          alert('Fin de vueltas');
          localStorage.removeItem(vueltas);
          window.location.reload()
        }
      }, [vueltas, id])
      return (
        <>
          <h3>{vueltas}</h3>
          <button className='botonRestar' onClick={restarVueltas}>Restar vuelta</button>
        </>
      );
    }


