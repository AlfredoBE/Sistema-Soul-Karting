
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';


import FormularioTrabajador from './index';
import axios from 'axios';
import Swal from 'sweetalert2';

// Mocking axios y Swal
jest.mock('axios');
jest.mock('sweetalert2');

describe('FormularioTrabajador', () => {

  beforeEach(() => {
    jest.clearAllMocks(); // Limpiar los mocks antes de cada test
  });

  test('Debe renderizar el formulario correctamente', () => {
    render(<FormularioTrabajador />);

    // Verificar que los elementos del formulario estén en el documento
    expect(screen.getByLabelText(/Rut/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Rol/i)).toBeInTheDocument();
  });

  test('Debe permitir ingresar los datos y enviar el formulario correctamente', async () => {
    render(<FormularioTrabajador />);

    // Simular la entrada de datos
    fireEvent.change(screen.getByLabelText(/Rut/i), { target: { value: '12345678' } });
    fireEvent.change(screen.getByLabelText(/Nombre/i), { target: { value: 'Juan Pérez' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'contraseña' } });
    fireEvent.change(screen.getByLabelText(/Rol/i), { target: { value: 'Administrador' } });

    // Simular el envío del formulario
    axios.post.mockResolvedValue({ data: { message: 'Usuario creado correctamente' } });

    fireEvent.click(screen.getByText(/Enviar/i));

    // Esperar a que se resuelva la promesa de axios
    await waitFor(() => expect(axios.post).toHaveBeenCalledWith('http://127.0.0.1:8000/api/v1/usuario/', expect.objectContaining({
      id_usuario: '12345678',
      nombre_usuario: 'Juan Pérez',
      password_usuario: 'contraseña',
      rol_usuario: 'Administrador'
    })));

    // Verificar que Swal fue llamado con los parámetros correctos
    expect(Swal.fire).toHaveBeenCalledWith({
      title: '¡Se ha creado un usuario correctamente!',
      icon: "success",
      confirmButtonText: 'OK'
    });
  });

  test('Debe manejar errores al enviar el formulario', async () => {
    render(<FormularioTrabajador />);

    // Simular la entrada de datos
    fireEvent.change(screen.getByLabelText(/Rut/i), { target: { value: '12345678' } });
    fireEvent.change(screen.getByLabelText(/Nombre/i), { target: { value: 'Juan Pérez' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'contraseña' } });
    fireEvent.change(screen.getByLabelText(/Rol/i), { target: { value: 'Administrador' } });

    // Simular un error de axios
    axios.post.mockRejectedValue(new Error('Hubo un error al enviar el formulario!'));

    fireEvent.click(screen.getByText(/Enviar/i));

    // Verificar que la función de error haya sido llamada
    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
  });

});
