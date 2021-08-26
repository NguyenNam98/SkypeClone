const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const httpServer = require("http").createServer(app);
const cookieParser = require('cookie-parser');
const authMiddleWare = require('./middlewares/auth.middleware')
const rndToken = require('rand-token')

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

io.on('connection', (socket)=>{
 socket.on('joinRoom', data =>{
    socket.on(data.idRoom, mess =>{
      let rndHash = rndToken.generate(10)
      let date = new Date()
      let dataMes = [
        userInfo = data.userInfo, 
        message = {
          text: mess.message,
          idUser: userInfo.idUser,
          timeCreated:date,
          idMessage: rndHash
        }
      ]
      io.emit(data.idRoom, dataMes)
    })
})

})

app.use('/user',userRoute)
app.use('/message',messageRoute)
app.use('/group',authMiddleWare.authMiddle, groupRoute)

httpServer.listen(port);