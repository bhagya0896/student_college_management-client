import React,{useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

//react-bootstrap
import {Container,Row,Card,Col} from 'react-bootstrap';


function Footer ()
{
    
    return(
<>
<Container fluid>
    <Row >
        <Col xs={12} md={12} className="text-center p-3">
       <hr ></hr>
           <small className=" text-center  text" style={{ fontSize: "11px",color:"black"}} >Copyright 2020 <b className="text"style={{color:"rgb(207, 23, 23)"}}>EduCo</b>.
All rights reserved.</small>
 
        </Col>
    </Row>
</Container fluid>
</>
        
       
          
   
    )
}

export default  Footer;
