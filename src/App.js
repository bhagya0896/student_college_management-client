// importing packages
import React,{useState,useEffect} from 'react';
import './App.css';

import { BrowserRouter as Router,Route,Switch} from "react-router-dom";
import {  fetchColleges } from "./components/interaction.js";

//importing components
import Navigation from './components/nav';
import Register from './student/register';
import Login from './student/login';
import Password from './student/password';
import CollegeList from './components/collegelist.js'
import Student from './student/student.js';
import Admin from './admin/admin.js';
import StudentDetailsForm from './student/studentdetailsform.js';
import AppliedColleges from './student/appliedcolleges.js';
import AdminLogin from './admin/login.js';


// usecontext 
export const CredentialsContext = React.createContext(
  {
    User:null,
    token:null,
    logout:()=>{},
    isLogged:false,
    studentId:null,
    role:null,
  }
  );


  //App component
function App() {

  const [colleges, setColleges] = useState([]);
  const [User, setUser]=useState(null);
  const [isLogged,setLogged]=useState(false);
  const [token,setToken]=useState(null);
  const [studentId,setStudentId]=useState(null);
  const [adminId,setAdminId]=useState(null);
  const [custommessage,setcustomMessage]=useState("");
  const [role,setRole]=useState(null);
  
// fetch college list
  const handleColleges = ()=>{
    fetchColleges().then((data)=>{
        setColleges(data);
    })
  }

  useEffect(() => {
    handleColleges()
  }, []);

  //logout 
  const logout = ()=>{
 
    localStorage.clear();
    setLogged(false)
    window.location.href = '/';
    }

    // Student - Login
const handleLogin = (usr,token,studentId,role)=>{
  setUser(usr);
  setLogged(true);
  setToken(token);
  setRole(role);
  setStudentId(studentId);
  localStorage.setItem('token', token);
  localStorage.setItem('studentId', studentId);
  localStorage.setItem('student_role', role);
  localStorage.setItem('isLogged', true);
}

// Admin - Login
const handleAdminLogin = (usr,token,adminId,role)=>{
  setUser(usr);
  setLogged(true);
  setToken(token);
  setRole(role);
  setAdminId(adminId);
  localStorage.setItem('token', token);
  localStorage.setItem('adminId', adminId);
  localStorage.setItem('admin_role', role);
  localStorage.setItem('isLogged', true);
}


  return (
    <>
   
    <CredentialsContext.Provider value={
         {  User,
          token,
          isLogged,
          studentId,
          role,
          logout }
       }>
         
   <Router>
  
      <Switch>

        <Route exact path="/">
        <Navigation/>
        <CollegeList colleges={colleges}  custommessage={custommessage} />
        </Route>

        <Route exact path="/student/register">
          <Register/>
        </Route>

        <Route exact path="/student/appliedcolleges">
          <AppliedColleges/>
        </Route>

        <Route exact path="/student/login">
          <Login handleLogin={handleLogin} />  
        </Route>

        <Route exact path="/admin/login">
          <AdminLogin handleAdminLogin={handleAdminLogin}/>
        </Route>

        <Route exact path="/reset-password/:token">
          <Password/>
        </Route>
          
        <Route exact path="/student">
         < Student logout={logout}/> 
        </Route>

        <Route exact path="/studentdetails">
        <StudentDetailsForm />
        </Route>

        <Route exact path="/admin">
         < Admin logout={logout}/>
        </Route>
        
      </Switch>
      
      </Router>
      </CredentialsContext.Provider>
    </>
   
  );
}

export default App;
