import "./App.css";
import Resources from "./components/inventoryList/Resources";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Update from "./components/inventoryList/Update";
import Add from "./components/inventoryList/Add";
import MoreDetails from "./components/inventoryList/MoreDetails";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import DashBoard from "./components/Auth/DashBoard";
import NavBar from "./components/Auth/NavBar";
import Account from "./components/common/Account";
import Contact from "./components/common/Contact";
import MoreDetailsPub from "./components/inventoryList/MoreDetailsPub";
import ShowNavBar from "./components/common/ShowNavBar";

import Reserve from "./components/inventoryList/Reserve";
import AddReservDate from"./components/inventoryList/AddReservDate";
import Maintenance from "./components/inventoryList/Maintenance";

function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
        <ShowNavBar><NavBar /></ShowNavBar>
        <Routes>
          <Route path="/resources" element={<Resources />}></Route>
          <Route path="/add" element={<Add />}></Route>
          <Route path="/update/:id" element={<Update />}></Route>
          <Route path="/adminmore/:id" element={<MoreDetails />}></Route>
          <Route path="/" element={<Login />}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
          <Route path="/dashboard" element={<DashBoard />}></Route>
          <Route path="/account" element={<Account></Account>}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/usermore/:id" element={<MoreDetailsPub />}></Route>

          <Route path="/reserve/:id" element={<Reserve />}></Route>
          <Route path="/AddReservDate/:id" element={<AddReservDate />}></Route>
          <Route path="/maintenance/:id" element={<Maintenance />}></Route>
        
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
