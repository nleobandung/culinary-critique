import express from 'express';
import Profile from '../models/Profile.js'

const router = express.Router();

router.post('/count', async (req, res) => {
    try {
        const { name } = req.body;
        const profile = await Profile.findOne({ name });

        if (!profile) {
            return res.status(404).json({ message: 'Profile not found'});
        }

        res.json({ numberOfRatings: profile.numberOfRatings });
    } catch {
        console.error('Error fetching number of ratings:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/create', async (req, res) => {
    try {
        const { name } = req.body;

        const existingProfile = await Profile.findOne({ name });

        if (existingProfile) {
            return res.status(400).json({ message: 'Profile with this name already exists' });
        }

        const newProfile = new Profile({
            name
        });

        await newProfile.save();
        res.status(201).json({ message: 'Profile created successfully' });
    } catch (error) {
        console.error('Error creating profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/rate', async (req, res) => {
    try {
        const { name, stars, username} = req.body;

        const profile = await Profile.findOne({ name });

        if (!profile) {
            return res.status(404).json({ message: 'Profile not found'});
        }

        const existingRating = profile.ratings.find(rating => rating.username === username);

        if (existingRating) {
            existingRating.stars = stars;
        } else {
            profile.ratings.push({ stars, username});
        }

        await profile.save();
        res.json({
            message: 'Rating added successfully',
            numberOfRatings: profile.numberOfRatings
        });

    } catch (error) {
        console.error('Error adding rating:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;