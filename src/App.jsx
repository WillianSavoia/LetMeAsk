//react
import { BrowserRouter, Route, Routes } from 'react-router-dom' //Routes no lugar de Switch

//arquivos
import {AdminRoom} from './pages/AdminRoom'
import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';
import { Room } from './pages/Room';
import {AuthContextProvider} from './contexts/authContext';


//resolver problema de rotas id 

function App() {
  
  return (
    
    <BrowserRouter> 
       <AuthContextProvider>
      <Routes>
        <Route path="/" expect element={<Home />} />   
        <Route path="/create" element={<NewRoom />} />
        <Route path="/rooms/:id" element={<Room/>} /> 

        <Route path="/admin/rooms/:id" element={<AdminRoom />} />
      </Routes>
      </AuthContextProvider>
      
    </BrowserRouter>
    
    
  );
}


export default App;

//element entra no lugar de component

