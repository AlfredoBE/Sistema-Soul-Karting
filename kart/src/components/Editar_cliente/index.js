/*
import React from 'react';


//ESTO VA EN OTRO LADO CREO 

function EditClientForm({ cliente_competitivo, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    nombre_competitivo: '',
    apellido_competitivo: '',
    rut_competitivo: '',
    plan_competitivo: '',
    vueltas_disponibles: '',
    fechaRegistro_competitivo: '',
    estado_competitivo: '',
    id_usuario: '',
    id_kart:''
  });

  useEffect(() => {
    setFormData(cliente_competitivo); // Inicializa el formulario con los datos de cliente
  }, [cliente_competitivo]);
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); // Envía los datos actualizados al componente padre
  };


  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="nombre">nombre_competitivo:</label>
        -
        -
        -
        -
        -
        <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} />
      </div>
      <button type="submit">Guardar</button>
      <button type="button" onClick={onCancel}>Cancelar</button>
    </form>
  );
}

export default EditClientForm;




//NI IDEA DONDE VA, 

import React, { useState } from 'react';
import EditButton from './EditBotonCompetitivo';
import EditClientForm from './EditClientForm';

function ClientList({ clientes }) {
  const [editingClientId, setEditingClientId] = useState(null);

  function handleEdit(clienteId) {
    setEditingClientId(clienteId);
  }

  function handleSave(updatedClientData) {
    // Lógica para actualizar los datos del cliente en tu estado o backend
    setEditingClientId(null); // Cierra el formulario
  }

  function handleCancel() {
    setEditingClientId(null); // Cierra el formulario
  }

  return (
    <div>
      <ul>
        {clientes.map(cliente => (
          <li key={id_competitivo}>
            {editingClientId === id_competitivo ? (
              <EditClientForm 
                cliente={cliente} 
                onSave={handleSave} 
                onCancel={handleCancel} 
              />
            ) : (
              <>
                {cliente.nombre} {cliente.apellido}
                <EditButton Id.competitivo={id_competitivo} onEdit={handleEdit} />
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

*/