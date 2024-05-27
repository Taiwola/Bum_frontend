import {BrowserRouter,Route,Routes} from "react-router-dom";
import Home from './pages/HOME';
import Get_Started from "./pages/Get_started";
import Sign_in from "./pages/sign-in";

function App() {
  return (
    <>
       <BrowserRouter>
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Get_Started/>}/>
        <Route path="/sign-in" element={<Sign_in/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
