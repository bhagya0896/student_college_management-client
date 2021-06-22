
// import packages
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import '../App.css';

// react-bootstrap
import {Navbar,Nav,Container} from 'react-bootstrap';

// nav styles - css
const style = {fontFamily:'Franklin Gothic Medium, Arial Narrow, Arial, sans-serif',
fontWeight: 'bold',
fontSize:'30px',
color:'rgb(207, 23, 23)'}

const style1 = {fontFamily:'poppins',
fontWeight: 'light',
fontSize:'15px',
color:'rgb(207, 23, 23)',
fontStyle:"italic"
}

const navStyle = {fontFamily:'poppins',
fontWeight: 'bold',
fontSize:'15px',
color:'rgb(207, 23, 23)',

}


// Navbar component
function Navigation ()
{
    return(
       
        <Navbar bg="light" variant="light">
        <Container>
        <Navbar.Brand href="/" style={style}><i className="fa fa-graduation-cap fa-3x" style={{color:"black"}} aria-hidden="true" ></i>EduCo<small style={style1}>fly2masters</small></Navbar.Brand>
        
        <Nav className="justify-content-end" >
          <Nav.Link href="/student/register" style={navStyle}><i className="fa fa-user-plus fa-sm" style={{color:"black"}} aria-hidden="true" ></i> Register</Nav.Link>
          <Nav.Link href="/student/login" style={navStyle}><i className="fa fa-user fa-sm" aria-hidden="true" style={{color:"black"}}> </i> Log In</Nav.Link>
          <Nav.Link href="/admin/login" style={navStyle}><i className="fa fa-lock fa-sm" aria-hidden="true" style={{color:"black"}}> </i> Admin Log In</Nav.Link>
        </Nav>
        </Container>
      </Navbar>
      
        

    )
}

export default Navigation;