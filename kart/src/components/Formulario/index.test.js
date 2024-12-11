// Formulario.test.js
import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Formulario from './index';
import axios from 'axios';

// Mock de axios y Swal
jest.mock('axios');
jest.mock('sweetalert2');

axios.post.mockResolvedValue({ data: {} });
axios.get.mockResolvedValue({ data: {} });
  

describe('Formulario Component', () => {

    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(console, 'error').mockImplementation(() => {});
      });


  test('Renderizar el formulario correctamente', () => {
    render(<Formulario />);

    // Verificamos que los elementos esenciales estén presentes
    expect(screen.getByLabelText(/Tipo de Cliente/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/RUT/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Apellido/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Plan/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Kart/i)).toBeInTheDocument();
  });


  test('Actualizar el estado de nombre y apellido con entradas válidas', () => {
    render(<Formulario />);

    // Simulamos la escritura de un nombre y apellido válidos
    fireEvent.change(screen.getByLabelText(/Nombre/i), { target: { value: 'Juan' } });
    fireEvent.change(screen.getByLabelText(/Apellido/i), { target: { value: 'Perez' } });

    // Verificamos que los valores del estado se actualicen correctamente
    expect(screen.getByLabelText(/Nombre/i).value).toBe('Juan');
    expect(screen.getByLabelText(/Apellido/i).value).toBe('Perez');
  });



 
  test('Manejar un error cuando el formulario de "Competitivo" falle', async () => {
    // Espiar console.error
    jest.spyOn(console, 'error').mockImplementation(() => {});
  
    // Mock de la llamada API para el formulario "Competitivo" que falla
    axios.post.mockRejectedValue(new Error('Error de red'));
  
    render(<Formulario />);
  
    // Rellenar formulario
    fireEvent.change(screen.getByLabelText(/RUT/i), { target: { value: '12345678' } });
    fireEvent.change(screen.getByLabelText(/Nombre/i), { target: { value: 'Juan' } });
    fireEvent.change(screen.getByLabelText(/Apellido/i), { target: { value: 'Pérez' } });
    fireEvent.change(screen.getByLabelText(/Tipo de Cliente/i), { target: { value: 'Competitivo' } });
    fireEvent.change(screen.getByLabelText(/Plan/i), { target: { value: 'Plan 1' } });
  
    // Enviar formulario
    fireEvent.click(screen.getByRole('button', { name: /Enviar/i }));
  
    // Esperar para asegurarse de que la solicitud fue realizada
    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
  
    // Verificar si console.error se llamó con el mensaje correcto
    expect(console.error).toHaveBeenCalledWith('Hubo un error al enviar el formulario!', expect.any(Error));
  
    // Restaurar el espía de console.error
    console.error.mockRestore();
  });

});
