import {createContext, useState, useEffect} from 'react';
import {auth} from '../firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';


const authContext = createContext({});

export function AuthContextProvider(props){
    const [user, setUser] = useState(); 

    useEffect(() =>{
      const unsubscribe = auth.onAuthStateChanged(user => {
        if(user) {
  
          const {displayName, photoURL,  uid} = user
    
          if(!displayName || !photoURL){
              throw new Error('Missing information from Google account.')
            }
            
            setUser({
              id: uid,
              name: displayName,
              avatar: photoURL
            })
  
        } 
      })
  
      return () =>{
        unsubscribe();
      }
    }, [])
  
   
  
    async function LogginGoogle() {
      const provider = new GoogleAuthProvider();
  
      const result = await  signInWithPopup(auth,provider);
  
        const {displayName, photoURL,  uid} = result.user
  
        if(!displayName || !photoURL){
            throw new Error('Missing information from Google account.')
          }
          
          setUser({
            id: uid,
            name: displayName,
            avatar: photoURL
          })
  
           }
  
       

    return(
        

        <authContext.Provider value={{user, LogginGoogle}}>
            {props.children}
            </authContext.Provider>
    )
}

export {authContext}