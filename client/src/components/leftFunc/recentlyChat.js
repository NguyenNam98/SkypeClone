import React,{useContext, useEffect} from 'react'
import './leftFunc.css'
import Avatar from 'react-avatar'
import {UserContext} from '../../context/user.context'
import Axios from 'axios'

const host = process.env.REACT_APP_HOST
const port = process.env.REACT_APP_PORT || 8080

function sortTime (date){
    date = new Date(date)
    let now = new Date().getTime()
    if((now - date.getTime())/86400000 < 1){
        date = new Date(date).toLocaleString('en-US', {minute:'numeric', hour: 'numeric', hour12: true })
    }else if((now - date)/86400000 < 7){
        date = new Date(date).toLocaleString('en-us', {  weekday: 'long' }).slice(0,3)
    }else{
        date = new Date(date).toLocaleString('en-us', {year: "numeric",month: "2-digit",day: "numeric" })
    }
  return date
}

function RecentlyChat() {
  const {listGroups, setFisrtPage, 
    setCurrentRoom, setMessagesCurrentGroup, setUsersCurrentGroup} = useContext(UserContext)
  const setContextRoomChat = async(index)=>{
    await Axios.get(`http://${host}:${port}/group/dataOneGroup/${index}`)
    .then(async res =>{
      await setCurrentRoom(res.data)
    })
    await Axios.get(`http://${host}:${port}/message/dataRoomChat/${index}`)
    .then(async res =>{
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
                        <div className = 'recentlychat-time'>{!item.lastMessageInfo ? '0:00': sortTime(item.lastMessageInfo.timeCreated)}</div>
                    </div>
                )
            })}
        </div>
      </div>
    </div>
  );
}
  
export default RecentlyChat