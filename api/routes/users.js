import express from 'express';
import User from '../models/User.js';
import Profile from '../models/Profile.js'
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const router = express.Router();

const { ObjectId } = mongoose.Types;

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


//get all display names
router.get('/usr/display-names', async (req, res) => {
    try {   
        const users = await User.find({}, 'display_name -_id');
        const names = users.map(user => user.display_name);
        res.json(names);
    } catch (error) {
        console.error('Error fetching nicknames:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

////////FOLLOWERS

////get followers data 
//followers status array
router.get('/usr/followers/status', async (req, res) => {
    try {
        console.log("decoding1..")
        const user = await User.findOne({username: req.query.username});
        const followers = user.followers;
        const stati = followers.map(follower => follower.status);
        res.json(stati);
    } catch (error) {
        console.error('Error fetching follower status:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

//followers id array
router.get('/usr/followers/id', async (req, res) => {
    try {
        console.log("decoding2..")

        const user = await User.findOne({username: req.query.username});
        const followers = user.followers;
        const id = followers.map(follower => follower.followerID);
        res.json(id);
    } catch (error) {
        console.error('Error fetching follower ids:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

//followers decoded usernames
//{_id: ObjectId("666226ab7db1d52a5a4246b0")}
router.get('/usr/followers/usernames', async (req, res) => {
    try {
        console.log("decoding3..")
        const user = await User.findOne({username: req.query.username});
        const followers = user.followers;
        const ids = followers.map(follower => follower.followerID);

        const objectIDs = ids.map(id => {
            if (ObjectId.isValid(id)) {
            return new ObjectId(id);
            } else {
            throw new Error(`Invalid ID: ${id}`);
            }
        });
        const users = await User.find({ _id: { $in: objectIDs } }, 'username');
        const usernames = users.map(user => user.username);

        res.json(usernames);
    } catch (error) {
        console.error('Error fetching follower usernames:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

//followers decoded profile photos
router.get('/usr/followers/photos', async (req, res) => {
    try {
        console.log("decoding4..")
        const user = await User.findOne({username: req.query.username});
        const followers = user.followers;
        const ids = followers.map(follower => follower.followerID);

        const objectIDs = ids.map(id => {
            if (ObjectId.isValid(id)) {
            return new ObjectId(id);
            } else {
            throw new Error(`Invalid ID: ${id}`);
            }
        });
        const users = await User.find({ _id: { $in: objectIDs } }, 'profilePhoto');
        const profPhotos = users.map(user => user.profilePhoto);

        // profPhotos.forEach(function(entry) {
        //     console.log(entry)  
        // });

        res.json(profPhotos);
    } catch (error) {
        console.error('Error fetching follower profile photos:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

//get suggested people's object ids
router.get('/usr/followers/suggested', async (req, res) => {
    try {
        console.log("decoding5..")
        const user = await User.findOne({username: req.query.username});
        const followers = user.followers;
        const ids = followers.map(follower => follower.followerID);

        const objectIDs = ids.map(id => {
            if (ObjectId.isValid(id)) {
            return new ObjectId(id);
            } else {
            throw new Error(`Invalid ID: ${id}`);
            }
        });

        //don't suggest your own ID
        objectIDs.push(user.id)

        const users = await User.find({ _id: { $nin: objectIDs } }, 'username');
        const suggested = users.map(user => user.id);

        suggested.forEach(function(entry) {
            console.log(entry)  
        });

        res.json(suggested);
    } catch (error) {
        console.error('Error fetching suggested:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});




export default router;

