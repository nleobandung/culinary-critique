import express from 'express';
import User from '../models/User.js';
import Profile from '../models/Profile.js'
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Get comments
router.get('/get-comments', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.query.username });
        if (!user) {
            return res.status(400).json({ message: 'Username not found' });
        }

        const profiles = await Profile.find({ 'comments._id': { $in: user.comments } })
            .populate('comments', 'username text profileName date').exec();
        
        const allComments = profiles.flatMap(profile => profile.comments);
        const validCommentIds = user.comments.map(id => id.toString());
        const comments = allComments.filter(comment => validCommentIds.includes(comment._id.toString()));
        res.json({ comments });
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Get profile photo
router.get('/get-profile-photo', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.query.username });
        if (!user) {
            return res.status(400).json({ message: 'Username not found' });
        }

        res.json(user.profilePhoto);
    } catch (error) {
        console.error('Error fetching profile photo:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Change profile photo
router.post('/change-profile-photo', async (req, res) => {
    try {
        const { username, fileName } = req.body;
        const user = await User.findOne({ username: username });
        if (!user) {
            return res.status(400).json({ message: 'Username not found' });
        }
        user.profilePhoto = `https://culinary-critique.s3.us-west-1.amazonaws.com/${fileName}`;

        await user.save();
        res.status(200).json({ message: 'Profile photo successfully changed' });
    } catch (error) {
        console.error('Error changing profile photo:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Register a new user
router.post('/register', async (req, res) => {
    try {
        // Check if username already exists
        const existingUser = await User.findOne({ username: req.body.name });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Create new user
        const newUser = new User({
            username: req.body.name,
            password: hashedPassword
        });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        // Check if username exists
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        res.json({ message: 'Login successful' });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
