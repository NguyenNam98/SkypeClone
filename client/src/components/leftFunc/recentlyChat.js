import React,{useContext} from 'react'
import './leftFunc.css'
import Avatar from 'react-avatar'
import {UserContext} from '../../context/user.context'

function RecentlyChat() {
  const {listGroups} = useContext(UserContext)
  const users =listGroups
  console.log(users);
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
                    <div className = 'recentlychat-info' key ={item.id} >
                        <div className = 'recentlychat-left'>
                            <Avatar name = {item.avatar ? item.avatar :item.nameGroup} {...avatarConfig}/>
                            <div className ='recentlychat-room'>
                                <div className = 'recentlychat-roomname'>{item.nameGroup}</div>
                                <div className = 'recentlychat-message'>{!item.lastMessageInfo ? '':item.lastMessageInfo.text}</div>
                            </div>
                        </div>
                        <div className = 'recentlychat-time'>{!item.lastMessageInfo ? '0:00':item.lastMessageInfo.timeCreated}</div>
                    </div>
                )
            })}
        </div>
      </div>
    </div>
  );
}
  
export default RecentlyChat