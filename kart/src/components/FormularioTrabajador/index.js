import './index.css' 
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";

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
            Swal.fire({
                title: '¡Se ha creado un usuario correctamente!',
                icon: "success",
                confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload();
                    }
                });
        })
        .catch(error => {
          console.error('Hubo un error al enviar el formulario!', error);
        });

        }
        } 

    return<>
    <div className="formu_body">
        <h2 className="form_h2">Formulario de Trabajador</h2>
        <div className="form_box">
            <form onSubmit={handleSubmit} className="form_grid">
                <div className="form_clientes">
                    <label className="form_label" htmlFor="idusuario">Rut</label>
                    <input type="number" id="idusuario" name="idusuario" value={idUsuario} onChange={(e) => setIdUsuario(e.target.value)} required/>
                </div>

                <div className="form_clientes">
                    <label className="form_label" htmlFor="nombre">Nombre</label>
                    <input type="text" id="nombre" name="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required/>
                </div>

                <div className="form_clientes">
                    <label className="form_label" htmlFor="password">Password</label>
                    <input type="text" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                </div>
                <div className="form_clientes">
                            <label className="form_label" htmlFor="rol">Rol</label>
                            <select id="rol" name="rol" value={rol} onChange={(e) => setRol(e.target.value)} required>
                                <option value="">Seleccione Rol</option>
                                <option value="Administrador">Administrador</option>
                                <option value="Usuario">Usuario</option>
                            </select>
                        </div>

                <div className="formu_box_button">
                    <button className="formu_button_trabajador" type="submit">Enviar</button>
                </div>
            </form>
        </div>
        
    </div>
    
    
    </>
}