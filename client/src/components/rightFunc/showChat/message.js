  
import React from 'react';
import '../rightFunc.css'
import Avatar from 'react-avatar'
import avatarLink from '../../../public/avatar/avatar-test.jpg'


function message(props) {
  const messageLeft = props.messageLeft
  let avatarConfig = {
    round :true,
    size : '36px'
  }
  const roomchat ={
      id:1, roomName:'Chợ tám xuyên 24/24',
      users :[
          { id :'1', username:'nguyennam',
          messages:[
              {message:'anh đang lam gì thế? anh đang lam gì thế? anh đang lam gì thế? anh đang lam gì thế?anh đang lam gì thế? anh đang lam gì thế? anh đang lam gì thế?', time:'11:35 AM'},
              {message:'anh đang lam gì thế?', time:'11:38 AM'},
              {message:'anh đang lam gì thế?', time:'11:40 AM'},
              ]
          },
          { id :'2', username:'nguyen',
          messages:[
              {message:'anh đang lam gì thế?', time:'11:36 AM'},
              {message:'anh đang lam gì thế?', time:'11:39 AM'},
              {message:'anh đang lam gì thế?', time:'11:42 AM'},
              ]
          },
      ]
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
                <div className = 'message-name'>{roomchat.users[0].username} ,</div>
                <div className = 'message-time' >{roomchat.users[0].messages[0].time} </div>
              </div>
              <div className = 'message-text'>{roomchat.users[0].messages[0].message}</div>
            </div>
          </div>
        }
        {
           messageLeft === false && 
           <div className ='message-right'>
             <div className = 'message-right-detail'>
              <div className = 'message-right-time' >{roomchat.users[1].messages[1].time} </div>
              <div className = 'message-right-text'>{roomchat.users[1].messages[1].message}</div>
             </div>
           </div>
        }
      </div>
    </div>
  );
}
  
export default message