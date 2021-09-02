const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const httpServer = require("http").createServer(app);
const cookieParser = require('cookie-parser');
const authMiddleWare = require('./middlewares/auth.middleware')
const rndToken = require('rand-token')

const database = require('./models/firebaseConnect')
var groups = database.db.collection('groups')
var users = database.db.collection('users')
var messages = database.db.collection('messages')

var cors = require('cors')

const dotenv = require('dotenv')
dotenv.config();

const ClientEndPoint = process.env.CLIENT_ENDPOINT
const port = process.env.PORT || 8080

const io = require("socket.io")(httpServer, {
  cors: {
    origin: ClientEndPoint ,
    methods: ["GET", "POST"]
  }
});

app.use(cors({
  credentials: true,
  origin:true
}))

const userRoute = require('./routes/users.route')
const messageRoute = require('./routes/messages.route')
const groupRoute = require('./routes/groups.route')
app.use(cookieParser('michael98'))

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const USER_JOIN_CHAT_EVENT = "USER_JOIN_CHAT_EVENT";
const USER_LEAVE_CHAT_EVENT = "USER_LEAVE_CHAT_EVENT";
const NEW_CHAT_MESSAGE_EVENT = "NEW_CHAT_MESSAGE_EVENT";
const START_TYPING_MESSAGE_EVENT = "START_TYPING_MESSAGE_EVENT";
const STOP_TYPING_MESSAGE_EVENT = "STOP_TYPING_MESSAGE_EVENT";

io.on('connection', (socket) => {
 
  const {idRoom, avatar, gmail, idUser, username} = socket.handshake.query

  socket.join(idRoom)
  socket.on(NEW_CHAT_MESSAGE_EVENT, async data => {
    const date = new Date()
    let  idMess = ''
    const message = {
          text: data.body,
          timeCreated:date,
          idUser: idUser,
          idGroup : idRoom
    }
    const userInfo ={
      avatar,
      gmail, 
      idUser, 
      username
    }
    await messages.add(message).then(mess =>{
              idMess = mess.id
               groups.doc(idRoom).update({
                   lastMessage : mess.id
              })
            })
    io.in(idRoom).emit(NEW_CHAT_MESSAGE_EVENT, {messageInfo:{...message, idMess}, userInfo})
  })
  socket.on("disconnect", () => {
    console.log(`${socket.id} disconnected`);
    socket.leave(idRoom);
  });
})

app.use('/user',authMiddleWare.authMiddle,userRoute)
app.use('/message',messageRoute)
app.use('/group',authMiddleWare.authMiddle, groupRoute)

httpServer.listen(port);