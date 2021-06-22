import React from 'react'
import '../leftFunc.css'
import Avatar from 'react-avatar'
import avatarLink from '../../../public/avatar/avatar-test.jpg'

function accountInfo(props) {
  const userInfo ={username :'Nguyễn Nam', gmail :'16522665@gmail.com.vn'}
  let avatarConfig = {
    round :true,
    size : '72px'
  }
  return (
    <div className = 'accountInfo'
          onClick={props.setCloseAccountInfo}
    >
      <div className = 'accountInfo-container'>
        <div className = 'accountInfo-main'>
          <div className ='accountInfo-head'>
            <div className ='accountInfo-logo'>
              <i className="fab fa-microsoft"></i>
              <p>Michael Team</p>
            </div>
            <div className ='accountInfo-login'>Đăng xuất</div>
          </div>
          <div className ='accountInfo-user'>
              <div className ='accountInfo-user-avatar'>
                <Avatar {...avatarConfig} src = {avatarLink}/>
              </div>
              <div className ='accountInfo-user-right'>
                  <div className = 'accountInfo-user-name'>{userInfo.username}</div>
                  <div className = 'accountInfo-user-gmail'>{userInfo.gmail}</div>
                  <a href='https://account.microsoft.com/'>Tài khoản microsoft của tôi</a>
              </div>
          </div>
          <div className ='accountInfo-status'>
              <i></i>
              <p></p>
            </div>
          <div className ='accountInfo-share'>
            <i></i>
            <p>Chia sẻ những gì bạn đang làm</p>
          </div>
          <div className ='accountInfo-mark'>
            <i></i>
            <p>Thẻ đánh dấu</p>
          </div>
          <div className ='accountInfo-invite'>
            <i></i>
            <p>Mời bạn</p>
          </div>
          <div className ='accountInfo-manage'>Quản lý</div>
          <div className ='accountInfo-appli'>
            <i></i>
            <p>Hồ sơ Skype</p>
          </div>
          <div className ='accountInfo-phone'>
            <i></i>
            <div className ='accountInfo-phone-text'>
              <div className ='accountInfo-phone-call'>
                Skype tới điện thoại
              </div>
              <div className ='accountInfo-phone-fee'>
                Gọi điện với cước phí thấp
              </div>
            </div>
          </div>
          <div className ='accountInfo-phone'>
            <i></i>
            <div className ='accountInfo-phone-text'>
              <div className ='accountInfo-phone-call'>
                Skype tới điện thoại
              </div>
              <div className ='accountInfo-phone-fee'>
                Gọi điện với cước phí thấp
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
  
export default accountInfo