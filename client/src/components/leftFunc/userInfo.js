import React ,{useState, useContext} from 'react'
import './leftFunc.css'
import Avatar from 'react-avatar'
import AccountInfo from './userInfo/accountInfo'
import {UserContext} from '../../context/user.context'

function UserInfo () {
  const [openAccountInfo, setAccountInfo ] = useState(false)
  const setCloseAccountInfo =() => 
  { 
    setAccountInfo(openAccountInfo => !openAccountInfo)
  }
  const { userInfo} = useContext(UserContext)
  
  let userName = userInfo.username
  let money = 1818181
  const avatarUrl = userInfo.avatar || 'Michael Nam'
  let avatarConfig = {
    round :true,
    size : '36px'
  }
  return (
    <div className = 'userinfo'>
      {
        openAccountInfo === true && 
        <AccountInfo 
          setCloseAccountInfo ={setCloseAccountInfo} 
          openAccountInfo = {openAccountInfo}
        />
      }
      <div className = 'userinfo-container'>
        <div className = 'userinfo-left'>
          <Avatar {...avatarConfig}  onClick ={setCloseAccountInfo} name={avatarUrl }/>
          <div className = 'userinfo-username'  onClick ={setCloseAccountInfo}>{userName} </div>
          <div className = 'userinfo-money'>${money}</div>
        </div>
        <div className ='userinfo-more'>
            <i className="fas fa-ellipsis-h"></i>
        </div>
      </div>
    </div>
  );
}
  
export default UserInfo 