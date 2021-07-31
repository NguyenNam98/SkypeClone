const express = require('express')
const app = express()
const bodyParser = require('body-parser')
var cors = require('cors')
const dotenv = require('dotenv')
const httpServer = require("http").createServer(app);
dotenv.config();
const ClientEndPoint = process.env.CLIENT_ENDPOINT
const port = process.env.PORT || 8080
const io = require("socket.io")(httpServer, {
  cors: {
    origin: ClientEndPoint ,
    methods: ["GET", "POST"]
  }
});

app.use(cors())

const userRoute = require('./routes/users.route')
const messageRoute = require('./routes/messages.route')
const groupRoute = require('./routes/groups.route')

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/',(req,res)=>{
  res.send('helooo')
})

io.on('connection',async (socket)=>{
  socket.emit("xin","chao")
})

app.use('/user',userRoute)
app.use('/message',messageRoute)
app.use('/group', groupRoute)


httpServer.listen(port);