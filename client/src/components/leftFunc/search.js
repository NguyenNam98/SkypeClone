import React from 'react'
import './leftFunc.css'

function search () {

  return (
    <div className = 'search'>
      <div className = 'search-container'>
        <div className = 'search-left'>
          <i className= "fas fa-search"></i>
          <input type = 'text' placeholder = 'Người,nhóm & tin nhắn'/>
        </div>
        <div className = 'search-right'>
            <i className ="far fa-keyboard"></i> 
        </div>
      </div>
    </div>
  );
}
  
export default search