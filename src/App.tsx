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
import Team from "./pages/team";
import AllSubaccount from "./pages/allSubaccount";
import Billing from "./pages/billing";
import Settings from "./pages/settings";
import Launchpad from "./pages/launchpad";
import Subaccount from "./pages/subaccount";
import SubAccountLayout from "./layout/subAccountLayout";
import SubSetting from "./pages/subaccount/setting";
import Media from "./pages/subaccount/media";
import Funnel from "./pages/subaccount/funnel";
import SubLaunchpad from "./pages/subaccount/launchpad";
import Automation from "./pages/subaccount/automation";
import Pipelines from "./pages/subaccount/pipelines";
import Contacts from "./pages/subaccount/contacts";
import SubDashboard from "./pages/subaccount/dashboard";
import PipelinePage from "./pages/subaccount/pipelineId";

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

<Route
          path="/agency/:Id/team"
          element={
            <LayoutDash params={{agencyId: data.user?.agencyId || ""}}>
              <Team params={{agencyId: data.user?.agencyId as string}} />
            </LayoutDash>
        }
          />

<Route
          path="/agency/:Id/all-subaccounts"
          element={
            <LayoutDash params={{agencyId: data.user?.agencyId || ""}}>
              <AllSubaccount params={{agencyId: data.user?.agencyId as string || ""}}/>
            </LayoutDash>
        }
          />

          <Route
          path="/agency/:Id/billing"
          element={
            <LayoutDash params={{agencyId: data.user?.agencyId || ""}}>
              <Billing />
            </LayoutDash>
        }
          />
          <Route
          path="/agency/:Id/launchpad"
          element={
            <LayoutDash params={{agencyId: data.user?.agencyId || ""}}>
              <Launchpad />
            </LayoutDash>
        }
          />

<Route
          path="/agency/:Id/settings"
          element={
            <LayoutDash params={{agencyId: data.user?.agencyId || ""}}>
              <Settings />
            </LayoutDash>
        }
          />

          <Route
          path="/subaccount/:Id"
          element={
            <SubAccountLayout>
              <Subaccount />
            </SubAccountLayout>
          }
          />
          
          <Route
          path="/subaccount/:Id/settings"
          element={
            <SubAccountLayout>
              <SubSetting />
            </SubAccountLayout>
          }
          />

          <Route
          path="/subaccount/:Id/media"
          element={
            <SubAccountLayout>
              <Media />
            </SubAccountLayout>
          }
          />

          <Route
          path="/subaccount/:Id/funnels"
          element={
            <SubAccountLayout>
              <Funnel />
            </SubAccountLayout>
          }
          />
          
          <Route
          path="/subaccount/:Id/launchpad"
          element={
            <SubAccountLayout>
              <SubLaunchpad />
            </SubAccountLayout>
          }
          />

          <Route
          path="/subaccount/:Id/media"
          element={
            <SubAccountLayout>
              <Media />
            </SubAccountLayout>
          }
          />

          <Route
          path="/subaccount/:Id/automations"
          element={
            <SubAccountLayout>
              <Automation />
            </SubAccountLayout>
          }
          />
          <Route
          path="/subaccount/:Id/pipelines/"
          element={
            <SubAccountLayout>
              <Pipelines />
            </SubAccountLayout>
          }
          />

          <Route
          path={`/subaccount/:Id/pipelines/:pipelineId`}
          element= {
              <PipelinePage />
          }
          />

        <Route
          path="/subaccount/:Id/contacts"
          element={
            <SubAccountLayout>
              <Contacts />
            </SubAccountLayout>
          }
          />

          <Route
          path="/subaccount/:Id/dashboard"
          element={
            <SubAccountLayout>
              <SubDashboard />
            </SubAccountLayout>
          }
          />
        </Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
