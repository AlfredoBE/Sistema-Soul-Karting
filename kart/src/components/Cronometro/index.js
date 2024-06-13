import { useEffect, useRef, useState } from 'react';

const formatoTiempo = (time) => {
  let minutos = Math.floor(time / 60);
  let segundos = Math.floor(time - minutos * 60);

  if (minutos <= 10) minutos = '0' + minutos;
  if (segundos <= 10) segundos = '0' + segundos;
  return minutos + ':' + segundos;
};

export default function Cronometro({ seconds, id}) {
  const [contador, setContador] = useState(
    () => parseInt(localStorage.getItem(`contador_${id}`)) || seconds
  );
  const timerId = useRef();
  const [corriendo, setCorriendo] = useState(
    localStorage.getItem(`corriendo_${id}`) === 'true' ? true : false
  );

  const iniciarContador = () => {
    setCorriendo(true);
  };

  useEffect(() => {
    if (corriendo) {
      timerId.current = setInterval(() => {
        setContador((prev) => {
          const nuevoContador = prev - 1;
          localStorage.setItem(`contador_${id}`, nuevoContador.toString());
          return nuevoContador;
        });
      }, 1000);
    }
    return () => clearInterval(timerId.current);
  }, [corriendo, id]);

  useEffect(() => {
    if (contador <= 0) {
      clearInterval(timerId.current);
      alert('Fin de tiempo');
      setCorriendo(false);
      localStorage.removeItem(`corriendo_${id}`);
      window.location.reload()
    }
  }, [contador, id]);

  useEffect(() => {
    localStorage.setItem(`corriendo_${id}`, corriendo);
  }, [corriendo, id]);

  return (
    <>
      <h3>{formatoTiempo(contador)}</h3>
      {!corriendo &&  <button className='botoncronometro' onClick={iniciarContador}>Iniciar</button>}
    </>
  );
}
