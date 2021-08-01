import React, {useState} from 'react';

export const UserContext= React.createContext();

export function UserProvider (props){
    const [userInfo,setUserInfo]= useState({})
    const setUserInfoFunc =(user)=>{
        setUserInfo(Object.assign(user, userInfo))
    }
    
    return(
        <UserContext.Provider
            value={{
                userInfo:userInfo,
                setUserInfo:setUserInfoFunc
            }}
        >
            {props.children}
        </UserContext.Provider>
    )
}