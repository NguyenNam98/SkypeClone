import React, { useContext ,useEffect,useState, useRef} from "react"
import '../rightFunc.css'
import Message from './message'
import socketIOClient from "socket.io-client"
import {UserContext} from '../../../context/user.context'
import AddUserToGroup from "./addUserToGroup"

const host = process.env.REACT_APP_HOST
const port = process.env.REACT_APP_PORT || 8080
const ENDPOINT =`http://${host}:${port}`
//const io = socketIOClient(ENDPOINT);
const NEW_CHAT_MESSAGE_EVENT = "NEW_CHAT_MESSAGE_EVENT";
const NEW_USER_JOIN_CHAT_EVENT = "NEW_USER_JOIN_CHAT_EVENT";

function RoomChat() {
  const socketRef = useRef()

  const { currentRoom, userInfo, messagesOfCurrentGroup,
          usersCurrentGroup, setMessagesCurrentGroup,
          setChangeLastMess
    } = useContext(UserContext)
  
  const [message, setMessage] = useState('')
  const [showAddUser, setShowAddUser] = useState(false)
  const [fileMedia, setFileMedia] = useState()
  const [mediaInput, setMediaInput] = useState(false)

  const setCloseAddUser = ()=>{
    setShowAddUser(false)
  }
  const funcSetAddedUser =(users)=>{
    socketRef.current.emit(NEW_USER_JOIN_CHAT_EVENT, {
      body : users,
      userInfo 
    })
 
  }

  useEffect(() => {
    socketRef.current = socketIOClient(ENDPOINT, {
      query : {
        idRoom : currentRoom.idGroup,
        avatar : userInfo.avatar,
        gmail: userInfo.gmail ,
        idUser: userInfo.idUser,
        username:userInfo.username
      }
    })
    socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (mes) =>{
      setMessagesCurrentGroup(messagesOfCurrentGroup =>[ mes.messageInfo, ...messagesOfCurrentGroup ])
      //console.log(messagesOfCurrentGroup);
    })
    socketRef.current.on(NEW_USER_JOIN_CHAT_EVENT, data =>{
      setMessagesCurrentGroup(messagesOfCurrentGroup =>[data, ...messagesOfCurrentGroup ])
     
    })

    return () => {
      //setMessagesCurrentGroup([])
      socketRef.current.disconnect();
    };
  }, [currentRoom, userInfo])

  const sendMessage = (e)=>{
    if(e.keyCode === 13){
      if(!socketRef.current) return
      if(mediaInput === false){
        socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
          contentType:'message',
          body : message,
          userInfo 
        })
        setMessage('')
      }
      else{
        const formData = new FormData();
        formData.append('File', fileMedia);
        
        socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
        contentType: 'file',
        body : fileMedia,
        userInfo 
        })
        setMediaInput(false)
      }
    }
  }

  const handleGetFile =(e)=>{
    setFileMedia(e.target.files[0])
    setMediaInput(true)
    
  }
  const sendMediaFile =(e)=>{

    if(e.keyCode === 13){
    
     
    }
  }
  useEffect(() => {
    setChangeLastMess(changeLastMess =>!changeLastMess)
  }, [messagesOfCurrentGroup])
  
  return (
    <div className = 'roomchat'>
      <div className = ' roomchat-container'>
          {
            showAddUser === true &&
            <AddUserToGroup 
              setCloseAddUser = {setCloseAddUser}
              idCurrentRoom = {currentRoom.idGroup}
              funcSetAddedUser = {funcSetAddedUser}
            />
          }
            <div className = 'roomchat-navbar'>
              <div className = 'roomchat-navbar-left'>
                <div className = 'roomchat-left-name'>{currentRoom.nameGroup}</div>
                <div className = 'roomchat-left-info'>
                    <div className = 'roomchat-left-numberuser'>
                      <p>
                        {currentRoom.numberOfUser} người dự
                      </p>
                    </div>
                    <div className = 'roomchat-left-library'>
                        <i className="far fa-images"></i>
                        <p>Thư viện</p>
                    </div>
                    <div className = 'roomchat-left-search'>
                        <i className="fas fa-search"></i>
                        <p>tìm kiếm</p>
                    </div>
                </div>
              </div>
              <div className = 'roomchat-navbar-right'>
                <i className="fas fa-video nav-icon"></i>
                <i className="fas fa-phone-alt nav-icon"></i>
                <i className="fas fa-user-plus nav-icon"
                   onClick={()=>{setShowAddUser(true)}}
                ></i>
              </div>
          </div>
          <div className = 'roomchat-message' >
            { 
              messagesOfCurrentGroup.map(item =>{
                let dataUser ={}        
                usersCurrentGroup.forEach(element => {              
                  if(element.id === item.idUser){
                    dataUser = element                
                  }
                });               
                return(
                  <div  key ={item.idMessage}  >
                    {
                      item.idUser === userInfo.idUser &&
                        <Message messageLeft ={false}
                            messageData = {item}
                            dataUser ={dataUser}           
                       />            
                    }
                    {
                      item.idUser !== userInfo.idUser && item.idUser&&
                        <Message messageLeft ={true}
                                messageData = {item}
                                dataUser = {dataUser}                                      
                        />
                    }

                    {
                      !item.idUser &&
                      <div className ='noticed-add-user'>
                        <div>{item.text}</div>
                      </div>
                    }
                  </div>
                  )
              })
            }
          </div>
          {
            mediaInput === true && fileMedia!== undefined &&
            <div className='roomchar-showmedia'>
              <img src={URL.createObjectURL(fileMedia)} alt="dummy" width="100" height="100" />     
              <i className="fas fa-times" onClick = {()=>{setFileMedia()}}>

              </i>
            </div>
            
          }
          <div className = 'roomchat-newmessage'>
            <div className = 'newmessage-left'>
              <i className="far fa-grin-hearts"></i>
              <input type= 'text' placeholder = 'Nhập tin nhắn' 
                value={message}
                onKeyDown ={sendMessage}
                onChange ={(e)=>{
                  e.preventDefault();
                  setMessage(e.target.value)
                }}
              >
                
              </input>
              
            </div>
              <div className = 'newmessage-right'>
                <label htmlFor='upload-button'>
                 <i className="far fa-file-image"></i>
                </label>
                <input
                  type="file"
                  id="upload-button"
                  style= {{ display: "none" }}
                  onKeyDown ={sendMediaFile}
                  onChange ={handleGetFile}
                />
                
                <i className="far fa-address-card"></i>
                <i className="fas fa-microphone-alt"></i>
                <i className="fas fa-ellipsis-h"></i>
              </div>
          </div>
      </div>
    </div>
  );
}
  
export default RoomChat