import React from 'react'
import UserInfomation from '../components/leftFunc/userInfo'
import Search from '../components/leftFunc/search';
import Menu from '../components/leftFunc/menu';
import SelectionChat from '../components/leftFunc/selectionChat';
import RecentlyChat from '../components/leftFunc/recentlyChat';
import Welcome from '../components/rightFunc/welcome/welcome'
import RoomChat from '../components/rightFunc/showChat/roomChat';
import './pages.css'

function leftFunc () {
    return (
      <div className = 'homepage'>
        <div className = 'homepage-container'>
          <div className="leftfunc">
              <UserInfomation/>
              <Search/>
              <Menu/>
              <SelectionChat/>
              <RecentlyChat/>
          </div>
          <div className ='rightfunc'>
              {/* < Welcome/> */}
              <RoomChat/>
          </div>

        </div>
      </div>
    );
}
  
export default leftFunc 