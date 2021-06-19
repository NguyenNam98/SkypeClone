import React from 'react'
import '../rightFunc.css'
import Avatar from 'react-avatar'
import avatarLink from '../../../public/avatar/avatar-test.jpg'

function recentlyChat() {
    const name = 'nguyen'
    let avatarConfig = {
        round :true,
        size : '120px',
      }
  return (
    <div className = 'welcome'>
      <div className = 'welcome-container'>
          <div className ='welcome-title'>
              Chào mừng {name} !
          </div>
          <div className ='welcome-avatar'>
            <Avatar {...avatarConfig} src = {avatarLink} />
          </div>
          <div className ='welcome-thinking'>
              <input type="text" placeholder='Cho bạn bè biết bạn đang làm gì'></input>
              <i className="fas fa-pencil-alt"></i>
          </div>
          <div className ='welcome-start'>
              <p className='welcome-text'>Bắt đầu cuộc trò chuyện</p>
          </div>
          <div className ='welcome-description'>
              Tìm kiếm người khác để bắt đầu cuộc trò chuyện hoặc truy cập danh bạ để xem những người đang trực tuyến.
          </div>
          <div className = 'welcome-notice'>
              Không phải bạn?
             <a href ='#1'>Kiểm tra tài khoản</a>
          </div>
      </div>
    </div>
  );
}
  
export default recentlyChat