import Casual from "../components/Casual";
import Competitivo from "../components/Competitivo";



export function Usuario(){


    return<>

    <h1>Soy admin cabros</h1>
    
    <div className="contenedorusuario">
      <div className="componenteusuario" >
        <Casual/>
      </div>
      <div className="componenteusuario">
        <Competitivo/>        
      </div>

    </div>
    
    </>
}