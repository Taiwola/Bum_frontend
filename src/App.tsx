import {BrowserRouter,Route,Routes} from "react-router-dom";
import Home from './pages/HOME';
import Get_Started from "./pages/Get_started";

function App() {
  return (
    <>
       <BrowserRouter>
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/get-started" element={<Get_Started/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
