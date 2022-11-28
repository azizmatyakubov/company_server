import express from 'express';
import dotenv from 'dotenv';

import { connectDB } from './config/db.js';



const app = express();

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();


const PORT = process.env.PORT || 5000;

app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);


