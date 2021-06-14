import React from 'react'
import './leftFunc.css'
import Avatar from 'react-avatar'
import avatarLink from '../../public/avatar/avatar-test.jpg'

function userInfo () {
    return (
      <div className = 'userinfo'>
          <div className = 'userinfo-container'>
                <Avatar src ={avatarLink}/>
          </div>

      </div>
    );
  }
  
export default userInfo 