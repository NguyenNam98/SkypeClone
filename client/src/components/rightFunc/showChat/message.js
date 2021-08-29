  
import React,{useEffect, useRef} from 'react';
import '../rightFunc.css'
import Avatar from 'react-avatar'
import avatarLink from '../../../public/avatar/avatar-test.jpg'

function sortTime (t){
  let time = new Date(t)
  let date =''
  let now = new Date().getTime()
  if((now - time.getTime())/86400000 < 1){
      date = new Date(time).toLocaleString('en-US', {minute:'numeric', hour: 'numeric', hour12: true })
  }else if((now - date)/86400000 < 7){
      date = new Date(time).toLocaleString('en-us', {  weekday: 'long' }).slice(0,3)
  }else{
      date = new Date(time).toLocaleString('en-us', {year: "numeric",month: "2-digit",day: "numeric" })
  }
  return date
}

function Message(props) {
  const messageLeft = props.messageLeft
  const messageData = props.messageData
  const dataUser = props.dataUser
  let date = sortTime(messageData.timeCreated)

  let avatarConfig = {
    round :true,
    size : '36px'
  }

  return (
    <div className = 'message'>
      <div className =  'message-container'>
        {
          messageLeft === true && 
          <div className ='message-left'>
            <Avatar {...avatarConfig} src ={avatarLink}/>
            <div className ='message-detail'>
              <div className = 'message-info'>
                <div className = 'message-name'>{dataUser.username}</div>
                <div className = 'message-time' >{ date} </div>
              </div>
              <div className = 'message-text'>{messageData.text}</div>
            </div>
          </div>
        }
        {
           messageLeft === false && 
           <div className ='message-right'>
             <div className = 'message-right-detail'>
              <div className = 'message-right-time' >{date} </div>
              <div className = 'message-right-text'>{messageData.text}</div>
             </div>
           </div>
        }
      </div>
     
    </div>
  );
}
  
export default Message