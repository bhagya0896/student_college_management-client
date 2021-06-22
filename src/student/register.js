// import packages
import React,{ useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import '../App.css';
import axios from 'axios';
import { Link ,useHistory} from "react-router-dom";

//react-bootstrap
import {Container,Row,Col,Form,Button,InputGroup,FormControl, Navbar,Nav} from 'react-bootstrap';

// nav styles css
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

//student-register component  
function Register ()
{
    const history = useHistory();

    const [student,setStudent]=useState({firstname:"",lastname:"",email:"",password:"",cpassword:""})
    const [message,setMessage]=useState("");
    const [custommessage,setcustomMessage]=useState("");

    //register function
    const handleRegister=(e)=>{

        setMessage("");
        e.preventDefault();
        
        const {firstname,lastname,email,password,cpassword} = student
        console.log(firstname)
        if(firstname === "" || lastname==="")
        {
           setcustomMessage("Enter your first name and lastname.");
        
        }
        else if(email==="")
        {
            setcustomMessage("Enter valid email.")
        }
        else if(password==="")
        {
            setcustomMessage("Enter valid Password.")
        }else if(password!==cpassword)
        {
            setcustomMessage("Password & Confirm password should match.") 
        }
        else{
            setcustomMessage("")
            return axios
            .post(`https://student-college-server.herokuapp.com/student/register`,{firstname,lastname,email,password,cpassword})
            .then((res)=>
            {
                let data = res.data;
                setMessage(data.message);
                console.log(data.message);
                setStudent({firstname:"",lastname:"",email:"",password:"",cpassword:""});
            
            }
          
            
            )
            .catch((error)=>(error.response.data));
        }
          
    }
   
    return(

        <>

<Container >
    <Row>
        <Col xs={12} md={5} className="mt-5 pt-5">
            <Navbar.Brand href="/" style={style}> <i className="fa fa-graduation-cap fa-3x" style={{ color: "black" }} aria-hidden="true" ></i><p style={style}>EduCo</p><small style={style1}>fly2masters</small></Navbar.Brand>
            <p style={{ fontWeight: "bold", fontStyle: "italic", fontSize: "18px" }}>Plan your masters with ease.Happy Mastering!!</p>
            <h2 className="text-center sub-heading" style={{ color: "rgb(207, 23, 23)" }}>Join us </h2>
            <Nav.Link href="/" ><i className="fa fa-arrow-circle-o-left fa-2x" style={{color:"rgb(207, 23, 23)"}}> </i></Nav.Link>
        </Col>
        <Col xs={12} md={6} >
            <Form className="signup-form mt-5 pt-5" onSubmit={handleRegister} >
                <h4 className="text-center my-1"><i className="fa fa-graduation-cap fa-3x" style={{ color: "rgb(207, 23, 23)" }} aria-hidden="true" ></i>Register</h4>
                <Row>
                                <Col>
                                    <Form.Control type=" text"placeholder="First name" className="text"    style={{fontSize:"12px"}} value={student.firstname} onChange={(e) => { setStudent((stu) => ({ ...stu, firstname: e.target.value })) }} placeholder="First Name" required="required"/>
                                </Col>
                                <Col>
                                    <Form.Control type="text" placeholder="Last name"  className="text"   style={{fontSize:"12px"}} value={student.lastname} onChange={(e) => { setStudent((stu) => ({ ...stu, lastname: e.target.value })) }}placeholder="Last Name" required="required"/>
                                </Col>
                            </Row>
                            <br></br>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Control type="email" className="form-control text" style={{fontSize:"12px"}}  name="email" value={student.email} onChange={(e) => { setStudent((stu) => ({ ...stu, email: e.target.value })) }} placeholder="Email Address" required="required" />
                            </Form.Group>
                            < br></br>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Control type="password"  className="form-control text" style={{fontSize:"12px"}} name="password" value={student.password} onChange={(e) => { setStudent((stu) => ({ ...stu, password: e.target.value })) }} placeholder="Password" required="required" />
                            </Form.Group>
                         < br></br>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Control type="password"  className="form-control text" style={{fontSize:"12px"}} name="cpassword" value={student.cpassword} onChange={(e) => { setStudent((stu) => ({ ...stu, cpassword: e.target.value })) }} placeholder="Confirm Password" required="required" />
                            </Form.Group>
                            < br></br>
                        <div class="mb-2 form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1" required="required" />
                            <label className="form-check-label text" for="exampleCheck1"> I accept the <Link to="/" style={{color:"rgb(207, 23, 23)"}}><b>Terms of Use</b></Link> &amp; <Link to="/" style={{ color: "rgb(207, 23, 23)" }}><b >Privacy Policy</b></Link> </label>
                        </div>
                       <br></br>
                            <Button variant="dark" type="submit" size="sm" className="btn " style={{color:'white'}} >
                                   Register
                            </Button>
                            <br></br>
                            <br></br>
                        <div className="text-center text" >Already have an account ? <Link to="/student/login"  style={{color:"rgb(207, 23, 23)"}}><b>Login here</b></Link></div>
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

export default  Register;
