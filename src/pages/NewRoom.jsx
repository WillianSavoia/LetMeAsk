//imgs
import illustrationImg from '../images/illustration.svg'//Ilustração
import logoImg from '../images/logo.svg' //logo LetmeAsk

//react
import {useState, useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';

//arquivos
import {authContext} from '../contexts/authContext'; //contexto
import {database} from '../firebase'; //banco de dados
import '../styles/Auth.scss'; //estilização
import '../styles/button.scss' //estilização dos botões 



export function NewRoom() {
    const {user} = useContext(authContext);
    const navigate = useNavigate()
    const [newRoom, setNewRoom] = useState('');

    async function handleCreateRoom(event) {
        event.preventDefault();
        
        if(newRoom.trim() === ''){
            return;
        }

        const roomRef = database.ref('rooms');

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id,
          })
      

        navigate(`/admin/rooms/${firebaseRoom.key}`)
    
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
                    <h1>Bem-vindo(a){user?.name}.</h1>
                    <h2>Criar uma nova sala.</h2>
                    <div className="separator">ou entre em uma sala</div>
                    <form onSubmit={handleCreateRoom}>
                        <input
                          type="text"
                          placeholder="Nome da sala"
                          onChange={FormEvent => setNewRoom(FormEvent.target.value)}
                          value={newRoom}
                          />
                        <button className="Enter"type="submit">Criar Sala</button>
                    </form>
                    <p>Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
                    </p>
                </div>
            </main>
        </div>
    )
}
