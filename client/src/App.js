import "./App.css";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Resources from "./components/inventoryList/Resources";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Update from "./components/inventoryList/Update";
import Add from "./components/inventoryList/Add";
import MoreDetails from "./components/inventoryList/MoreDetails";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import CustomDashboard from "./components/dashboard/CustomDashboard";
import NavBar from "./components/nav-bar/NavBar";
import ShowNavBar from "./components/nav-bar/ShowNavBar";
import Account from "./components/common/Account";
import Contact from "./components/common/Contact";
import MoreDetailsPub from "./components/inventoryList/MoreDetailsPub";
import CheckIn from "./components/check-in-out/CheckIn";
import CheckOut from "./components/check-in-out/CheckOut";
import Access from "./components/Auth/Access";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import ReportSection from "./components/reports/ReportSection";
import Analytics from "./components/reports/Analytics";


import ViewAccess from "./components/Auth/ViewAccess";
import Users from "./components/Auth/Users";


import AdminReserView from "./components/nav-reservations/AdminReserView";
import ReservUsers from "./components/nav-reservations/UserReserView";
import AdminMaintenanceView from "./components/nav-maitenance/AdminMaintenanceView";
import Reserve from "./components/ReservSelected/Reserve";
import Maintenance from "./components/MaintainSelected/Maintenance";
import MaintenanceAdd from "./components/MaintainSelected/MaintenanceAdd"
import MtClashHandle from "./components/MaintainSelected/MtClashHandle";


function App() {
  
  return (

    
    <div className="App" id="grad1">

      <BrowserRouter>
        <ShowNavBar>
          <NavBar />
        </ShowNavBar>
        <Routes>
          <Route
            path="/resources"
            element={
              <ProtectedRoute allowedRoles={Access.resources}>
                <Resources />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/add"
            element={
              <ProtectedRoute allowedRoles={Access.add}>
                <Add />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/update/:id"
            element={
              <ProtectedRoute allowedRoles={Access.update}>
                <Update />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/adminmore/:id"
            element={
              <ProtectedRoute allowedRoles={Access.adminmore}>
                <MoreDetails />
              </ProtectedRoute>
            }
          ></Route>

          <Route path="/" element={<Login />}></Route>
          <Route path="/register" element={<Register></Register>}></Route>

          <Route
            path="/reserve/:id"
            element={
              <ProtectedRoute allowedRoles={Access.reserve}>
                <Reserve />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/maintenance/:id"
            element={
              <ProtectedRoute allowedRoles={Access.maintenance}>
                <Maintenance />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/maintenanceAdd/:id"
            element={
              <ProtectedRoute allowedRoles={Access.maintenanceAdd}>
                <MaintenanceAdd />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/maintenanceClashes/:id/:data"
            element={
              <ProtectedRoute allowedRoles={Access.mtClashHandle}>
                <MtClashHandle />
              </ProtectedRoute>
            }
          ></Route>

          <Route path="/adminReservations" element={<AdminReserView />}></Route>

          <Route path="/privateReservations" element={<ReservUsers/>}> </Route>
          <Route path="/adminMaintenance" element={<AdminMaintenanceView />}></Route>


          // Dashboard routes
          <Route 
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={Access.dashboard}>
                <CustomDashboard />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/account"
            element={
              <ProtectedRoute allowedRoles={Access.account}>
                <Account />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/contact"
            element={
              <ProtectedRoute allowedRoles={Access.contact}>
                <Contact />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/usermore/:id"
            element={
              <ProtectedRoute allowedRoles={Access.publicmore}>
                <MoreDetailsPub />
              </ProtectedRoute>
            }
          ></Route>

          // Check-out & Check-in routes
          <Route
            path="/check-in"
            element={
              <ProtectedRoute allowedRoles={Access.checkin}>
                <CheckIn />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/check-out"
            element={
              <ProtectedRoute allowedRoles={Access.checkout}>
                <CheckOut />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/reports"
            element={
              <ProtectedRoute allowedRoles={Access.reports}>
                <ReportSection />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/analytics"
            element={
              <ProtectedRoute allowedRoles={Access.analytics}>
                <Analytics />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="*"
            element={<h2 className="display-5 text-center" style={{color: '#252652', marginTop: 100}}>- Not Found -</h2>}

          ></Route>
          <Route path="/access" element={<ViewAccess />}></Route>
          <Route path="/users" element={<Users />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
