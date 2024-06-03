import express from 'express';
import Profile from '../models/Profile.js'

const router = express.Router();

router.get('/profile/:name', async (req, res) => {
    try {
      const { name } = req.params;

      const profile = await Profile.findOne({ name }).lean();
  
      if (!profile) {
        return res.status(404).json({ error: 'Profile not found' });
      }
  
      res.json(profile);
    } catch (error) {
      console.error('Error fetching profile:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/comments', async (req, res) => {
    try {
        const { profileName } = req.query;
        const comments = await Profile.findOne({ profileName });
        return comments.comments;
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

router.get('/profileNames', async (req, res) => {
    try {
        const profiles = await Profile.find();
        const names = profiles.map(profile => profile.name);
        res.json(names);
    } catch (error) {
        console.error('Error fetching profile names:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

router.get('/top5', async (req, res) => {
    try {
        const profiles = await Profile.find();

        if (!profiles || profiles.length === 0) {
            return res.status(404).json({ error: 'No profiles found' });
        }

        const sortedByRating = [...profiles].sort((a, b) => b.averageRating - a.averageRating);
        const sortedByPopularity = [...profiles].sort((a, b) => b.numberOfRatings - a.numberOfRatings);

        const top5Profiles = sortedByRating.slice(0, 5).map(profile => ({
            name: profile.name,
            averageRating: profile.averageRating.toFixed(2),
            numberOfRatings: profile.numberOfRatings
        }));

        const worst5Profiles = sortedByRating.slice(-5).reverse().map(profile => ({
            name: profile.name,
            averageRating: profile.averageRating.toFixed(2),
            numberOfRatings: profile.numberOfRatings
        }));

        const mostPopularProfiles = sortedByPopularity.slice(0, 5).map(profile => ({
            name: profile.name,
            averageRating: profile.averageRating.toFixed(2),
            numberOfRatings: profile.numberOfRatings
        }));

        res.json({ top5Profiles, worst5Profiles, mostPopularProfiles });

    } catch (error) {
        console.error('Error fetching profiles:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/profileInfo', async (req, res) => {
    try {
        const { name } = req.body;
        const profile = await Profile.findOne({ name });

        if (!profile) {
            return res.status(404).json({ message: 'Profile not found'});
        }

        res.json({ averageRating: profile.averageRating.toFixed(2), numberOfRatings: profile.numberOfRatings });
    } catch (error) {
        console.error('Error fetching profile info:', error);
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
            numberOfRatings: profile.numberOfRatings,
            averageRating: profile.averageRating.toFixed(2)
        });

    } catch (error) {
        console.error('Error adding rating:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;