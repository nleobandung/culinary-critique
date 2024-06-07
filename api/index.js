import express from 'express';
import mongoose from 'mongoose';
import usersRouter from './routes/users.js';
import profilesRouter from './routes/profiles.js';
import imagesRouter from './routes/images.js'
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});
app.use(express.json());

// MongoDB connection
const dbURI = process.env.ATLAS_URI || "";

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MongoDB connected...");

        // Routes
        app.use("/users", usersRouter);

        app.use("/profiles", profilesRouter);

        app.use("/images", imagesRouter);

        app.get("/", (req, res) => {
            res.send("Server is running");
        });

        // Start the server
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => console.log(`*** Server running on port ${PORT} ***`));
    })
    .catch(err => console.error("Error connecting to MongoDB:", err));