import {  Route, Routes, useNavigate } from "react-router-dom";
import { useEffect} from "react";
import Login from "./Components/Login";
import EmployeeCreate from "./Components/EmployeeCreate";
import EmployeeDetails from "./Components/EmployeeDetails";
import { Home } from "./Components/Home";
import Navbar from "./Components/Navbar";


function App() {
let navigate=useNavigate()
  return (
    <div>
    
    <Navbar/>
    
    <Routes>
      <Route path="/" element= {<Home/>}/> 
      <Route path="/login" element= {<Login/>}/> 
      <Route path="/employeecreate" element={<EmployeeCreate/>}/>
      <Route path="/employeedetails" element= {<EmployeeDetails/>}/>
      
    
    </Routes>
  
    </div>
  );
}

export default App;
