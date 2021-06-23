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
    >
      <div className = 'accountInfo-over'  onClick={props.setCloseAccountInfo}></div>
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
              <i className="fas fa-circle"></i>
              <p>Đang hoạt động</p>
            </div>
          <div className ='accountInfo-share'>
            <i className="fas fa-bullhorn"></i>
            <p>Chia sẻ những việc bạn đang làm</p>
            <i className="fas fa-pen"></i>
          </div>
          <div className ='accountInfo-mark'>
            <i className="far fa-bookmark"></i>
            <p>Thẻ đánh dấu</p>
          </div>
          <div className ='accountInfo-invite'>
            <i className="fas fa-user-friends"></i>
            <p>Mời bạn</p>
          </div>
          <div className ='accountInfo-manage'>Quản lý</div>
          <div className ='accountInfo-appli'>
            <i className="far fa-user"></i>
            <p>Hồ sơ Skype</p>
          </div>
          <div className ='accountInfo-phone-call'>
              <i class="fab fa-phoenix-framework"></i>
              <div className ='accountInfo-phone-text'>
                <p className = 'accountInfo-phonenumber'>Skype tới điện thoại</p>
                <p className = 'accountInfo-phone-fee'>Gọi điện với cước phí thấp</p>
              </div>
          </div>
          <div className ='accountInfo-phone-call'>
              <i class="fas fa-phone-volume"></i>
              <div className ='accountInfo-phone-text'>
                <p className = 'accountInfo-phonenumber'>Số Skype</p>
                <p className = 'accountInfo-phone-fee'>Nhập số thứ hai</p>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
  
export default accountInfo