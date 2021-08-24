import React, {useState} from 'react';

export const UserContext= React.createContext();
const host = process.env.REACT_APP_HOST
const port = process.env.REACT_APP_PORT || 8080

export function UserProvider (props){
    const [userInfo,setUserInfo]= useState({})
    const [firstPage, setFisrtPage] = useState(true)
    const [listGroups , setListGroups] = useState([])
    const [currentRoom, setCurrentRoom] = useState([])
    const [dataMessageGroup , setDataMessageGroup]= useState([])
    const setUserInfoFunc =(user)=>{
        setUserInfo(Object.assign(user, userInfo))
    }
    // const setToFisrtPage =()=>{
    //     setFisrtPage(false)
    // }
    const setToListGroups =(groups)=>{
        setListGroups(groups)    
    }

    return(
        <UserContext.Provider
            value={{
                userInfo:userInfo,
                setUserInfo:setUserInfoFunc,
                firstPage: firstPage,
                setFisrtPage: setFisrtPage,
                listGroups: listGroups,
                setToListGroups: setToListGroups,
                currentRoom:currentRoom,
                setCurrentRoom:setCurrentRoom,
                dataMessageGroup:dataMessageGroup,
                setDataMessageGroup,setDataMessageGroup
            }}
        >
            {props.children}
        </UserContext.Provider>
    )
}