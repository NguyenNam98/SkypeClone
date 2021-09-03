import React,{useEffect, useState} from 'react';
import '../rightFunc.css'
import Avatar from 'react-avatar'
import Axios from 'axios'
const host = process.env.REACT_APP_HOST
const port = process.env.REACT_APP_PORT || 8080

function AddUserToGroup(props) {
  const idGroup = props.idCurrentRoom
  const [usersSuggested, setUserSuggested] = useState([])
  const [userSearch, setUserSearch] = useState('')
  const [tempAddUser, settempAddUser] = useState([])

  const handleSearch = (e)=>{
    // e.preventDefault();
    setUserSearch(e.target.value)
  }
  const handleTempAddUser = (id)=>{
    // console.log(tempAddUser.includes(id))
    usersSuggested.forEach(item =>{
      if(item.id === id && !tempAddUser.includes(item)){
        settempAddUser(tempAddUser => [...tempAddUser,item])
      }
    })
  }
  const sendAddListMember =()=>{
    let ids = []
    tempAddUser.forEach(item =>{
      ids.push(item.id)
    })
    let data = {
      ids
    }
    Axios.post(`http://${host}:${port}/group/addListMember/${idGroup}`, data).then(res =>{
      let newMembers =[]
      usersSuggested.forEach(item =>{
        data.ids.forEach(temp =>{
          if(item.id === temp){
            newMembers.push(item)
          }
        })
      })
      props.funcSetAddedUser(newMembers)
      setTimeout(()=>{
        props.setCloseAddUser()
      }, 3000)
      alert('Successfull adding new member !')
    })
  
  }

  const avatarConfig = {
    round :true,
    size : '36px',
    color: 'rgb(229, 228, 232)',
    fgColor :'rgb(0, 120, 212)'
  }
  useEffect(() => {
    Axios.get(`http://${host}:${port}/user/search/relatedUser/${idGroup}`).then(res =>{
      setUserSuggested(res.data)
    })
    
  }, [])
  return (
      <div className= 'add-user'>
        <div className ='add-user-over' onClick ={props.setCloseAddUser}></div>
        <div className =' add-user-container'>
          <div className ='add-user-header'>
            <i className="fas fa-times" onClick ={props.setCloseAddUser}></i>
            <div className ='add-user-title'>Add to group</div>
          </div>
          <div className ='add-user-search'>
            <i className="fas fa-search"></i>
            <input type='text'
              placeholder ='Search people or bot'
              value ={userSearch}
              onChange ={handleSearch}
            />
          </div>
          {
            tempAddUser && 
            <div className = 'add-user-temp'>
              {
                tempAddUser.map(item =>{
              
                  return(
                    <div key={item.id}>
                    <Avatar {...avatarConfig} name = {item.username} />
                    </div>
                  )
                })
              }
            </div>
          }
          <div className ='add-user-suggest'>
            <p className ='add-user-suggest-title'>Suggested</p>
            <div className ='add-user-suggest-list'>
              {
                usersSuggested.map(item =>{
               
                  return (
                    <div 
                      className ='add-user-user' 
                      key ={item.id}
                      id = {item.id}
                      onClick={()=>handleTempAddUser(item.id)}
                     >
                      <Avatar {...avatarConfig} name = {item.username}/>
                      <div className ='add-user-info'>
                        <div className ='add-user-info-name'>{item.username}</div>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
          <div className ='add-user-btn' onClick ={sendAddListMember}>
            <div className ='add-user-btn-text'>Done</div>
          </div>
        </div>
      </div>
  )
  
}
  
export default AddUserToGroup