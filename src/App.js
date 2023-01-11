import React from "react"
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
        <Route path="/" element={<JitsiMeet/>} />
    </Routes>
  </BrowserRouter>
  
  );
}

export default App;
