
// import packages

import React,{useContext,useEffect,useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { CredentialsContext } from "../App";

//react-bootstrap
import {Container,Row,Table,Col,Card,Button} from 'react-bootstrap';


// colleges list component
const CollegeList = ({colleges,setColleges,custommessage}) =>
{


  var isLogged = localStorage.getItem('isLogged');
  var token =  localStorage.getItem('token');
  var studentId =  localStorage.getItem('studentId');


  // applying colleges function
  const handleApply = ({_id}) =>
  {
    if(token)
    {
      let appliedColleges = colleges.map(college => {
        return college._id === _id ? { ...college, applied: !college.applied } : { ...college};
      });
  
      let college = colleges.find((college)=>
      { 
        return college._id === _id ;
      }) ;
      college.applied = !college.applied
  
        return axios.put(`https://student-college-server.herokuapp.com/student/assign-college/${studentId}`,{_id,college},{
          headers: {
          "Content-Type": "application/json",
          'auth-token': token,
        },
  })
      .then((response)=>{
  
           let data =  response.data;
           alert(data.message);
  
      }
  
      ).then(()=>setColleges(appliedColleges))
     
      .catch((err)=>console.log(err));
    }
    else{
      alert("Kindly, login to apply.")
    }
   
  }


   return(
     <Container >
       <Row className=" ticket-list my-3">
         <Col xs={12} md={12}>
           <div>
             {
               colleges.map((college) => {
                 return (
                   <>
                      
                      <div className='text-style '>
                            <p >{custommessage}</p>          

                        </div>

                     <Card className="collegelist">
                       <Card.Header>
                         <h4  >{college.clgName}  </h4>
                         <span style={{float:"right",paddingLeft:"30px"}}>Rating : {college.rating}</span>
                         <span style={{float:"right"}}><i className="fa fa-map-marker fa-lg" aria-hidden="true"></i> {college.location}</span>
                         
                       </Card.Header>
                       <Card.Body>
                         <Card.Title><h6 ><i class="fa fa-graduation-cap fa-lg" aria-hidden="true"></i>{college.courseName}</h6>
                         <p  style={{float:"right",fontSize:"15px"}} className="desp">Course Duration : {college.courseDuration}</p>
                         </Card.Title>
                         <Card.Text>
                           <p className="desp"> Description :<p className="text-muted">{college.desp}</p> </p>
                           <p  style={{ float:"left"}}className="desp"> Mode Of Study : {college.modeOfStudy}</p>
                        {isLogged && college.applied   ? <div className="m-2" style={{ float:"right"}}><i class="fa fa-check-square fa-lg" aria-hidden="true" style={{color:"rgb(207, 23, 23)"}}> </i></div> : ""}
                        {isLogged === "true"  ? <Button  style={{ float:"right",fontSize: "13px" }} variant="warning" onClick={()=>handleApply(college)} className="text mr-2"><b>Apply</b></Button>:"" }  
                        
                         </Card.Text>
                       </Card.Body>
                     </Card>
                     <br></br>
                   </>
                 )

               })}

           </div>


         </Col>

       </Row>
     </Container>
      
      )
 }
export default CollegeList;
