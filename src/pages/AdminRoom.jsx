import logoImg from '../images/logo.svg'; 
import deleteImg from '../images/delete.svg';
import checkImg from '../images/check.svg';
import answerImg from '../images/answer.svg';


import {useParams, useNavigate} from 'react-router-dom';

import { RoomCode } from '../components/RoomCode'
import {database} from '../firebase'; //banco de dados
import {useRoom} from '../hook/useRoom'

import { Question } from '../components/question/Question';


import '../styles/Room.scss'


export function AdminRoom() {    
    const navigate = useNavigate();
    const {id} = useParams();
    const {title, Questions} = useRoom(id);

    async  function handleEndRoom(){
        await database.ref(`rooms/${id}`).update({
            endedAt: new Date(),
        })

        navigate('/')
    }

   async function handelDeleteQuestions (questionId){
        if (window.confirm('Tem certeza que você deseja excluir essa pergunta?')){
           await database.ref(`rooms/${id}/questions/${questionId}`).remove();
    }

    }
    async function handelCheckedQuestionsAsAnswered (questionId){
            await database.ref(`rooms/${id}/questions/${questionId}`).update({
                isAnswered: true,
            });
    }

    async function handelHightLightQuestions (questionId){
        await database.ref(`rooms/${id}/questions/${questionId}`).update({
            ishighlighted: true,
        });
    }

    
    return(
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="letmeask" />
                    <div>
                    <RoomCode />
                    <button className="Enter"type="submit" onClick={handleEndRoom}>Encerrar Sala </button>
                    </div>
                </div>
            </header>
            <main className="content">
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {Questions.length > 0 && <span>{Questions.length} pergunta(s)</span>}
                </div>
               
                <div className="question-list">
                    
                {Questions.map(question =>{
                    return(
                        <Question 
                        key= {question.id}
                        content= {question.content}
                        author= {question.author}
                        isAnswered= {question.isAnswered}
                        ishighlighted= {question.isHighlighted}
                        >
                               {!question.isAnswered && (
                                <>
                                  <button
                                    onClick={() => handelCheckedQuestionsAsAnswered(question.id)}
                                  >
                                    <img src={checkImg} alt="Marcar pergunta como respondida" />
                                  </button>
                                  <button
                                    onClick={() => handelHightLightQuestions(question.id)}
                                  >
                                    <img src={answerImg} alt="Dar destaque à pergunta" />
                                  </button>
                                </>
                           )}
                            <button  onClick={() =>handelDeleteQuestions(question.id)}>
                                <img src={deleteImg} alt="Remover pergunta" />
                            </button>
                        </Question>
                    )
                })}
                </div>
            </main>
        </div>
    )
}
