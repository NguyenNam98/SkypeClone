import React, {useState} from 'react';
export const UserContext= React.createContext();


export function UserProvider (props){
    const [userInfo,setUserInfo]= useState({})
    const [firstPage, setFisrtPage] = useState(true)
    const [listGroups , setListGroups] = useState([])
    const [currentRoom, setCurrentRoom] = useState([])
    const [usersCurrentGroup, setUsersCurrentGroup] = useState([])
    const [messagesOfCurrentGroup ,setMessagesCurrentGroup]= useState([])

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
                messagesOfCurrentGroup: messagesOfCurrentGroup,
                setMessagesCurrentGroup: setMessagesCurrentGroup,
                usersCurrentGroup: usersCurrentGroup,
                setUsersCurrentGroup: setUsersCurrentGroup
            }}
        >
            {props.children}
        </UserContext.Provider>
    )
}