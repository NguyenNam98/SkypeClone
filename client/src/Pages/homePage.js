
import UserInfomation from '../components/leftFunc/userInfo'
import Search from '../components/leftFunc/search';
import Menu from '../components/leftFunc/menu';
import SelectionChat from '../components/leftFunc/selectionChat';
import RecentlyChat from '../components/leftFunc/recentlyChat';
import Welcome from '../components/rightFunc/welcome/welcome'
import RoomChat from '../components/rightFunc/showChat/roomChat';
import './pages.css'

import Axios from 'axios'
import React,{useContext, useEffect} from 'react'
import {UserContext} from '../context/user.context'
import { withRouter } from "react-router-dom";

const host = process.env.REACT_APP_HOST
const port = process.env.REACT_APP_PORT || 8080

function HomePage (props) {
  Axios.defaults.withCredentials = true;
  const {userInfo, setUserInfo,firstPage,setToListGroups , listGroups} = useContext(UserContext)
  
  useEffect(() => {
        const interval = setInterval(() => {
            let data = {
                        refreshToken : localStorage.getItem('refresh_token')
                    }
            Axios.post(`http://${host}:${port}/user/auth/refreshToken`, data, {
                headers : {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    }
            }).then(res=>{
            }).catch(err =>{
                    setUserInfo({})
                    props.history.push('/login')
                    window.location.reload(false);
            })
        }, 1000*9*60);
        return () => clearInterval(interval);
      }, []);
    useEffect(() => {
      let data = {
          refreshToken : localStorage.getItem('refresh_token')
      }
      Axios.post(`http://${host}:${port}/user/auth/checkLogin`, data,{
          headers : {
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json',
              'Accept': 'application/json',
          }
      })
      .then((res) => {
          setUserInfo(res.data.userData)
          // props.history.push('/')
          // window.location.reload(false);  
      })
      .catch(err =>{
          setUserInfo({})
          props.history.push('/login')
          window.location.reload(false);
     })
    }, []);
    useEffect(() => {
      Axios.get(`http://${host}:${port}/group/listGroups`)
      .then((res) => {
        setToListGroups(res.data)
      })
      .catch(err =>{
        // props.history.push('/login')
        // window.location.reload(false);
     })
    }, []);

    return (
      <div className = 'homepage'>
        <div className = 'homepage-container'>
          <div className="leftfunc">
              <UserInfomation/>
              <Search/>
              <Menu/>
              <SelectionChat/>
              <RecentlyChat />
          </div>
          <div className ='rightfunc'>
            {
              firstPage === true &&
             < Welcome/> 
            }
            {
              firstPage === false &&
              <RoomChat/>
            }
          
              
          </div>

        </div>
      </div>
    );
}
  
export default withRouter(HomePage )