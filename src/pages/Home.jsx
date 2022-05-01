//imgs 
import illustrationImg from '../images/illustration.svg' //Ilustração
import googleIconImg from '../images/google-icon.svg' //Logo da Google
import logoImg from '../images/logo.svg' //LetmeAsk

//arquivos importados
import {database} from '../firebase';
import {authContext} from '../contexts/authContext'
import '../styles/Auth.scss';
import '../styles/button.scss'

// react
import { useContext, useState } from 'react';
import { useNavigate, } from 'react-router-dom'; //no lugar de useHistory




export function Home() {


    const navigate = useNavigate()
    const {user , LogginGoogle} = useContext(authContext);
    const [roomCode, setRoomCode] = useState('');

    
  async  function handleCreateRoom() {
        if (!user){
            await LogginGoogle()
        }

        navigate("/create")
    }

    async  function handleJoinRoom(event){
        event.preventDefault();

        if (roomCode.trim() === '') {  
            return;
          }
      

        const roomRef = await  database.ref(`rooms/${roomCode}`).get();

        if(!roomRef.exists()){
            alert('Room does not exist.');
            return;
        }
       
        if (roomRef.val().endedAt) {
            alert('Room already closed.');
            return;
          }
      
        navigate (`/rooms/${roomCode}`);
    }

    return(
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" /> 
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire Suas dúvidas da sua audiência em tempo-real</p>
            </aside>
            <main>
           
                <div className="main-content">
                    <img src={logoImg} alt="letmeask" />
                    <button onClick={handleCreateRoom} className="create-rom">
                        <img src={googleIconImg} alt="Logo da Google" />
                        Crie sua sala com o Google
                    </button>
                    <div className="separator">ou entre em uma sala</div>
                    <form onSubmit={handleJoinRoom}>
                        <input
                          type="text"
                          placeholder="Digite o código da sala"
                          onChange={event => setRoomCode(event.target.value)}
                          value={roomCode}
                          />
                        <button className="Enter"type="submit">Entrar na Sala</button>
                    </form>
                </div>
            </main>
        </div>
    )
}