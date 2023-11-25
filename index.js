import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import dbConnect from './Database/dbconfig.js'
import router from './Routers/user.router.js'
// import schedule  from 'node-schedule' 
import cron from 'node-cron'
import { generateAndStoreRandomColor } from './Controllers/user.controller.js'


const app = express()

dotenv.config()
const PORT = process.env.PORT


app.use(cors())
app.use(express.json())


dbConnect();



    cron.schedule('0 0 0 * * *', () => {
        generateAndStoreRandomColor();
    }, {
        timezone: 'Asia/Kolkata'
    });

   
    




app.use('/api/user',router)

app.listen(PORT,()=>{
    console.log('The app is listening with PORT:',PORT); 
     
})