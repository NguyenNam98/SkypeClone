import React ,{useState} from 'react'
import '../leftFunc.css'

function ShareStory (props) {
    const [emoij, setEmoij] = useState('far fa-smile-wink')
    const [input, setInput] = useState('')
    const setAllInput = (emoijClass, text)=>{
        setEmoij(emoijClass)
        setInput(text)
    }
  return (
    <div className = 'share-story'>
        <div className ='sharestory-head'>
            <i className="fas fa-long-arrow-alt-left" onClick ={props.closeShareStory}></i>
            <div className= 'button-done'>
                Xong
            </div>
        </div>
      
        <div className ='sharestory-input-title'>Chia sẻ những việc bạn đang làm</div>
        <div className ='sharestory-input-text'>
            <i className={emoij}></i>
            <input type='text' placeholder='Chia sẻ những gì bạn đang làm' value ={input}></input>
            <i className="far fa-times-circle"></i>
        </div>
        <div className ='sharestory-mention'>Được đề xuất</div>
        <div className ='sharestory-action'>
            <div className ='sharestory-action-item' >
                <i className="far fa-smile-wink"></i>
                <p>Đang họp</p>
            </div>
            <div className ='sharestory-action-item' onClick ={setInput('shshsh')}>
                <i className="far fa-smile-wink"></i>
                <p>Ở trường</p>
            </div>
            <div className ='sharestory-action-item'>
                <i className="far fa-laugh-wink"></i>
                <p>Ở rạp chiếu phim</p>
            </div>
            <div className ='sharestory-action-item'>
                <i className="far fa-grin-tears"></i>
                <p>Đang đi du lịch</p>
            </div>
            <div className ='sharestory-action-item'>
                <i className="far fa-smile-wink"></i>
                <p>Đang kỉ niệm</p>
            </div>
            <div className ='sharestory-action-item'>
                <i className="far fa-smile-wink"></i>
                <p>Đang lái xe</p>
            </div>
            <div className ='sharestory-action-item'>
                <i className="far fa-grin-beam-sweat"></i>
                <p>Ở phòng tập thể hình</p>
            </div>
            <div className ='sharestory-action-item'>
                <i className="far fa-smile-wink"></i>
                <p>Đang làm việc tại nhà</p>
            </div>
            <div className ='sharestory-action-item'>
                <i className="far fa-smile-wink"></i>
                <p>Quay lại nha</p>
            </div>
            <div className ='sharestory-action-item'>
                <i className="far fa-smile-wink"></i>
                <p>Đang ăn trưa</p>
            </div>
        </div>
    </div>
  );
}
  
export default ShareStory