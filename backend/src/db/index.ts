import express from 'express'
import mongoose, { Mongoose } from 'mongoose'

const connectionDB= async (): Promise<void>=>{
    
    try {
        const connection: Mongoose = await mongoose.connect(process.env.MONGODB_URI as string);
        console.log(`Connection success. Connected port: ${connection.connection.port}`);
        console.log(`Connected host: ${connection.connection.host}`);
    } catch (error) {
        console.error('Error while connecting to the database', error);
    }
}

export default connectionDB