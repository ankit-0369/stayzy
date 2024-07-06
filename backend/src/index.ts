import express, {Request, Response} from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectionDB from './db/index'
import userRoutes from './routes/user.routes'
import authRoutes from './routes/auth.routes'
import myHotelRoutes from './routes/my-hotel.routes'
import cookieParser from 'cookie-parser'
import path from 'path'

const app= express()
app.use(express.json())
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))

app.use(express.static(path.join(__dirname, "../../frontend/dist")))

app.use(cookieParser());
app.use(express.urlencoded({extended: true}))
app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/my-hotels', myHotelRoutes)
app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
  });
  

app.get('/', (req, res)=>{
    
    res.status(200).json({message: 'Hello'})
})

app.post('/', (req, res)=>{
    console.log(req.body);
    res.status(200).json({message: 'OK response'});
})
app.get('/api/test', async(req:Request, res:Response)=>{
    
    res.json({
        message: 'api test from epress server'
    })
})

const port= process.env.PORT || 3000
connectionDB()
    .then(()=>{
        app.listen(port, ()=>{
            console.log('app is running on', port);
        })

        app.on('error', (error)=>{
            console.log('DB connected successfully. something went wrong while listening', error);
        })
    })
    .catch((err)=>{
        console.log('DB connection error :: ', err)
    })
