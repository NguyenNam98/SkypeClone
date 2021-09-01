// import { useEffect, useRef, useState, useContext } from "react";
// import socketIOClient, { io } from "socket.io-client";
// import axios from "axios";
// import {UserContext} from '../../../context/user.context'

// const USER_JOIN_CHAT_EVENT = "USER_JOIN_CHAT_EVENT";
// const USER_LEAVE_CHAT_EVENT = "USER_LEAVE_CHAT_EVENT";
// const NEW_CHAT_MESSAGE_EVENT = "NEW_CHAT_MESSAGE_EVENT";
// const START_TYPING_MESSAGE_EVENT = "START_TYPING_MESSAGE_EVENT";
// const STOP_TYPING_MESSAGE_EVENT = "STOP_TYPING_MESSAGE_EVENT";
// const SOCKET_SERVER_URL = "http://localhost:3000";

// const useChat =()=>{
//     const [message, setMessage] = useState([])
//     const {currentRoom, userInfo , messagesOfCurrentGroup , } = useContext(UserContext)
//     const socketRef = useRef()

//     useEffect(() => {
    
//     }, [currentRoom])

// }