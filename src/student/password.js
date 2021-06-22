
// import packages
import React,{useState} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

// react-bootstrap
import { Col, Container,Form,Button,Row  } from 'react-bootstrap';


// reset password component
function Password (){

    const history = useHistory();
    const [user,setUser]=useState({password:"",cpassword:""});
    const [message,setMessage]=useState("");
    const [custommessage,setcustomMessage]=useState("");
    const {token} = useParams();
 

const handlePassword = (e) =>
{
   
   setMessage("")
    setcustomMessage("")
    e.preventDefault();
    const {password,cpassword} = user;
    console.log(password,cpassword);
    if(password==="" || password.length<6)
    {
        setcustomMessage("Please enter a password of at least 6 characters.")
    }else if(cpassword==="")
    {
        setcustomMessage("Confirm password should not be empty.")
    }else if(password !== cpassword)
    {
        setcustomMessage("Password and confirm password should match.")
    }
    else
    {  
        setcustomMessage("")
        axios.post('http://localhost:5000/user/resetpassword', {password,cpassword},{
            params: {
                token
            }
          })
          .then(function (response) {
              let data = response.data
            console.log(data.message);
            setMessage(data.message);
            setUser({password:"" , cpassword:""});
            history.push("/login")
           
          })  .catch((error)=>(error.response.data));

      
    }
   
    }

    return(
        <>
            <Container>
                <Row>
                <Col xs={12} md={5}></Col>
                    <Col xs={12} md={6} className=" login-form my-5 pt-5">
                        <Form >
                        <h4 className="text-center  my-1 pb-3" styl={{fontSize:"20px"}}><i className="fa fa-graduation-cap fa-2x" style={{ color: "rgb(207, 23, 23)" }} aria-hidden="true" ></i>Reset Password</h4>
                           
                        
                            <Form.Group controlId="formBasicPassword">
                                <Form.Control type="password" style={{ fontSize: "12px" }} className="text" name="password" value={user.password} onChange={(e) => { setUser((usr) => ({ ...usr, password: e.target.value })) }} placeholder="New Password" required="required" />
                            </Form.Group>
                            <br></br>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Control type="password" style={{ fontSize: "12px" }} className="text " name="cpassword" value={user.cpassword} onChange={(e) => { setUser((usr) => ({ ...usr, cpassword: e.target.value })) }} placeholder="Confirm New Password" required="required" />
                            </Form.Group>
                            <br></br>

                            <Button variant="dark" type="submit" size="sm" className="btn reset-text-style" style={{ color: 'white' }} onClick={handlePassword} >
                                Save Password
                            </Button>
                            <br></br>
                        </Form>
                        <hr></hr>
                        <div className='text-style '>
                            <p >{custommessage}</p>
                            <p >{message}</p>

                        </div>
                    </Col>
                    <Col xs={12} md={3}></Col>
                </Row>
            </Container>


        </>
    )
}

export default Password;