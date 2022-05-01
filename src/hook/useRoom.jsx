import { useState, useEffect } from 'react';

import { useAuth } from '../hook/useAuth'

import {database} from '../firebase'; //banco de dados


export function useRoom(id){
    const {user} = useAuth();
    const [Questions, setQuestions] = useState([]);
    const [title, setTitle] = useState('');
    
    useEffect(() =>{
        const roomRef = database.ref(`rooms/${id}`);

     
            
    roomRef.on('value', room => {
        const databaseRoom = room.val();
        const firebaseQuestions = databaseRoom.questions ?? {};
  
        const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
          return {
            id: key,
            content: value.content,
            author: value.author,
            isHighlighted: value.ishighlighted,
            isAnswered: value.isAnswered,
            likeCount: Object.values(value.likes ?? {}).length,
            likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0],
            }

            })
                   
            setTitle(databaseRoom.title);
            setQuestions(parsedQuestions)
        })

        return () =>{
            roomRef.off('value');
        }
    }, [id, user?.id] );

    return { Questions, title}
}