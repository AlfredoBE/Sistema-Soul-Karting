import Usuario from "./pages/Usuario";
import React from "react";
import ListadoKarts from "./components/ListadoKarts";
import IngresoClientes from "./pages/IngresoClientes";
import Ingresar_usuarios from "./pages/Ingresar_usuarios";
import Login from "./pages/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
/*import {login} from ":/Pages/login"; */
import "../src/app.css";
import Admin from "./pages/Admin";
import Karts from "./pages/Karts";

function App() {
  return (
    <>
      <Router>
        <Routes>
        <Route path="/" element={<Login></Login>} />
          <Route path="/usuario" element={<Usuario></Usuario>} />
          <Route path="/admin" element={<Admin></Admin>} />
          <Route path="/ingreso" element={<IngresoClientes></IngresoClientes>}/>
          <Route path="/karts" element={<Karts></Karts>} />
          <Route path="/ingresar_usuarios" element={<Ingresar_usuarios></Ingresar_usuarios>} />
        </Routes>
      </Router>
    </>
  );
}
export default App;
