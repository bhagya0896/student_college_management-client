import axios from 'axios';

const BASE_URL = 'https://student-college-server.herokuapp.com/admin';

//getColleges
export const fetchColleges =()=>{
   return axios
   .get(`${BASE_URL}/collegelist`,{
       headers:{
           "Content-Type": "application/json",
         
       }
   })
   .then((res)=>res.data)
  
}


