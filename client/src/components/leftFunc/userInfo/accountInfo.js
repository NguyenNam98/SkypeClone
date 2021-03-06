import React, {useState, useContext} from 'react'
import '../leftFunc.css'
import Avatar from 'react-avatar'
import avatarLink from '../../../public/avatar/avatar-test.jpg'
import ShareStory from './shareStory'
import {UserContext} from '../../../context/user.context'

function AccountInfo(props) {
  // const userInfo ={username :'Nguyễn Nam', gmail :'16522665@gmail.com.vn'}

  const [ accountStatus, setAccountStatus] = useState(false)
  const closeAccountStatus =() => 
  { 
    setAccountStatus(accountStatus => !accountStatus)
  }
  const { userInfo} = useContext(UserContext)
  const {username, gmail} = userInfo

  const [numberStatus, setNumberStatus] = useState(1)
  const [shareStory, setShareStory] = useState(false)
  const closeShareStory = ()=>{setShareStory(shareStory => !shareStory)}
  let avatarConfig = {
    round :true,
    size : '68px'
  }
  return (
    <div className = 'accountInfo'>
      <div className = 'accountInfo-over'  onClick={props.setCloseAccountInfo}></div>
      <div className = 'accountInfo-container'>
        {shareStory===true && <ShareStory shareStory ={shareStory} closeShareStory={closeShareStory}/>}
        { shareStory === false &&
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
                      <div className = 'accountInfo-user-name'>{username}</div>
                      <div className = 'accountInfo-user-gmail'>{gmail}</div>
                      <a href='https://account.microsoft.com/'>Tài khoản microsoft của tôi</a>
                  </div>
              </div>
              <div className ='accountInfo-status'>
                  {
                    accountStatus === true &&
                      <div className='status-dropdown'>
                        <div className = 'status-dropdown-container'onClick ={closeAccountStatus} >
                          <div className ='status-dropdown-item'
                                onClick = {()=>setNumberStatus(1)}
                                
                          >
                            <p>Đang hoạt động</p>
                            {numberStatus===1 &&<i className="fas fa-check"></i> }
                          </div>
                          <div className ='status-dropdown-item'
                              onClick = {()=>setNumberStatus(2)}
                            
                          >
                            <p> Vắng mặt </p>
                            {numberStatus===2 &&<i className="fas fa-check"></i> }
                          </div>
                          <div className ='status-dropdown-item'
                              onClick = {()=>setNumberStatus(3)}
                            
                          >
                            <p> Đừng làm phiền </p>
                            {numberStatus===3 &&<i className="fas fa-check"></i> }
                          </div>
                          <div className ='status-dropdown-item' 
                              onClick = {()=>setNumberStatus(4)}
                          >
                            <p>Ẩn</p>
                            {numberStatus===4 &&<i className="fas fa-check"></i> }
                          </div>
                        </div>
                      </div>
                    
                  }
                  {
                    numberStatus ===1 &&
                    <div className ='account-status-item' onClick ={closeAccountStatus}>
                      <i className="fas fa-circle"></i>
                      <p>Đang hoạt động</p>
                    </div>
                  }
                  {
                    numberStatus ===2 &&
                    <div className ='account-status-item' onClick ={closeAccountStatus}>
                      <i className="fas fa-clock"></i>
                      <p>Vắng mặt</p>
                    </div>
                  }
                  {
                    numberStatus ===3 &&
                    <div className ='account-status-item' onClick ={closeAccountStatus}>
                      <i className="fas fa-ban"></i>
                      <p>Đừng làm phiền</p>
                    </div>
                  }
                  {
                    numberStatus ===4 &&
                    <div className ='account-status-item' onClick ={closeAccountStatus}>
                      <i className="far fa-stop-circle"></i>
                      <p>Ẩn</p>
                    </div>
                  }
                </div>
              <div className ='accountInfo-share'onClick ={closeShareStory}>
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
                  <i className="fab fa-phoenix-framework"></i>
                  <div className ='accountInfo-phone-text'>
                    <p className = 'accountInfo-phonenumber'>Skype tới điện thoại</p>
                    <p className = 'accountInfo-phone-fee'>Gọi điện với cước phí thấp</p>
                  </div>
              </div>
              <div className ='accountInfo-phone-call'>
                  <i className="fas fa-phone-volume"></i>
                  <div className ='accountInfo-phone-text'>
                    <p className = 'accountInfo-phonenumber'>Số Skype</p>
                    <p className = 'accountInfo-phone-fee'>Nhập số thứ hai</p>
                  </div>
              </div>
            </div>
          }
      </div>
    </div>
  );
}
  
export default AccountInfo