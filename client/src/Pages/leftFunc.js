import React from 'react'
import UserInfomation from '../components/leftFunc/userInfo'
import Search from '../components/leftFunc/search';
import './pages.css'

function leftFunc () {
    return (
      <div className="leftfunc">
          <UserInfomation/>
          <Search/>
      </div>
    );
}
  
export default leftFunc 