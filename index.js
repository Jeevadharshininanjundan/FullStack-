import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", authRoutes);

mongoose
.connect(process.env.MONGO_URL)
.then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT || 5000,() => console.log(`Server is running on port ${process.env.PORT || 5000 }`));
})
.catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});


