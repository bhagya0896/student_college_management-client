
// import packages
import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import '../App.css';
import axios from 'axios';


//react-bootstrap
import { Container, Row, Col, Form, Button, InputGroup, FormControl, Navbar, Nav } from 'react-bootstrap';

// CollegeForm Component

function CollegeForm() {


    const [college, setCollege] = useState({
        courseName: "", clgName: "", desp: "",
        modeOfStudy: "", location: "", courseDuration: "", rating: ""
    })

    const [message, setMessage] = useState("");
    const [custommessage, setcustomMessage] = useState("");

    // Form-submit function
    const handleSubmit = (e) => {

        const { courseName, clgName, desp,
            modeOfStudy, location, courseDuration, rating } = college;

        setMessage("");
        e.preventDefault();
        let adminId = localStorage.getItem('adminId');
        let token = localStorage.getItem('token');
        console.log(adminId, token)
        return axios
            .post(`http://localhost:5000/admin/add-college`, {
                adminId, courseName, clgName, desp,
                modeOfStudy, location, courseDuration, rating
            },
                {
                    headers: {
                        "Content-Type": "application/json",
                        'auth-token': token
                    }
                })
            .then((res) => {
                console.log(res)
                let data = res.data;
                setMessage(data.message);
                console.log(data.message);
                setCollege({
                    courseName: "Master Of Business Administration", clgName: "", desp: "",
                    modeOfStudy: "online", location: "", courseDuration: "", rating: ""
                })

            }

            )
            .catch((error) => (error.response.data));
    }
    return (

        <>

            <Container >
                <Row>
                    <Col xs={12} md={5} className="mt-5 pt-5">

                    </Col>
                    <Col xs={12} md={6} >
                        <Form className="signup-form mt-5 pt-5" onSubmit={handleSubmit}>
                            <p className="text-center text " style={{ fontSize: "18px", color: "rgb(207, 23, 23)" }} >College Details</p>


                            <Form.Group >
                                <Form.Label className="my-1 mr-2 text text-muted" htmlFor="inlineFormCustomSelectPref" style={{ fontSize: "12px" }}>
                                    Course Name
                                </Form.Label>
                                <Form.Control
                                    as="select"
                                    className="my-1 mr-sm-3 text m-3 p-2"
                                    id="inlineFormCustomSelectPref"
                                    name="coursename"
                                    custom
                                    value={college.courseName}

                                    onChange={(e) => { setCollege((clg) => ({ ...clg, courseName: e.target.value })) }}
                                    style={{ fontSize: "12px" }}
                                >
                                    <option >Choose...</option>
                                    <option selected value="Master Of Business Administration">Master Of Business Administration</option>
                                    <option value="Master Of Computer Science">Master Of Computer Science</option>
                                    <option value="Master Of Technology - Structural Engineering">Master Of Technology - Structural Engineering</option>
                                    <option value="Master Of Technology - Computer Science And Engineering">Master Of Technology - Computer Science And Engineering</option>
                                    <option value="Doctorate Of Medicine - Physiology">Doctorate Of Medicine - Physiology</option>
                                    <option value="Master Of Surgery">Master Of Surgery</option>

                                </Form.Control>
                            </Form.Group>
                            <br></br>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Control type="text" className="form-control text" style={{ fontSize: "12px" }} name="clgName" value={college.clgName} onChange={(e) => { setCollege((clg) => ({ ...clg, clgName: e.target.value })) }} placeholder="College Name" required="required" />
                            </Form.Group>

                            <br></br>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Control type="text" className="form-control text" style={{ fontSize: "12px" }} name="desp" value={college.desp} onChange={(e) => { setCollege((clg) => ({ ...clg, desp: e.target.value })) }} placeholder="Description" required="required" />
                            </Form.Group>

                            <br></br>
                            <Row>
                                <Col>
                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label className="my-1 mr-2 text text-muted" htmlFor="inlineFormCustomSelectPref" style={{ fontSize: "12px" }}>
                                            Location
                                        </Form.Label>
                                        <Form.Control
                                            as="select"
                                            className="my-1 mr-sm-3 text m-3 p-2 "
                                            id="inlineFormCustomSelectPref"
                                            name="location"
                                            type="text"
                                            custom
                                            value={college.location}

                                            onChange={(e) => { setCollege((clg) => ({ ...clg, location: e.target.value })) }}
                                            style={{ fontSize: "12px" }}
                                        >
                                            <option >Choose...</option>
                                            <option selected value="Chennai">Chennai</option>
                                            <option value="Ahmedabad">Ahmedabad</option>
                                            <option value="Bangalore">Bangalore</option>
                                            <option value="Vizag">Vizag</option>
                                            <option value="Delhi">Delhi</option>
                                            <option value="Culcatta">Culcatta</option>

                                        </Form.Control>
                                    </Form.Group>
                                </Col>


                                <Col>
                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label className="my-1 mr-2 text text-muted" htmlFor="inlineFormCustomSelectPref" style={{ fontSize: "12px" }}>
                                            Course Duration
                                        </Form.Label>
                                        <Form.Control
                                            as="select"
                                            className="my-1 mr-sm-3 text m-3 p-2"
                                            id="inlineFormCustomSelectPref"
                                            name="courseDuration"
                                            type="text"
                                            custom
                                            value={college.courseDuration}

                                            onChange={(e) => { setCollege((clg) => ({ ...clg, courseDuration: e.target.value })) }}
                                            style={{ fontSize: "12px" }}
                                        >
                                            <option >Choose...</option>
                                            <option selected value="2 years">2 years</option>
                                            <option value="3 years">3 years</option>


                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>




                            <br></br>


                            <Row>
                                <Col><Form.Group inline>
                                    <Form.Label className="my-1 mr-2 text text-muted" htmlFor="inlineFormCustomSelectPref" style={{ fontSize: "12px" }}>
                                        Mode Of Study
                                    </Form.Label>
                                    <Form.Control
                                        as="select"
                                        className="my-1 mr-sm-3 text m-3 "
                                        id="inlineFormCustomSelectPref"
                                        name="modeofstudy"
                                        custom
                                        value={college.modeOfStudy}

                                        onChange={(e) => { setCollege((clg) => ({ ...clg, modeOfStudy: e.target.value })) }}
                                        style={{ fontSize: "12px" }}
                                    >
                                        <option >Choose...</option>
                                        <option selected value="online">OnLine</option>
                                        <option value="offline">offLine</option>

                                    </Form.Control>
                                </Form.Group>
                                </Col>
                                <Col> <Form.Group controlId="formBasicPassword">
                                    <Form.Control type="text" className="form-control text" style={{ fontSize: "12px" }} name="rating" value={college.rating} onChange={(e) => { setCollege((clg) => ({ ...clg, rating: e.target.value })) }} placeholder="Rating / 10" required="required" />
                                </Form.Group>
                                </Col>
                            </Row>
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

export default CollegeForm;