import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import dbConnect from './Database/dbconfig.js'
import router from './Routers/user.router.js'
import schedule from 'node-schedule'
// import cron from 'node-cron'
import { generateAndStoreRandomColor } from './Controllers/user.controller.js'


const app = express()

dotenv.config()
const PORT = process.env.PORT


app.use(cors())
app.use(express.json())


dbConnect();
schedule.scheduleJob('*/10 * * * * *', () => {
    generateAndStoreRandomColor();
});


app.get('/', (req, res) => {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();

    // Add leading zeros if needed
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    console.log(formattedTime);

    const frontend = `
        <div>
            <ul>
                <li>Frontend Link => <a href="https://project-name-frontend-six.vercel.app/">Click here </a></li>
                <li>time now ${formattedTime}</li>
            </ul>
        </div>
    `;
    res.send(`The Dress Suggestion app is working <br><br>${frontend}`);
});






app.use('/api/user', router)

app.listen(PORT, () => {
    
    console.log('The app is listening with PORT:', PORT);

})
