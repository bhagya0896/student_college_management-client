
// import packages
import React from 'react';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';


import '../App.css';
// import component
import CollegeForm from './college.js'

// React-bootstrap
import {Container,Row,Col,Form,Button, Navbar,Nav,Card} from 'react-bootstrap'


// Adding css
const style = {fontFamily:'Franklin Gothic Medium, Arial Narrow, Arial, sans-serif',
fontWeight: 'bold',
fontSize:'30px',
color:'rgb(207, 23, 23)'}

const style1 = {fontFamily:'poppins',
fontWeight: 'light',
fontSize:'20px',
color:'rgb(207, 23, 23)',
fontStyle:"italic"
}

// Admin Component
function Admin ({logout})
{
   
    return(

        <>
  
           <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/" style={style}><i className="fa fa-graduation-cap fa-3x" style={{ color: "black" }} aria-hidden="true" ></i>EduCo<small style={style1}>fly2masters</small></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    </Nav>
                </Navbar.Collapse>
                
                <Button style={{ fontSize: "13px" }}  variant="danger" className="text m-5" onClick={logout}><b>LogOut</b></Button>
            </Navbar>

           <CollegeForm/>

        </>


   
    )
}

export default Admin ;