import React from 'react'
import UserInfomation from '../components/leftFunc/userInfo'
import Search from '../components/leftFunc/search';
import Menu from '../components/leftFunc/menu';
import SelectionChat from '../components/leftFunc/selectionChat';
import './pages.css'

function leftFunc () {
    return (
      <div className="leftfunc">
          <UserInfomation/>
          <Search/>
          <Menu/>
          <SelectionChat/>
      </div>
    );
}
  
export default leftFunc 