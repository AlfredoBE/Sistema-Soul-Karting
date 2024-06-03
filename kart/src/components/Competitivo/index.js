import { clientesCompe } from "../../data/clientes";

import "./index.css";

export default function Competitivo() {
  return (
    <>
      <h3 className="titulo">Competitivo</h3>
      {clientesCompe.map((item) => (
        <div className="box">
            {item.estado === 'Activo' &&
            <div>
              <div
            className="tarjeta"
            style={{ background: item.Vueltas === 0 ? "red" : "A1DD84" }}
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

            <div className="vueltas">
              <p>Vueltas Restantes:</p>
              <h3>{item.Vueltas}</h3>
            </div>
          </div>

          <div className="botones">
            <a href="a">
              <img src="editar.png" alt="a" width={25}></img>
            </a>
            <button>Retirar</button>
          </div>  
            </div>
            
            }


          
        </div>
      ))}
    </>
  );
}
