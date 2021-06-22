// import packages

import React,{useState,useContext} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import { CredentialsContext } from "../App";
import '../App.css';
import axios from 'axios';
import { Link ,useHistory,useParams} from "react-router-dom";

//react-bootstrap
import {Container,Row,Col,Form,Button,Navbar,Nav} from 'react-bootstrap';


// nav-styles css
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

// student details fillup form component

function StudentDetailsForm ()
{
    const history = useHistory();
    const [student,setStudent]=useState({firstname:"",lastname:"",permanentAddress:"",
    postalCode:"" ,city:"",country:"",email:"",contact:"",courseName:"",specialization:"",
    collegeName:""})
    const [message,setMessage]=useState("");
    const [custommessage,setcustomMessage]=useState("");
    const {isLogged} = useContext(CredentialsContext);
    console.log(isLogged)

    //submitting student details form function
    const handleSubmit=(e)=>{
      const{firstname,lastname,
    permanentAddress,
    postalCode ,city,country,email,contact,courseName,specialization,
       collegeName}=student
        setMessage("");
        e.preventDefault(); 
        let studentId =  localStorage.getItem('studentId');
        let token =  localStorage.getItem('token');
        console.log(studentId,token)
        return axios
        .post(`http://localhost:5000/student/details-register`,{studentId,firstname,lastname,
        permanentAddress,
        postalCode ,city,country,email,contact,courseName,specialization,
        collegeName},
        {
            headers:{
                "Content-Type": "application/json",
                'auth-token' : token
            }
        })
        .then((res)=>
        {
            console.log("success");
            console.log(res)
      
            let data = res.data;
            setMessage(data.message);
            console.log(data.message);
            setStudent({firstname:"",lastname:"",permanentAddress:"",
            postalCode:"" ,city:"",country:"",email:"",contact:"",courseName:"",specialization:"",
            collegeName:""});
        
        }
      
        
        )
        .catch((error)=>(error.response.data));   
    }
    return(

        <>

            <Container >
                <Row>
                    <Col xs={12} md={5} className="mt-5 pt-5">
                        <Navbar.Brand href="/" style={style}> <i className="fa fa-graduation-cap fa-3x" style={{ color: "black" }} aria-hidden="true" ></i><p style={style}>EduCo</p><small style={style1}>fly2masters</small></Navbar.Brand>
                        <p style={{ fontWeight: "bold", fontStyle: "italic", fontSize: "18px" }}>Plan your masters with ease.Happy Mastering!!</p>
                        <Nav.Link href="/student" ><i className="fa fa-arrow-circle-o-left fa-2x" style={{color:"rgb(207, 23, 23)"}}> </i></Nav.Link>
                        
                    </Col>
                    <Col xs={12} md={6} >
                        <Form className="signup-form mt-5 pt-5"  onSubmit={handleSubmit}>
                        <p className="text-center text "style={{fontSize:"18px",color:"rgb(207, 23, 23)"}} >Please fill the details below.</p>
                        <p className="text">Personal details</p>
                        <hr></hr>
                        <Row>
                                <Col>
                                    <Form.Control type="text" value={student.firstname} onChange={(e) => { setStudent((stu) => ({ ...stu, firstname: e.target.value })) }}placeholder="First name" className="text" style={{ fontSize: "12px" }}  required="required" />
                                </Col>
                                <Col>
                                    <Form.Control   type="text" value={student.lastname} onChange={(e) => { setStudent((stu) => ({ ...stu, lastname: e.target.value })) }}placeholder="Last name" className="text" style={{ fontSize: "12px" }}   />
                                </Col>
                                
                            </Row>
                            <br></br>
                        <Form.Group controlId="formBasicEmail">
                                <Form.Control type="text" className="form-control text" style={{ fontSize: "12px" }} name="address" value={student.permanentAddress} onChange={(e) => { setStudent((stu) => ({ ...stu, permanentAddress: e.target.value })) }} placeholder=" Permanent / Temporary Address" />
                            </Form.Group>
                            <br></br>
                            <Row>
                                <Col>
                                    <Form.Control  type="number" className="text" style={{ fontSize: "12px" }} value={student.postalCode} onChange={(e) => { setStudent((stu) => ({ ...stu, postalCode: e.target.value })) }}placeholder="Postal Code" required="required" />
                                </Col>
                                <Col>
                                    <Form.Control type="text"  className="text" style={{ fontSize: "12px" }} value={student.city} onChange={(e) => { setStudent((stu) => ({ ...stu, city: e.target.value })) }} placeholder="City" required="required" />
                                </Col>
                                <Col>
                                    <Form.Control  type="text" className="text" style={{ fontSize: "12px" }}  value={student.country} onChange={(e) => { setStudent((stu) => ({ ...stu, country: e.target.value })) }}placeholder="Country" required="required" />
                                </Col>
                            </Row>
                            <br></br>
                            <Row>
                                <Col>
                                    <Form.Control  type="email" className="text" style={{ fontSize: "12px" }} value={student.email} onChange={(e) => { setStudent((stu) => ({ ...stu, email: e.target.value })) }}placeholder="Email Address" required="required" />
                                </Col>
                                <Col>
                                    <Form.Control  type="text" className="text" style={{ fontSize: "12px" }} value={student.contact} onChange={(e) => { setStudent((stu) => ({ ...stu, contact: e.target.value })) }} placeholder="Contact No." required="required" />
                                </Col>
                              
                            </Row>
                            <br></br>
                            <p className="text">Education Details (UG)</p>
                            <hr></hr>
                            <Row>
                                <Col>
                                <Form.Group controlId="formBasicPassword">
                                <Form.Control type="text" className="form-control text" style={{ fontSize: "12px" }} value={student.courseName} onChange={(e) => { setStudent((stu) => ({ ...stu, courseName: e.target.value })) }}  placeholder="Course" required="required" />
                            </Form.Group>
                                </Col>
                                <Col>
                                <Form.Group controlId="formBasicPassword">
                                <Form.Control type="text" className="form-control text" style={{ fontSize: "12px" }}   value={student.specialization} onChange={(e) => { setStudent((stu) => ({ ...stu, specialization: e.target.value })) }}placeholder="Specialization" required="required" />
                            </Form.Group>
                                </Col>
                              
                            </Row>
                           
                            < br></br>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Control type="text" className="form-control text" style={{ fontSize: "12px" }} name="cpassword" value={student.collegeName} onChange={(e) => { setStudent((stu) => ({ ...stu, collegeName: e.target.value })) }} placeholder="College Name" required="required" />
                            </Form.Group>
                           
                            <br></br>
                            <Button variant="dark" type="submit" size="sm" className="btn " style={{ color: 'white' }} >
                                Submit
                            </Button>
                            <hr></hr>
                    <div className='text-style '>
                        <p >{custommessage}</p>
                        <p >{message}</p>

                    </div>
                        </Form>

                    </Col>
                    <Col xs={12} md={3}></Col>
                </Row>
            </Container>




        </>


   
    )
}

export default  StudentDetailsForm;