import React, { useContext ,useEffect,useState} from "react"
import '../rightFunc.css'
import Message from './message'
import socketIOClient from "socket.io-client"
import {UserContext} from '../../../context/user.context'



const host = process.env.REACT_APP_HOST
const port = process.env.REACT_APP_PORT || 8080
const ENDPOINT =`http://${host}:${port}`
const io = socketIOClient(ENDPOINT);

function RoomChat() {
  const {currentRoom, userInfo, messagesOfCurrentGroup, usersCurrentGroup, setMessagesCurrentGroup} = useContext(UserContext)
  const [message, setMessage] = useState('')
  const sendMessage = (e)=>{
    if(e.keyCode === 13){
      io.emit(currentRoom.idGroup, {message:message})
      io.on(currentRoom.idGroup, (data) =>{
        setMessagesCurrentGroup(messagesOfCurrentGroup.unshift(data.dataMes))
      })
     setMessage('')
    }
  }
  console.log(messagesOfCurrentGroup);
  useEffect(()=>{
    io.emit('joinRoom', {userInfo, idRoom:currentRoom.idGroup} )
  },[currentRoom])

  return (
    <div className = 'roomchat'>
      <div className = 'roomchat-container'>
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
                <i className="fas fa-user-plus nav-icon"></i>
              </div>
          </div>
          <div className = 'roomchat-message'>
            {/* { 
              messagesOfCurrentGroup.map(item =>{
                let dataUser ={}
               
                usersCurrentGroup.forEach(element => {
               
                  if(element.id === item.idUser){
                    dataUser = element
                 
                  }
                });
               
                return(
                  <div  key ={item.idMessage}>
                  {
                    item.idUser === userInfo.idUser &&
                    <Message messageLeft ={false}
                             messageData = {item}
                             dataUser ={dataUser}
                            
                    />
                  }
                  {
                    item.idUser !== userInfo.idUser &&
                    <Message messageLeft ={true}
                             messageData = {item}
                             dataUser = {dataUser}      
                    />
                  }
                  </div>
                  )
              })
            } */}
          </div>
          <div className = 'roomchat-newmessage'>
            <div className = 'newmessage-left'>
              <i className="far fa-grin-hearts"></i>
              <input type= 'text' placeholder = 'Nhập tin nhắn' 
                value={message}
                onKeyDown ={sendMessage}
                onChange ={(e)=>{setMessage(e.target.value)}}
              >

              </input>

            </div>
              <div className = 'newmessage-right'>
                <i className="far fa-file-image"></i>
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