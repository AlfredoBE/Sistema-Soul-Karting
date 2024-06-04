/*
    id_casual=models.AutoField(primary_key=True)
    nombre_casual=models.CharField(max_length=30, default='John')   
    apellido_casual=models.CharField(max_length=30,default='Doe')   
    rut_casual=models.IntegerField()
    plan_casual=models.CharField(max_length=20)
    tiempo_disponible=models.IntegerField()
    fechaRegistro_casual=models.DateField()
    estado_casual=models.CharField(max_length=30)
    id_usuario=models.ForeignKey(usuario, on_delete=models.PROTECT)
    id_kart=models.ForeignKey(kart, on_delete=models.PROTECT)
*/
import './index.css' 
import React, { useState, handleSubmit, useEffect } from 'react';
import axios from 'axios';

export default function Formulario(){
    const [idUsuario, setidUsuario] = useState(21876234);
    const [tipoCliente, setTipoCliente] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [rut, setRut] = useState('');
    const [plan, setPlan] = useState('');
    const [fecha, setFecha] = useState('');
    const [estado, setEstado] = useState('');
    const [kart, setKart] = useState('');

    const [tiempoDisponible, setTiempoDisponible] = useState('');
    const [vueltasDisponibles, setVueltasDisponibles] = useState('');

    useEffect(() => {
            console.log({
              vueltasDisponibles: parseInt(vueltasDisponibles, 10),  
              tipoCliente,
              nombre,
              apellido,
              rut: parseInt(rut, 10),
              plan,
              tiempoDisponible,
              fecha,
              estado,
              kart: parseInt(kart, 10),
              idUsuario,
            });
          }, [vueltasDisponibles,tipoCliente, nombre, apellido, rut, plan, tiempoDisponible, fecha, estado, kart]);

    const handleTipoClienteChange = (e) => {
        const selectedPlan = e.target.value;
        setPlan(selectedPlan);

        if (tipoCliente === 'Casual') {
            if (selectedPlan === 'Plan 1') {
            setTiempoDisponible('1000');
            } else if (selectedPlan === 'Plan 2') {
            setTiempoDisponible('2000');
            } else if (selectedPlan === 'Plan 0') {
                setTiempoDisponible('30');
            }
          }
          if (tipoCliente === 'Competitivo') {
            if (selectedPlan === 'Plan 1') {
            setVueltasDisponibles('10');
            } else if (selectedPlan === 'Plan 2') {
            setVueltasDisponibles('15');
            } else if (selectedPlan === 'Plan 0') {
                setVueltasDisponibles('5');
            }
          }
      };




    const handleSubmit = (e) => {
        e.preventDefault();

        const formDataCasual = { 
            nombre_casual: nombre,
            apellido_casual: apellido,
            rut_casual: parseInt(rut, 10),
            plan_casual: plan,
            tiempo_disponible: parseInt(tiempoDisponible, 10),
            fechaRegistro_casual: fecha,
            estado_casual: estado,
            id_kart: parseInt(kart, 10),
            id_usuario: idUsuario,
        };
        const formDataCompe = { 
            nombre_competitivo: nombre,
            apellido_competitivo: apellido,
            rut_competitivo: parseInt(rut, 10),
            plan_competitivo: plan,
            vueltas_disponibles: parseInt(vueltasDisponibles, 10), 
            fechaRegistro_competitivo: fecha,
            estado_competitivo: estado,
            id_usuario: idUsuario,
            id_kart: parseInt(kart, 10),
        };

        console.log('Datos del formulario Compe:', formDataCompe);
        console.log('Datos del formularioCasual:', formDataCasual);
        if (tipoCliente === 'Competitivo') {
            axios.post('http://127.0.0.1:8000/api/v1/clientesComp/', formDataCompe)
            .then(response => {
            console.log('Formulario enviado:', response.data);
            
        })
        .catch(error => {
          console.error('Hubo un error al enviar el formulario!', error);
        });
        }
        if (tipoCliente === 'Casual') {
            axios.post('http://127.0.0.1:8000/api/v1/clientesCas/', formDataCasual)
            .then(response => {
            console.log('Formulario enviado:', response.data);
            
        })
        .catch(error => {
          console.error('Hubo un error al enviar el formulario!', error);
        });
        } 



    };

    return<>
    
    <h2>Formulario de Cliente</h2>
    <form onSubmit={handleSubmit}>
        <div class="form-group">
            <label for="tipoCliente">Tipo de Cliente</label>
            <select id="tipoCliente" name="tipoCliente" value={tipoCliente} onChange={(e) => setTipoCliente(e.target.value)}>
                <option value=""></option>
                <option value="Casual">Casual</option>
                <option value="Competitivo">Competitivo</option>
            </select>
        </div>

        <div class="form-group">
            <label for="nombre">Nombre</label>
            <input type="text" id="nombre" name="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required/>
        </div>

        <div class="form-group">
            <label for="apellido">Apellido</label>
            <input type="text" id="apellido" name="apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} required/>
        </div>

        <div class="form-group">
            <label for="rut">RUT</label>
            <input type="number" id="rut" name="rut" value={rut} onChange={(e) => setRut(e.target.value)} required/>
        </div>

        <div class="form-group">
            <label for="plan">Plan</label>
            <select id="plan" name="plan" value={plan} onChange={handleTipoClienteChange} >
                <option value=""></option>
                <option value="Plan 0">Plan 0</option>
                <option value="Plan 1">Plan 1</option>
                <option value="Plan 2">Plan 2</option>
            </select>
        </div>

        <div class="form-group">
            <label for="fecha">Fecha</label>
            <input type="date" id="fecha" name="fecha" value={fecha} onChange={(e) => setFecha(e.target.value)} required/>
        </div>

        <div class="form-group">
            <label for="estado">Estado</label>
            <select id="estado" name="estado" value={estado} onChange={(e) => setEstado(e.target.value)}>
                <option value=""></option>
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
            </select>
        </div>

        <div class="form-group">
            <label for="kart">Kart</label>
            <input type="text" id="kart" name="kart" value={kart} onChange={(e) => setKart(e.target.value)} required/>
        </div>

        <div class="form-group">
            <button type="submit">Enviar</button>
        </div>
    </form>
    
    </>
}