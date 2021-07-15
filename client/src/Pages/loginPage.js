import React,{useState} from 'react'


function LoginPage() {
    const [passSide, setPassSide]= useState(false)
    const switchPassSide = ()=> {
        setPassSide(passSide => !passSide)
    }
    const [gmail, setGmail]= useState('')
    const [password, setPassword]= useState('')
    const [wrongAlertPass, setWrongAlertPass] = useState(false)
    const [wrongAlertName, setWrongAlertName] = useState(false)
    
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
                                    <a href="http://shs"> get a new one</a>.
                                </div>
                            }
                            <div className ='loginpage-input'>
                                <input type ='text' value ={gmail}
                                onChange= {e => setGmail(e.target.value)}
                                />
                            </div>
                            <div className ='loginpage-create'>
                                <p>No account ?</p>
                                <a href="http://shs">Create one!</a>
                            </div>
                            <div className ='loginpage-bykey'>
                                <p>Sign in with security key </p>
                                <i className="far fa-question-circle"></i>
                            </div>
                            <div className ='loginpage-button'
                                onClick ={switchPassSide}
                            >
                                Next
                            </div>
                        </div>
                    }
                    { passSide === true&&
                        <div className ='loginpage-side'>
                            <div className ='loginpage-gmail'>
                                <i className="fas fa-arrow-left"
                                    onClick ={switchPassSide}
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
                                <input type ='password' 
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
  
export default LoginPage