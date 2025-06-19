import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import cookieParser from 'cookie-parser';   

dotenv.config();

const app = express();
app.use(cors({
    origin:'http://localhost:5173',
    credentials: true, // This allows cookies to be sent with requests
}));
app.use(cookieParser());
app.use(express.json());
app.use("/", authRoutes);
app.use('/', userRoutes);

mongoose
.connect(process.env.MONGO_URL)
.then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT || 5000,() => console.log(`Server is running on port ${process.env.PORT || 5000 }`));
})
.catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});


