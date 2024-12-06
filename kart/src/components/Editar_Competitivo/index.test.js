import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import EditarClienteCompe from './index';
import axios from 'axios';
import Swal from 'sweetalert2';

// Mocking axios y Swal
jest.mock('axios');
jest.mock('sweetalert2');

describe('EditarClienteCompe', () => {

  beforeEach(() => {
    jest.clearAllMocks(); // Limpiar los mocks antes de cada test
  });

  test('Debe renderizar el formulario correctamente', () => {
    const cliente = {
      nombre_competitivo: 'Juan',
      apellido_competitivo: 'Pérez',
      rut_competitivo: '12345678',
      plan_competitivo: 'Plan 1',
      fechaRegistro_competitivo: '2023-01-01',
      estado_competitivo: 'Activo',
      id_kart: 1,
      vueltas_disponibles: '10',
    };

    render(<EditarClienteCompe cliente={cliente} />);

    // Verificar que los elementos del formulario estén en el documento
    expect(screen.getByLabelText(/Nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Apellido/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/RUT/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Plan/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Fecha/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Estado/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Kart/i)).toBeInTheDocument();
  });

  test('Debe permitir ingresar los datos y enviar el formulario correctamente', async () => {
    const cliente = {
      id_competitivo: 1,
      nombre_competitivo: 'Juan',
      apellido_competitivo: 'Pérez',
      rut_competitivo: '12345678',
      plan_competitivo: 'Plan 1',
      fechaRegistro_competitivo: '2023-01-01',
      estado_competitivo: 'Activo',
      id_kart: 1,
      vueltas_disponibles: '10',
    };

    render(<EditarClienteCompe cliente={cliente} />);

    // Simular la entrada de datos
    fireEvent.change(screen.getByLabelText(/Nombre/i), { target: { value: 'Carlos' } });
    fireEvent.change(screen.getByLabelText(/Apellido/i), { target: { value: 'González' } });
    fireEvent.change(screen.getByLabelText(/Plan/i), { target: { value: 'Plan 2' } });
    
    // Simular el envío del formulario
    axios.patch.mockResolvedValue({ status: 200 });

    fireEvent.click(screen.getByText(/Actualizar/i));

    // Esperar a que se resuelva la promesa de axios
    await waitFor(() => expect(axios.patch).toHaveBeenCalledWith(
      'http://127.0.0.1:8000/api/v1/clientesComp/1/',
      expect.objectContaining({
        nombre_competitivo: 'Carlos',
        apellido_competitivo: 'González',
        rut_competitivo: 12345678,
        plan_competitivo: 'Plan 2',
        vueltasDisponibles: 15,
        fechaRegistro_competitivo: '2023-01-01',
        estado_competitivo: 'Activo',
        id_kart: 1,
      })
    ));

    // Verificar que Swal fue llamado con los parámetros correctos
    expect(Swal.fire).toHaveBeenCalledWith({
      title: '¡Se ha actualizado el usuario correctamente!',
      icon: "success",
      confirmButtonText: 'OK'
    });
  });

  test('Debe manejar errores al enviar el formulario', async () => {
    // Definir el objeto cliente con los datos necesarios
    const cliente = {
      id: 1,
      rut: '12345678',
      nombre: 'Juan Pérez',
      apellido: 'González',
      plan: 'Plan 1'
    };
  
    // Mockear la función console.error
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  
    render(<EditarClienteCompe cliente={cliente} />);
  
    // Simular la entrada de datos
    fireEvent.change(screen.getByLabelText(/Rut/i), { target: { value: '12345678' } });
    fireEvent.change(screen.getByLabelText(/Nombre/i), { target: { value: 'Juan Pérez' } });
    fireEvent.change(screen.getByLabelText(/Apellido/i), { target: { value: 'González' } });
    fireEvent.change(screen.getByLabelText(/Plan/i), { target: { value: 'Plan 1' } });
  
    // Simular un error en el envío de la solicitud
    axios.patch.mockRejectedValue(new Error('Hubo un error al actualizar el cliente!'));
  
    fireEvent.click(screen.getByText(/Actualizar/i));
  
    // Esperar que console.error haya sido llamado con el mensaje y un objeto de error
    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith("Hubo un error al actualizar el cliente!", expect.any(Error));
    });
  
    // Limpiar el spy
    consoleErrorSpy.mockRestore();
  });
});
