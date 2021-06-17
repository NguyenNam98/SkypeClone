import React from 'react'
import './leftFunc.css'
import Avatar from 'react-avatar'
import avatarLink from '../../public/avatar/avatar-test.jpg'

function userInfo () {
  let userName = 'nguyennam'
  let money = 1818181
  let avatarConfig = {
    round :true,
    size : '36px'
  }
  return (
    <div className = 'userinfo'>
      <div className = 'userinfo-container'>
        <div className = 'userinfo-left'>
          <Avatar {...avatarConfig} src = {avatarLink}/>
          <div className = 'userinfo-username'>{userName}</div>
          <div className = 'userinfo-money'>${money}</div>
        </div>
        <div className ='userinfo-more'>
            <i className="fas fa-ellipsis-h"></i>
        </div>
      </div>
    </div>
  );
}
  
export default userInfo 