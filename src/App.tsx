import {BrowserRouter,Route,Routes} from "react-router-dom";
import Home from './pages/HOME';
import Get_Started from "./pages/Get_started";
import Sign_in from "./pages/sign-in";
import ProtectedRoute from "./auth/protectedRoute";
import Agency from "./pages/agency";
import Dashboard from "./pages/dashboard";
import Unauthorized from "./component/unauthorized";
import LayoutDash from "./layout/layout";
import { getAuthUserDetails } from "./lib/queries";

function App() {
  const data = getAuthUserDetails();
  return (
    <>
       <BrowserRouter>
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Get_Started/>}/>
        <Route path="/sign-in" element={<Sign_in/>}/>
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route element={<ProtectedRoute />}>
          <Route
            path="/agency"
            element={<Agency />}
          />
          <Route
          path="/agency/:Id"
          element={
            <LayoutDash params={{agencyId: data.user?.agencyId || ""}}>
              <Dashboard />
            </LayoutDash>
        }
          />
        </Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
