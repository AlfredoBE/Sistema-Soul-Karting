import { clientesCasual } from "../../data/clientes";
import Cronometro from "../Cronometro";

import "./index.css";

export default function Casual() {
  
  
  return (
    <>
      <h3 className="titulo" >Casuales</h3>
      {clientesCasual.map((item) => (

        <div className="box">
          {item.estado === 'Activo' &&
          <div>

            <div
            className="tarjeta"
            style={{ background:parseInt(localStorage.getItem(`contador_${item.id}`)) === 0 ? "red" : "A1DD84"}}
          >
            <div className="t_superior">
              <div className="nombre_plan">
                <div className="nombre">
                  <p>{item.Nombre}</p>
                  <p>{item.Apellido}</p>
                </div>

                <div className="plan">
                  <p>{item.Plan}</p>
                </div>
              </div>

              <div className="kart">
                <p>Kart</p>
                <p>{item.Kart}</p>
              </div>
            </div>

            {parseInt(localStorage.getItem(`contador_${item.id}`)) !== 0 &&
              <div className="tiempo">
              <p>Tiempo Restante:</p>
              <h3 className="cronometro"><Cronometro seconds={item.Tiempo} id={item.id} ></Cronometro></h3>
            </div>
            }

          </div>

          <div className="botones">
            <a href="a">
              <img src="editar.png" alt="a" width={25}></img>
            </a>
            <button>Retirar</button>
          </div>
          </div>}


        </div>
      ))}
    </>
  );
}
