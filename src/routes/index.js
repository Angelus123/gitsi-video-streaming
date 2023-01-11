import {BrowserRouter,Routes,Route} from "react-router-dom"
import Meet from "./../Components/JitsiMeet/Meet"

const AppRoutes = ()=>{
  <BrowserRouter>
  <Routes>
    <Route path="/meet" element={<Meet/>}/>
  </Routes>
  </BrowserRouter>
}

export default AppRoutes 