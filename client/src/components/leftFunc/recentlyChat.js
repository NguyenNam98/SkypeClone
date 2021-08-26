import React,{useContext, useEffect, useState} from 'react'
import './leftFunc.css'
import Avatar from 'react-avatar'
import {UserContext} from '../../context/user.context'
import Axios from 'axios'

const host = process.env.REACT_APP_HOST
const port = process.env.REACT_APP_PORT || 8080

function RecentlyChat() {
  const {listGroups, setFisrtPage, 
    setCurrentRoom, setMessagesCurrentGroup, setUsersCurrentGroup} = useContext(UserContext)
  const setContextRoomChat = async(index)=>{
  
    await Axios.get(`http://${host}:${port}/group/dataOneGroup/${index}`).then(async res =>{
      await setCurrentRoom(res.data)
    })
    await Axios.get(`http://${host}:${port}/message/dataRoomChat/${index}`).then(async res =>{
        await setMessagesCurrentGroup(res.data.messagesGroup)
        await setUsersCurrentGroup(res.data.dataUsersGroup)
    })
  
    await setFisrtPage(false)
  }

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
            {listGroups.map((item) => {
                return(
                    <div className = 'recentlychat-info' 
                      key ={item.id}
                      onClick ={()=>setContextRoomChat(item.id)}
                    >
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