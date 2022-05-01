import copyImg from '../images/copy.svg';

import { useParams } from 'react-router-dom';

import '../styles/RoomCode.scss';



export function RoomCode(){
    
    const {id} = useParams();
    
    return(
       
        <button className="room-code">
            <div>
            
                <img src={copyImg} alt="Copy room code" />
            </div>
            <span>Sala{id}</span>
        </button>
       
    )
}


//Resolver problema de copiar e colar!!!
