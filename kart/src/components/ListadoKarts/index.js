
import { Karts } from '../../data/kart'
import './index.css'


export default function ListadoKarts(){

    return<>
        <h1>Estado de Karts</h1>

        <table>
            <thead>
                <tr>
                    <th>Kart</th>
                    <th>Estado</th>
                </tr>
            </thead>
            <tbody>
                {Karts.map((item)=>(
                    <tr>
                        <td>Kart {item.id}</td>
                        <td>{item.estadoKart}</td>
                    </tr>

                ))}
            </tbody>
            


            
        </table>
    </>
}