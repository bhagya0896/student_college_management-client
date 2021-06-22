
// import packages
import React,{useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import '../App.css';
import axios from 'axios';


//react-bootstrap
import {Container,Row,Col,Form,Button,Navbar,Nav} from 'react-bootstrap';

//nav styles css
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

const navStyle = {fontFamily:'poppins',
fontWeight: 'bold',
fontSize:'15px',
color:'rgb(207, 23, 23)',

}

// Colleges applied by student component
function AppliedColleges()
{
   const [colleges,setColleges] = useState([])
   const [message,setMessage] = useState("")

    var token =  localStorage.getItem('token');
    var studentId =  localStorage.getItem('studentId');

    const fetchCollegeList=()=>{
        
            return axios
            .get(`https://student-college-server.herokuapp.com/student/college-list/${studentId}`,{
                headers:{
                    "Content-Type": "application/json",
                    'auth-token' : token
                }
            })
            .then((res)=>
            {
             let data =  res.data;
               setColleges(res.data);
            })
    }

    const handleCollegeList = ()=>{
        fetchCollegeList().then(()=>{
            
        }) .catch((error)=>(error.response.data));
      }
    
   
    useEffect(() => {
        handleCollegeList()
        
      }, []);
  
    const handleSubmit = ()=>
    {
       
        setMessage("");
        return axios
        .post(`https://student-college-server.herokuapp.com/student/final-college-list/${studentId}`,{colleges},{
            headers:{
                "Content-Type": "application/json",
                'auth-token' : token
            }
        })
        .then((res)=>
        {
            let data = res.data;
           setMessage(data.message);
        })
      
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
                
            </Navbar>
            <Container >
          
      
            <Row className=" text-style my-3">
   <Col xs={12} md={12}>
     
   {colleges.length !== 0 ?
   <>
     <div className="text text-center" style={{fontSize:"18px"}}>Applied Colleges ({colleges.length})</div>
     <br></br>
                 <div>
                     <div >
                        <table className="table table-striped table-dark " >
                            <thead >
                              <tr>
                                <th >College Name</th>
                                <th >Course Name</th>
                                <th >Location</th>
                                <th> Course Duration</th>
                              </tr>
                            </thead>
                            <tbody>
                              {colleges?.map((college, index) => (
                                <tr key={index}>
                                  <td>{college.clgName} </td>
                                  <td>{college.courseName}</td>
                                  <td>{college.location}</td>
                                  <td>{ college.courseDuration} </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      
                      </div>
                      <Nav.Link href="/student" style={navStyle}><i className="fa fa-arrow-circle-o-left fa-2x" aria-hidden="true" style={{color:"black"}}> </i>  Back</Nav.Link> 
                      <Button style={{ fontSize: "13px" }} variant="success"  className="text " onClick = {handleSubmit}>Confirm</Button>
                      <br></br>
                      <div className='text-style '>
                          
                          <p >{message}</p>

                      </div>
              </>  :<p className="text-style">"No Application(s) yet !!"</p> }
          
         
   </Col>
    
    </Row>
                        
                      
                     
                 
            </Container>




        </>


   
    )
}

export default  AppliedColleges;
