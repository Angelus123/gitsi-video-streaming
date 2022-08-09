import {BrowserRouter,Routes,Route} from "react-router-dom"
import Chat from "./../Components/Chat/Chat"
import Auth from "./../Components/Auth/Auth"

const AppRoutes = ()=>{
  <BrowserRouter>
  <Routes>
    <Route path="/chat" element={<Chat/>}/>
    <Route path="/" element={<Auth/>}/>
  </Routes>
  </BrowserRouter>
}

export default AppRoutes 