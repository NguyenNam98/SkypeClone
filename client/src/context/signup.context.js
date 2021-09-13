import React, {useState} from 'react';
export const SignupContext= React.createContext();


export function SignupProvider (props){
    const [gmail, setGmail] = useState('')
    const setGmailToContext =(gm) =>{
            setGmail(gm)
    }
    const [password, setPassword] = useState('')
    const setPasswordToContext =(pass)=>{
        setPassword(pass)
    }
    return(
        <SignupContext.Provider
            value={{
                gmail:gmail,
                setGmailToContext: setGmailToContext,
                password:password,
                setPasswordToContext :setPasswordToContext
            }}
        >
            {props.children}
        </SignupContext.Provider>
    )
}