import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import usersRouter from './routes/users.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const dbURI = "mongodb+srv://admin:admin@cluster0.gupgvul.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MongoDB connected...");

        // Routes
        app.use("/api/users", usersRouter);

        // Start the server
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => console.error("Error connecting to MongoDB:", err));