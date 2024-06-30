import './index.css' 
import React, { useState, handleSubmit, useEffect } from 'react';
import axios from 'axios';

export default function FormularioTrabajador(){
    const [idUsuario, setIdUsuario] = useState('');
    const [nombre, setNombre] = useState('');
    const [password, setPassword] = useState('');
    const [rol, setRol] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const formDataTraba = { 
            id_usuario: idUsuario,
            nombre_usuario: nombre,
            password_usuario: password,
            rol_usuario: rol,
        };

        if (formDataTraba) {
            axios.post('http://127.0.0.1:8000/api/v1/usuario/', formDataTraba)
            .then(response => {
            console.log('Formulario enviado:', response.data);
            alert('Se Ingreso el Usuario!');
            
        })
        .catch(error => {
          console.error('Hubo un error al enviar el formulario!', error);
        });

        }
        } 

    return<>
    
    <h2>Formulario de Trabajador</h2>
    <form onSubmit={handleSubmit}>
        <div class="form-group">
            <label for="idusuario">Rut</label>
            <input type="number" id="idusuario" name="idusuario" value={idUsuario} onChange={(e) => setIdUsuario(e.target.value)} required/>
        </div>

        <div class="form-group">
            <label for="nombre">Nombre</label>
            <input type="text" id="nombre" name="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required/>
        </div>

        <div class="form-group">
            <label for="password">Password</label>
            <input type="text" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
        </div>
        <div className="form-group">
                    <label htmlFor="rol">Rol</label>
                    <select id="rol" name="rol" value={rol} onChange={(e) => setRol(e.target.value)} required>
                        <option value="">Seleccione Rol</option>
                        <option value="Administrador">Administrador</option>
                        <option value="Usuario">Usuario</option>
                    </select>
                </div>

        <div class="form-group">
            <button type="submit">Enviar</button>
        </div>
    </form>
    
    </>
}