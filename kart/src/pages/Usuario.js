import Casual from "../components/Casual";
import Competitivo from "../components/Competitivo";
import Nav from "../components/Nav";



export function Usuario(){


    return<>

    <Nav/>
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