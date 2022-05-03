import copyImg from '../images/copy.svg';

import { useParams } from 'react-router-dom';

import '../styles/RoomCode.scss';



export function RoomCode(){
    
    const {id} = useParams();
    
    function copyRoomCodeToClipboard() {
      navigator.clipboard.writeText(`${id}`);
    }

    
    return(
   
      
        <button className="room-code" onClick={copyRoomCodeToClipboard}>
            <div>
            
                <img src={copyImg} alt="Copy room code" />
            </div>
            <span>Sala{id}</span>
        </button>
       
    )
}
