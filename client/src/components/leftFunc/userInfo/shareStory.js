import React ,{useState} from 'react'
import '../leftFunc.css'

function ShareStory (props) {
    const [emoij, setEmoij] = useState('far fa-smile-wink')
    const [input, setInput] = useState('')
 
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
            <input type='text' placeholder='Chia sẻ những gì bạn đang làm' value={input}
                onChange= {e => setInput(e.target.value)}
            ></input>
            <i className="far fa-times-circle"></i>
        </div>
        <div className ='sharestory-mention'>Được đề xuất</div>
        <div className ='sharestory-action'>
            <div className ='sharestory-action-item' 
                onClick ={()=>
                    {
                    setEmoij('far fa-grin-tears')
                    setInput('Đang họp')
                    }
            }>
                <i className="far fa-smile-wink"></i>
                <p id ='action'>Đang họp</p>
            </div>
            <div className ='sharestory-action-item'
            onClick ={()=>
                {
                setEmoij('far fa-smile-wink')
                setInput('Ở trường')
                }}
            >
                <i className="far fa-smile-wink"></i>
                <p>Ở trường</p>
            </div>
            <div className ='sharestory-action-item'
             onClick ={()=>
                {
                setEmoij('far fa-laugh-wink')
                setInput('Ở rạp chiếu phim')
                }}
            >
                <i className="far fa-laugh-wink"></i>
                <p>Ở rạp chiếu phim</p>
            </div>
            <div className ='sharestory-action-item'
              onClick ={()=>
                {
                setEmoij('far fa-grin-tears')
                setInput('Đang đi du lịch')
                }}
            >
                <i className="far fa-grin-tears"></i>
                <p>Đang đi du lịch</p>
            </div>
            <div className ='sharestory-action-item'
              onClick ={()=>
                {
                setEmoij('far fa-smile-wink')
                setInput('Đang kỉ niệm')
                }}
            >
                <i className="far fa-smile-wink"></i>
                <p>Đang kỉ niệm</p>
            </div>
            <div className ='sharestory-action-item'
             onClick ={()=>
                {
                setEmoij('far fa-smile-wink')
                setInput('Đang lái xe')
                }}
            >
                <i className="far fa-smile-wink"></i>
                <p>Đang lái xe</p>
            </div>
            <div className ='sharestory-action-item'
             onClick ={()=>
                {
                setEmoij('far fa-grin-beam-sweat')
                setInput('Đang làm việc tại nhà')
                }}
            >
                <i className="far fa-grin-beam-sweat"></i>
                <p>Đang làm việc tại nhà</p>
            </div>
            <div className ='sharestory-action-item'
             onClick ={()=>
                {
                setEmoij('far fa-grin-beam-sweat')
                setInput('Đang ở phòng thể hình')
                }}
            >
                <i className="far fa-smile-wink"></i>
                <p>Đang ở phòng thể hình</p>
            </div>
            <div className ='sharestory-action-item'
             onClick ={()=>
                {
                setEmoij('far fa-smile-wink')
                setInput('quay lại nha')
                }}
            >
                <i className="far fa-smile-wink"></i>
                <p>Quay lại nha</p>
            </div>
            <div className ='sharestory-action-item'
             onClick ={()=>
                {
                setEmoij('far fa-smile-wink')
                setInput('Đang ăn trưa')
                }}
            >
                <i className="far fa-smile-wink"></i>
                <p>Đang ăn trưa</p>
            </div>
        </div>
    </div>
  );
}
  
export default ShareStory