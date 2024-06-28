import Usuario from "./pages/Usuario";
import React from "react";
import ListadoKarts from "./components/ListadoKarts";
import IngresoClientes from "./pages/IngresoClientes";
import Login from "./pages/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
/*import {login} from ":/Pages/login"; */
import "../src/app.css";
import Admin from "./pages/Admin";

function App() {
  return (
    <>
      <Router>
        <Routes>
        <Route path="/" element={<Login></Login>} />
          <Route path="/usuario" element={<Usuario></Usuario>} />
          <Route path="/admin" element={<Admin></Admin>} />
          <Route path="/ingreso" element={<IngresoClientes></IngresoClientes>}/>
          <Route path="/karts" element={<ListadoKarts></ListadoKarts>} />
        </Routes>
      </Router>
    </>
  );
}
export default App;
