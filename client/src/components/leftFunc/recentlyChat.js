import React from 'react'
import './leftFunc.css'
import Avatar from 'react-avatar'

function recentlyChat() {
  const users =[
      {avatar:'Nguyen Nam', nameRoom: 'Tiktok-Chat',lastMessage : 'How are you ?', lastTimeOfConversate : '8:35 AM'},
      {avatar:'Thui Thui', nameRoom: 'Phong Trọ',lastMessage : 'How are you How are you?', lastTimeOfConversate : '8:35 AM'},
      {avatar:'Viet Cho', nameRoom: 'Trường Học',lastMessage : 'How are you ?', lastTimeOfConversate : '8:35 AM'},
      {avatar:'Viet Cho', nameRoom: 'Trường Học',lastMessage : 'How are you ?', lastTimeOfConversate : '8:35 AM'},
      {avatar:'Nguyen Nam', nameRoom: 'Tiktok-Chat',lastMessage : 'How are you ?', lastTimeOfConversate : '8:35 AM'},
      {avatar:'Nguyen Nam', nameRoom: 'Tiktok-Chat',lastMessage : 'How are you ?', lastTimeOfConversate : '8:35 AM'},
      {avatar:'Nguyen Nam', nameRoom: 'Tiktok-Chat',lastMessage : 'How are you ?', lastTimeOfConversate : '8:35 AM'},
      {avatar:'Nguyen Nam', nameRoom: 'Tiktok-Chat',lastMessage : 'How are you ?', lastTimeOfConversate : '8:35 AM'},
     
  ]  
  let avatarConfig = {
    round :true,
    size : '36px',
    color: 'rgb(229, 228, 232)',
    fgColor :'rgb(0, 120, 212)'
  }
  return (
    <div className = 'recentlychat'>
      <div className = 'recentlychat-container'>
        <div className = 'recentlychat-title'>
            <p className = 'recentlychat-text'>Cuộc trò chuyện gần đây</p>
            <i className="fas fa-angle-down"></i>
        </div>
        <div className = 'recentlychat-conversation'>
            {users.map((item) => {
                return(
                    <div className = 'recentlychat-info' >
                        <div className = 'recentlychat-left'>
                            <Avatar name = {item.avatar} {...avatarConfig}/>
                            <div className ='recentlychat-room'>
                                <div className = 'recentlychat-roomname'>{item.nameRoom}</div>
                                <div className = 'recentlychat-message'>{item.lastMessage}</div>
                            </div>
                        </div>
                        <div className = 'recentlychat-time'>{item.lastTimeOfConversate}</div>
                    </div>
                )
            })}
        </div>
      </div>
    </div>
  );
}
  
export default recentlyChat