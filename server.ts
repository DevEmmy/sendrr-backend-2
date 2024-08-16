import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import corsOptions from './src/config/cors';
require("dotenv").config()
import * as http from "http";
import { Socket } from 'socket.io';
import { Sendrr, SocketData } from './src/interfaces/socketInterface';
import Container from 'typedi';
import DeviceService from './src/services/DeviceService';
import { initSocket } from './src/config/socket';
import userRoute from "./src/router/user-routes"
import authRoute from "./src/router/auth-routes"


const app = express();
app.use(cors({
  origin: "*"
}));

const server = http.createServer(app);
initSocket(server);


const port = String(process.env.PORT) || 3030;

// Set up your routes and middleware here

app.use(express.urlencoded({ limit: "50mb", extended: false }))
app.use(express.json({ limit: "50mb" }))

//Run MongoDB
mongoose.connect(process.env.MONGODB_URI || `mongodb://127.0.0.1:27017/sendrr-backend`)
const connection = mongoose.connection
connection.once('open', ()=>{console.log('Database running Successfully')});

//render the html file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});
app.use("/users", userRoute)
app.use("/auth", authRoute)


// Run Server
server.listen(port, () => {
  console.log(`Server running on port ${port}`);

});
