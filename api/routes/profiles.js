import express from 'express';
import Profile from '../models/Profile.js';
import User from '../models/User.js';
import Comment from '../models/Comment.js';

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

router.get('/userRating', async (req, res) => {
    try {
        const { username, profileName } = req.query;
        if (!username || !profileName) {
            return res.status(400).json({ error: 'Username and profileName are required' });
        }
        const profile = await Profile.findOne({ name: profileName });
        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }

        const userRating = profile.ratings.find(rating => rating.username === username);
        const rating = userRating ? userRating.stars : 0;

        res.status(200).json({ userRating: rating });
    } catch (error) {
        console.error('Error retrieving user rating:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/comments', async (req, res) => {
    try {
        const { profileName } = req.query;
        const profile = await Profile.findOne({ name: profileName });
        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }
        res.json(profile.comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/addComment', async (req, res) => {
    try {
        const { username, text } = req.body;
        const { profileName } = req.query;
        const profile = await Profile.findOne({ name: profileName });

        if (!profile) {
            return res.status(404).json({ message: 'Profile not found'});
        }

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const comment = new Comment({ username, text, profileName });
        profile.comments.push(comment);
        await profile.save();

        user.comments.push(comment._id);
        await user.save();

        res.json({
            message: 'Comment added successfully',
        });

    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/profileNamesImages', async (req, res) => {
    try {
        const profiles = await Profile.find({}, 'name imageLink');
        res.status(200).json(profiles);

    } catch (error) {
        console.error('Error fetching profile names and images:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/profileNames', async (req, res) => {
    try {
        const profiles = await Profile.find();
        const names = profiles.map(profile => profile.name);
        res.json(names);
    } catch (error) {
        console.error('Error fetching profile names:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

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

        res.json({ averageRating: profile.averageRating.toFixed(2), numberOfRatings: profile.numberOfRatings, imageLink: profile.imageLink });
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
            name: name
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