import React,{useState, useContext, useEffect} from 'react'
import { withRouter } from "react-router-dom";
import {
    Link
  } from "react-router-dom";
import Axios from 'axios'
import {UserContext} from '../context/user.context'

const host = process.env.REACT_APP_HOST
const port = process.env.REACT_APP_PORT || 8080

function VerifyPage(props) {
   console.log(props.location.search);

  return (
      <div>
          <div>
              <input type='text' placeholder='Enter your code'></input>
              <div>Take the code from your email !</div>
              <button>Submit code</button>
          </div>
      </div>
  )
 
}
  
export default withRouter(VerifyPage)