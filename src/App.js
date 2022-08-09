import React from "react"
import Chat from "./Components/Chat/Chat"
import Auth from "./Components/Auth/Auth"
import JitsiMeet from "./Components/JitsiMeet/Meet"

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


function App() {
  return (
    
    <BrowserRouter>
    <Routes>
        <Route path="/chat" element={<Chat/>} />
        <Route path="/" element={<Auth/>} />
        <Route path="/meet" element={<JitsiMeet/>} />
    </Routes>
  </BrowserRouter>
  
  );
}

export default App;
