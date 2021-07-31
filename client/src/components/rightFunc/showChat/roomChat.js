import React, { useState, useEffect } from "react";
import '../rightFunc.css'
import Message from './message';
import socketIOClient from "socket.io-client";
const ENDPOINT ="http://127.0.0.1:8080"


function  RoomChat() {
  
    const socket = socketIOClient(ENDPOINT);
    socket.on("xin", data => {
      console.log(data);
    });

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
                    <div className = 'roomchat-left-numberuser'>
                      <p>
                        {romchat.users.length} người dự
                      </p>
                    </div>
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
                <i className="fas fa-video nav-icon"></i>
                <i className="fas fa-phone-alt nav-icon"></i>
                <i className="fas fa-user-plus nav-icon"></i>
              </div>
          </div>
          <div className = 'roomchat-message'>
            <Message messageLeft ={true}/>
            <Message messageLeft ={false}/>
            <Message messageLeft ={true}/>
            <Message messageLeft ={false}/>
            <Message messageLeft ={true}/>
            <Message messageLeft ={false}/>
            <Message messageLeft ={true}/>
            <Message messageLeft ={false}/>
          </div>
          <div className = 'roomchat-newmessage'>
            <div className = 'newmessage-left'>
              <i className="far fa-grin-hearts"></i>
              <input type= 'text' placeholder = 'Nhập tin nhắn' ></input>

            </div>
              <div className = 'newmessage-right'>
                <i className="far fa-file-image"></i>
                <i className="far fa-address-card"></i>
                <i className="fas fa-microphone-alt"></i>
                <i className="fas fa-ellipsis-h"></i>
              </div>
          </div>
      </div>
    </div>
  );
}
  
export default RoomChat