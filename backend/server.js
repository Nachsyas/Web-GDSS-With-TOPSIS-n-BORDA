const express=require('express')
const dotenv=require('dotenv')
const mongoose=require('mongoose')
const cookieParser=require('cookie-parser')
const userRouter=require('./routes/user')
const authRouter=require('./routes/auth')
const { authenticateToken } = require('./controllers/authController')

dotenv.config()
const app=express()

app.use(cookieParser())
app.use(express.json())

const MONGO_URL=process.env.MONGO_URL
mongoose.connect(MONGO_URL).then(()=>{
    console.log('Connected to MongoDB');
}).catch((e)=>{
    console.error('Failed to connect to MongoDB',e);
})

const port=process.env.PORT
app.listen(port,()=>{
    console.log("App Running")
})

app.get('/',authenticateToken,(req,res)=>{
    res.send("Server is running")
})
app.use('/user',authenticateToken,userRouter)
app.use('/auth',authRouter)