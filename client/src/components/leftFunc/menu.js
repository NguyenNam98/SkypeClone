import React from 'react'
import './leftFunc.css'

function menu() {

  return (
    <div className = 'menu'>
      <div className = 'menu-container'>
        <div className = 'menu-item'>
            <i className = "far fa-comments"></i>
            <p>Trò chuyện</p>
        </div>
        <div className = 'menu-item'>
            <i className = "fas fa-phone-alt"></i>
            <p>Cuộc gọi</p>
        </div>
        <div className = 'menu-item'>
            <i className = "far fa-address-book"></i>
            <p>Danh bạ</p>
        </div>
        <div className = 'menu-item'>
            <i className = "far fa-bell"></i>
            <p>Thông báo</p>
        </div>
      </div>
    </div>
  );
}
  
export default menu