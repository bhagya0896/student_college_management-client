
// import packages
import React,{useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import { Link ,useHistory} from "react-router-dom";
import axios from 'axios';
import '../App.css';

//react-bootstrap
import {Container,Row,Col,Form,Button} from 'react-bootstrap';

// student-login component
function Login({handleLogin})
{
    const history = useHistory();
    const [user,setUser]=useState({email:"",password:""});
    const [message,setMessage]=useState("");
    const[ispassword,setpass]=useState(false);
    const [custommessage,setcustomMessage]=useState("");

    const login = (e)=>{

    e.preventDefault();
    setMessage("")
    const {email,password} = user;
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
        .post(`http://localhost:5000/student/login`,{email,password})
     
        .then((res)=>{let data = res.data;
            let token = data.token;
            let studentId = data.id;
            let role=data.role;
          
        if(data)
        {  
         
            handleLogin(user,token,studentId,role);
            console.log(role);
            if(role===0)
            {
             
                history.push('/student')
                setUser({email:"",password:""});
            }
                 
        }
        else
        {
            setMessage(data.message);
        }
       
    })
    .catch((error)=>(error.response.data));
}

}
const  handleForgotpassword = () =>
{
  setpass(true);
}

const handlePassword = (e) =>
{
  setMessage("");
  e.preventDefault();
  const {email} = user;
  if(email==="")
  {
      setcustomMessage("Enter email address.")
  }
else{
   setcustomMessage("");
   return axios.post('http://localhost:5000/user/forgetpassword', {
    email
    })
 
    .then(function (response) {
        
        let data = response.data
      console.log(data.message);
      setMessage(data.message);
      setUser({email:"",password:""});

 
    }) .catch((error)=>(error.response.data));

}
history.push('/')
}
    if(ispassword)
  {
    return(
        <Container>
            <Row>
                <Col xs={12} md={5}></Col>
                <Col xs={12} md={6} className=" login-form my-5 pt-5">
                <h4 className="text-center  my-1" styl={{fontSize:"20px"}}><i className="fa fa-graduation-cap fa-2x" style={{ color: "rgb(207, 23, 23)" }} aria-hidden="true" ></i>Confirm Your Email Address</h4>
                    <Form onSubmit={handlePassword} >
                        <Form.Group controlId="formBasicEmail">
                            <Form.Control type="email" className="form-control text" style={{ fontSize: "12px" }} name="email" value={user.email} onChange={(e) => { setUser((usr) => ({ ...usr, email: e.target.value })) }} placeholder="Email Address" required="required" />
                        </Form.Group>
                        <br></br>
                        <Button variant="dark" type="submit" style={{ color: 'white' }} onClick={handlePassword}>
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
)
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
                            <Form.Control type="email" className="form-control text" style={{ fontSize: "12px" }} name="email" value={user.email} onChange={(e) => { setUser((usr) => ({ ...usr, email: e.target.value })) }} placeholder="Email Address" required="required" />
                            <Form.Text className="text-muted text" style={{ fontSize: "10px" }}>
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>
                        <br></br>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Control type="password" style={{ fontSize: "12px" }} className="text" name="password" value={user.password} onChange={(e) => { setUser((usr) => ({ ...usr, password: e.target.value })) }} placeholder="Password" required="required" />
                        </Form.Group>
                        
                        
                        <button type="submit" className="btn btn-link text" style={{ color: "rgb(207, 23, 23)" }} onClick={handleForgotpassword} >
                            forgot Password?
                        </button>
                        <br></br>
                        <Button variant="dark" type="submit" size="sm" className="text" style={{ color: 'white' }} >
                            Log In
                        </Button>

                        <br></br>
                        <br></br>
                        <p className="text-center text-muted small text">Don't have an account? <Link to="/student/register" className="text" style={{ color: 'rgb(207, 23, 23)' }}><b>Sign up here!</b></Link></p>
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

export default  Login;