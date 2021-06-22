// import packages

import React,{useEffect, useState,useContext} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import '../App.css';
import { CredentialsContext } from "../App";
import axios from 'axios';
import { Link ,useHistory} from "react-router-dom";

// importing components
import CollegeList from '../components/collegelist.js'

//react-bootstrap
import {Container,Row,Col,Form,Button,Navbar,Nav} from 'react-bootstrap';


// nav styles css
const style = {fontFamily:'Franklin Gothic Medium, Arial Narrow, Arial, sans-serif',
fontWeight: 'bold',
fontSize:'30px',
color:'rgb(207, 23, 23)'}

const navStyle = {fontFamily:'poppins',
fontWeight: 'bold',
fontSize:'15px',
color:'rgb(207, 23, 23)',

}

const style1 = {fontFamily:'poppins',
fontWeight: 'light',
fontSize:'20px',
color:'rgb(207, 23, 23)',
fontStyle:"italic"
}

//student UI component
function StudentDetails ({logout})
{
    const history = useHistory();

    const [colleges,setColleges]=useState([]);
    const [courseName,setCourseName]=useState("");
    const [message,setMessage]=useState("");
    const [apply,setApply]=useState(false);
    const {isLogged} = useContext(CredentialsContext);
    console.log(isLogged)

    var token =  localStorage.getItem('token');
    var studentId =  localStorage.getItem('studentId');

    
    // searching by coursename function
    const handleSearch=(e)=>{

        e.preventDefault();
       
        console.log(courseName)
            return axios
            .get(`http://localhost:5000/colleges/${courseName}`,{
                headers:{
                    "Content-Type": "application/json",
                    'auth-token' : token
                }
            })
            .then((res)=>
            {
                console.log(res)
              
               let data = res.data;
                setMessage(data.message);
                setColleges(data);
                console.log(data)
                setCourseName("");
            }
          
            
            )
            .catch((error)=>(error.response.data));
   
          
    }
  
    return(

        <>
     
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/" style={style}><i className="fa fa-graduation-cap fa-3x" style={{ color: "black" }} aria-hidden="true" ></i>EduCo<small style={style1}>fly2masters</small></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">

                    </Nav>
                </Navbar.Collapse>
                <Nav.Link href="/studentdetails" style={navStyle}><i class="fa fa-user fa-sm" aria-hidden="true" style={{color:"black"}}> </i>Add Details</Nav.Link>
                <Nav.Link href="/student/appliedcolleges" style={navStyle}><i class="fa fa-check-square" aria-hidden="true" style={{color:"black"}}> </i>Application Status</Nav.Link>
                <Button style={{ fontSize: "13px" }} variant="danger" className="text m-5" onClick={logout}><b>LogOut</b></Button>
            </Navbar>
            <Container >
                <Row className="my-4">
                <Col xs={12} md={2} ></Col>
                <Col xs={12} md={9} >
                    <div className="text-style" style={{fontSize:"15px"}}>Note : Please Fill Up Your Complete Details To Apply For Colleges. If Filled, Kindly Ignore.</div>
                    <br></br>
                    <Row>
                        <Col>
                        <Form >
                <Form.Group >
                                <Form.Label className="my-1 mr-2 text text-muted" htmlFor="inlineFormCustomSelectPref" style={{ fontSize: "18px" }}>
                                    Select Course
                                </Form.Label>
                                <Form.Control
                                    as="select"
                                    className="my-1 mr-sm-3 text m-3 p-2 "
                                    id="inlineFormCustomSelectPref"
                                    name="coursename"
                                    custom
                                    value={courseName}

                                    onChange={(e) => { setCourseName(e.target.value)}}
                                    style={{ fontSize: "12px" }}
                                >
                                    <option >Choose....</option>
                                    <option selected value="Master Of Business Administration">Master Of Business Administration</option>
                                    <option value="Master Of Computer Science">Master Of Computer Science</option>
                                    <option value="Master Of Technology - Structural Engineering">Master Of Technology - Structural Engineering</option>
                                    <option value="Master Of Technology - Computer Science And Engineering">Master Of Technology - Computer Science And Engineering</option>
                                    <option value="Doctorate Of Medicine - Physiology">Doctorate Of Medicine - Physiology</option>
                                    <option value="Master Of Surgery">Master Of Surgery</option>

                                </Form.Control>
                              
                            </Form.Group>
                           
                   
                </Form>
                        </Col>
                        <Col>  <Button variant="dark" className="text m-5" onClick={handleSearch}>Search</Button></Col>
                    </Row>
                
                </Col>
                <Col xs={12} md={1} ></Col>
           
                </Row>
                <Row>
                    <Col xs={12} md={12} >
   
                     { colleges.length !== 0 ? <>
                        <div className="text" style={{fontSize:"20px",color:"rgb(207, 23, 23)"}}>Search Result ({colleges.length})</div>
                        <CollegeList colleges={colleges} /> </> : ""
                     } 
                 
                      <div className='text-style '>
                          
                            <p >{message}</p>

                        </div>
                    </Col>
                </Row>
               
            </Container>




        </>


   
    )
}

export default  StudentDetails ;