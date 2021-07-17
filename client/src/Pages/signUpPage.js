import React,{useState} from 'react'


function SignUpPage() {
    const [passSide, setPassSide]= useState(false)
    const switchPassSide = ()=> {
        setPassSide(passSide => !passSide)
    }
    const [gmail, setGmail]= useState('')
    const [phonenumber,setPhonenumber] =useState('')
    const [password, setPassword]= useState('')
    const [phoneAproach, setPhoneAprpoach] = useState(false)
    const [wrongAlertPass, setWrongAlertPass] = useState(false)
    const [wrongAlertName, setWrongAlertName] = useState(false)

    const changePhoneAproach = ()=>{
        setPhoneAprpoach(phoneAproach => !phoneAproach)
        setWrongAlertName(false)
        setPhonenumber('')
        setGmail('')
    }
    const [error, setError] = useState('')
    const validateGmail =()=>{
        let formatGmail = new RegExp(/^[\w.+\-]+@gmail\.com$/)

        if(!gmail || !formatGmail.test(gmail)){
            setError(' Enter the email address in the format someone@example.com.')
            setWrongAlertName(true)
        }else{
            
            setWrongAlertName(false)
            setPassSide(true)
        }
        
    }
    const validatePhone =()=>{
        let formatPhone = new RegExp(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/)
        if(!password || !formatPhone.test(password)){}
    }
    
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
                                <div className ='loginpage-title-large'>Create account</div>
                              
                            </div>
                            { wrongAlertName === true && phoneAproach === true && 
                                <div className ='loginpage-wrongalert'>
                                   The phone number you entered isn't valid. Your phone number can contain numbers, spaces, and these special characters: ( ) [ ] . - * /
                                </div>
                            }
                            { wrongAlertName === true && phoneAproach === false && 
                                <div className ='loginpage-wrongalert'>
                                  {error}
                                </div>
                            }
                            {
                                phoneAproach === false &&
                                <div>
                                    <div className ='loginpage-input'>
                                        
                                        <input type ='text'className ="input-phone"  placeholder ="someone@example.com" value ={gmail}
                                        onChange= {e => setGmail(e.target.value)}
                                        />                                      
                                    </div>
                                    <div className ='loginpage-bykey'>
                                        <p onClick ={changePhoneAproach}>Use a phone number instead</p>
                                    </div>
                                    <div className ='loginpage-bykey'>
                                        <p>Get a new email address </p>
                    
                                    </div>
                                    <div className ='loginpage-button'
                                onClick ={validateGmail}
                            >
                                Next
                            </div>
                                </div>
                            }
                            {
                                phoneAproach === true &&
                                <div>
                                    <div className ='loginpage-input'>
                                        <input className ="input-country" type ='text' value ="+84" />
                                        <input className ="input-phone" type ='text' 
                                            placeholder ="Phone number" 
                                            value ={phonenumber}
                                            onChange= {e => setPhonenumber(e.target.value)}
                                        /> 
                                    </div>
                                    <div className ='loginpage-bykey'>
                                        <p onClick ={changePhoneAproach}>Use your email instead</p>
                                    </div>
                                    <div className ='loginpage-button'
                                        onClick ={validatePhone}>
                                        Next
                                    </div>
                                </div>
                                
                            }

                            
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
                            <div className ='loginpage-enter-pass'> Create password</div>
                            <div className ='signup-title-small'>Enter the password you would like to use with your account.</div>
                            { wrongAlertPass === true&&
                                <div className ='loginpage-wrongalert'>
                                    Passwords must have at least 8 characters and contain at least two of the following: uppercase letters, lowercase letters, numbers, and symbols.
                                </div>
                            }
                            <div className ='loginpage-input'>
                                <input type ='password' className ="input-phone" placeholder ="Create password"
                                value ={password}
                                onChange= {e => setPassword(e.target.value)}
                                />

                            </div>
                            <div className ='loginpage-keep'>
                                <input type = 'checkbox'/>
                                <p>Show password</p>
                            </div>
                            <div className ='signup-quote'>
                                By providing your phone number, you agree to receive service notifications to your mobile phone. Text messaging rates may apply.
                            </div>
                            
                            <div className ='loginpage-button'>
                                Next
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
  
export default SignUpPage