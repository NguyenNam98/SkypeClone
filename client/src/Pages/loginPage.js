import React,{useState, useContext, useEffect} from 'react'
import { withRouter } from "react-router-dom";
import {
    Link
  } from "react-router-dom";
import Axios from 'axios'
import {UserContext} from '../context/user.context'

const host = process.env.REACT_APP_HOST
const port = process.env.REACT_APP_PORT || 8080

function LoginPage(props) {
    Axios.defaults.withCredentials = true;
    const {setUserInfo} = useContext(UserContext)
    const [passSide, setPassSide]= useState(false)

    let [gmail, setGmail]= useState('')
    const [password, setPassword]= useState('')

    const [wrongAlertPass, setWrongAlertPass] = useState(false)
    const [wrongAlertName, setWrongAlertName] = useState(false)

    const validateUserInput =()=>{
        let formatGmail = new RegExp(/^[\w.+\-]+@gmail\.com$/)
        let formatPhone = new RegExp(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/)
        if(!gmail || !formatGmail.test(gmail)&& !formatPhone.test(gmail)){
            setPassSide(false)
            setWrongAlertName(true)
        }else{
            setWrongAlertName(false)
            setPassSide(true)
        }
    }
    const signIn = ()=>{
        let phoneNumber =''
        let formatPhone = new RegExp(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/)

        if(formatPhone.test(gmail)){
            phoneNumber=gmail
            gmail =''
        }
        let userData = {
            phoneNumber : phoneNumber,
            gmail:gmail,
            password:password
        }  
         Axios.post(`http://${host}:${port}/user/auth/login`, userData, {
             headers:{
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
        }).then((res)=>{
            setUserInfo(res.data.userData)
            localStorage.setItem('refresh_token', res.data.refreshToken)
            alert('Login successfull!')
            props.history.push('/')
            window.location.reload(false);  
         
        }).catch((err)=>{
            alert('login unsuccessfull! please try again!')
        })
    }

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         let data = {
    //                     refreshToken : localStorage.getItem('refresh_token')
    //                 }
    //         Axios.post(`http://${host}:${port}/user/auth/refreshToken`, data, {
    //             headers : {
    //                     'Access-Control-Allow-Origin': '*',
    //                     'Content-Type': 'application/json',
    //                     'Accept': 'application/json',
    //                 }
    //         }).then(res=>{
    //         }).catch(err =>{
    //                 setUserInfo({})
    //         })
    //     }, 1000*90*60);
    //     return () => clearInterval(interval);
    //   }, []);
    useEffect(() => {
        let data = {
            refreshToken : localStorage.getItem('refresh_token')
        }
        Axios.post(`http://${host}:${port}/user/auth/checkLogin`, data,{
            headers : {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
        .then((res) => {
            setUserInfo(res.data.userData)
            props.history.push('/')
            window.location.reload(false);  
        })
        .catch(err =>{
            setUserInfo({})
            // props.history.push('/login')
            // window.location.reload(false);
       })
      }, []);

  return (
    <div className = 'loginpage'>
        <div className = 'loginpage-container'>
            <div className = 'loginpage-main'>
                <div className = 'loginpage-logo'>
                    <i className="fab fa-skype"></i>
                </div>
                <div className =' loginpage-info'>
                    <div className='loginpage-info-header'>
                        <i className="fab fa-windows"></i>
                        <p>Microsoft</p>
                    </div>
                    { passSide === false&&
                        <div className ='loginpage-side'>
                            <div className='loginpage-title'>
                                <div className ='loginpage-title-large'>Sign in</div>
                                <div className ='loginpage-title-small'>to continue to skype</div>
                            </div>
                            { wrongAlertName === true &&
                                <div className ='loginpage-wrongalert'>
                                    That Microsoft account doesn't exist. Enter a different account or
                                    <Link to="/signup"> get a new one</Link>. 
                                </div>
                            }
                            <div className ='loginpage-input'>
                                <input className ="input-phone" type ='text' 
                                placeholder =" Email, phone or Skype" 
                                value ={gmail}
                                onChange= {e => setGmail(e.target.value)}
                                
                                />
                            </div>
                            <div className ='loginpage-create'>
                                <p>No account ?</p>
                                <Link to ="/signup" href="http://">Create one!</Link>
                                
                            </div>
                            <div className ='loginpage-bykey'>
                                <p>Sign in with security key </p>
                                <i className="far fa-question-circle"></i>
                            </div>
                            <div className ='loginpage-button'
                                onClick ={validateUserInput}
                            >
                                Next
                            </div>
                        </div>
                    }
                    { passSide === true&&
                        <div className ='loginpage-side'>
                            <div className ='loginpage-gmail'>
                                <i className="fas fa-arrow-left"
                                    onClick ={()=>{setPassSide(false)}}
                                ></i>
                                <p>{gmail}</p>
                            </div>
                            <div className ='loginpage-enter-pass'> Enter password</div>
                            { wrongAlertPass === true&&
                                <div className ='loginpage-wrongalert'>
                                    Your account or password is incorrect. If you don't remember your password,
                                    <a href="http://shs"> reset it now</a>.
                                </div>
                            }
                            <div className ='loginpage-input'>
                                <input type ='password' className ="input-phone" placeholder =" Enter your password"
                                value ={password}
                                onChange= {e => setPassword(e.target.value)}
                                />

                            </div>
                            <div className ='loginpage-keep'>
                                <input type = 'checkbox'/>
                                <p>Keep me signed in</p>
                            </div>
                            <div className ='loginpage-link'>
                                <a href ="http://google.com">Forgot password ?</a>
                            </div>
                            <div className ='loginpage-link'>
                                <a href ="http://google.com">Other ways to sign in</a>
                            </div>
                            <div className ='loginpage-button' 
                            onClick={signIn} 
                            >
                                Sign in
                            </div>
                        </div>
                    }
                </div>
            </div>
            <div className = 'loginpage-footer'>
                <p> Terms of use</p>
                <p>Privacy & cookies</p>
                <i className="fas fa-ellipsis-h"></i>

            </div>
        </div>
 
    </div>
  );
}
  
export default withRouter( LoginPage)