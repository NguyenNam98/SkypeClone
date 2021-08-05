import React from 'react'
import './leftFunc.css'

function selectionChat() {

  return (
    <div className = 'selectionchat'>
      <div className = 'selectionchat-container'>
        <div className = 'selectionchat-item'>
            <i className="fas fa-video"></i>
            <p className ='selectionchat-text'>Cuộc họp</p>
            <i className="fas fa-angle-down"></i>
        </div>
        <div className = 'selectionchat-item'>
            <i className="far fa-edit"></i>
            <p className ='selectionchat-text'>Cuộc trò chuyện mới</p>
            <i className="fas fa-angle-down"></i>
        </div>
      </div>
    </div>
  );
}
  
export default selectionChat