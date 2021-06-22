// import packages
import React,{useState} from 'react';
import { useHistory} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import axios from 'axios';
import '../App.css';

//react-bootstrap
import {Container,Row,Col,Form,Button,InputGroup,FormControl} from 'react-bootstrap';


// AdmninLogin Component
function AdminLogin({handleAdminLogin})
{
    const history = useHistory();
  
    const [admin,setadmin]=useState({email:"",password:""});
    const [message,setMessage]=useState("");
    const [custommessage,setcustomMessage]=useState("");

    // admin - login function
    const login = (e)=>{

        e.preventDefault();
        setMessage("")
        const {email,password} = admin;
        if(email==="")
        {
            setcustomMessage("Enter valid email.")
        }
        else if(password==="")
        {
            setcustomMessage("Enter valid Password.")
        }
        else
        {
            setcustomMessage(" ")
            return axios
            .post(`https://student-college-server.herokuapp.com/admin/signin`,{email,password})
         
            .then((res)=>{let data = res.data;
                let token = data.token;
                let adminId = data.id;
                let role=data.role;
               
              
            if(data)
            {  
             
                handleAdminLogin(admin,token,adminId,role);
                console.log(role);
                if(role===1)
                {
                    history.push('/admin')
                    setadmin({email:"",password:""});
                }
                else
                {
                    setMessage(data.message);
                }           
            }   
        })
        .catch((error)=>(error.response.data));
    }  
    }
    
    return(

        <>
            <Container >
                <Row>
                    <Col xs={12} md={5} className="mt-5 pt-5">
        
                    </Col>
                    <Col xs={12} md={6} className="my-5 pt-5" >
                    <Form className="login-form" onSubmit={login}>
                    <h4 className="text-center  my-1"><i className="fa fa-graduation-cap fa-3x" style={{ color: "rgb(207, 23, 23)" }} aria-hidden="true" ></i>Log In</h4>
                        <br></br>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Control type="email" className="form-control text" style={{ fontSize: "12px" }} name="email" value={admin.email} onChange={(e) => { setadmin((usr) => ({ ...usr, email: e.target.value })) }} placeholder="Email Address" required="required" />
                            <Form.Text className="text-muted text" style={{ fontSize: "10px" }}>
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>
                        <br></br>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Control type="password" style={{ fontSize: "12px" }} className="text" name="password" value={admin.password} onChange={(e) => { setadmin((usr) => ({ ...usr, password: e.target.value })) }} placeholder="Password" required="required" />
                        </Form.Group>
                        
                
                        <br></br>
                        <Button variant="dark" type="submit" size="sm" className="text" style={{ color: 'white' }} >
                            Log In
                        </Button>

                        <br></br>
                        <br></br>
                
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

export default  AdminLogin;
