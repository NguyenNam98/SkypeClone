import React,{useState, useContext, useEffect} from 'react'
import { withRouter } from "react-router-dom";

import Axios from 'axios'

import {SignupContext} from '../context/signup.context'
const host = process.env.REACT_APP_HOST
const port = process.env.REACT_APP_PORT || 8080

function VerifyPage(props) {
    const {gmail, password} = useContext(SignupContext)
    console.log('gmail',gmail);
    const [code, setCode] = useState('')
    console.log(code);
    const sendCode = () =>{
        
        let data = {
            gmail,
            password,
            code
        }
        Axios.post(`http://${host}:${port}/user/create`, data)
        .then(res =>{
            console.log(res);
            props.history.push('/login')
            window.location.reload(false);
        }).catch(err => {
            console.log(err);
        })
        console.log('click');
    }
  return (
      <div>
          <div>
              <input type='text' 
              placeholder='Enter your code'
              value={code}
              onChange={(e)=>{setCode(e.target.value)}}
              ></input>
              <div>Take the code from your email !</div>
              <button onClick={sendCode}>Submit code</button>
          </div>
      </div>
  )
 
}
  
export default withRouter(VerifyPage)