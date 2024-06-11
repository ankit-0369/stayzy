import express, {Request, Response} from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectionDB from './db/index'
import userRoutes from './routes/user.routes'
import cookieParser from 'cookie-parser'

const app= express()
app.use(express.json())
app.use(cors())
app.use(cookieParser());
app.use(express.urlencoded({extended: true}))
app.use('/api/users', userRoutes)

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
