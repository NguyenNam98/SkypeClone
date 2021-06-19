import React from 'react'
import '../rightFunc.css'
// import Avatar from 'react-avatar'
// import avatarLink from '../../../public/avatar/avatar-test.jpg'

function roomChat() {
    // let avatarConfig = {
    //     round :true,
    //     size : '120px',
    // }
    const romchat ={
        id:1, roomName:'Chợ tám xuyên 24/24',
        users :[
            { id :'1', username:'nguyennam',
            messages:[
                {message:'anh đang lam gì thế?', time:'11:35 AM'},
                {message:'anh đang lam gì thế?', time:'11:38 AM'},
                {message:'anh đang lam gì thế?', time:'11:40 AM'},
                ]
            },
            { id :'2', username:'nguyen',
            messages:[
                {message:'anh đang lam gì thế?', time:'11:36 AM'},
                {message:'anh đang lam gì thế?', time:'11:39 AM'},
                {message:'anh đang lam gì thế?', time:'11:42 AM'},
                ]
            },
        ]
    }
  return (
    <div className = 'roomchat'>
      <div className = 'roomchat-container'>
            <div className = 'roomchat-navbar'>
              <div className = 'roomchat-navbar-left'>
                <div className = 'roomchat-left-name'>{romchat.roomName}</div>
                <div className = 'roomchat-left-info'>
                    <div className = 'roomchat-left-numberuser'>{romchat.users.length} người dự</div>
                    <div className = 'roomchat-left-library'>
                        <i className="far fa-images"></i>
                        <p>Thư viện</p>
                    </div>
                    <div className = 'roomchat-left-search'>
                        <i className="fas fa-search"></i>
                        <p>tìm kiếm</p>
                    </div>
                </div>
              </div>
              <div className = 'roomchat-navbar-right'>
                <i className="fas fa-video"></i>
                <i className="fas fa-phone-alt"></i>
                <i className="fas fa-user-plus"></i>
              </div>
          </div>
          <div className = 'roomchat-message'></div>
          <div className = 'roomchat-newmessage'>
             <i className="far fa-grin-hearts"></i>
             <input type= 'text' placeholder = 'Nhập tin nhắn'></input>
             <i className="far fa-file-image"></i>
             <i className="far fa-address-card"></i>
             <i className="fas fa-microphone-alt"></i>
          </div>
      </div>
    </div>
  );
}
  
export default roomChat