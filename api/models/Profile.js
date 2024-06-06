import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const ratingSchema = new mongoose.Schema({
    stars: { type: Number, required: true, min: 1, max: 5},
    username: { type: String, required: true}
})

const commentSchema = new mongoose.Schema({
    username: { type: String, required: true },
    text: { type: String, required: true },
    date: { type: Date, default: Date.now }
})

const profileSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true},
    imageLink: { type: String, default: `https://${process.env.S3_BUCKET}.s3.${process.env.REGION}.amazonaws.com/dog.jpg`},
    ratings: { type: [ratingSchema], default: [] },
    comments: { type: [commentSchema], default: [] }
});

profileSchema.virtual('numberOfRatings').get(function() {
    return this.ratings.length;
});

profileSchema.virtual('averageRating').get(function() {
    if (this.ratings.length == 0)
        return 0;
    const totalStars = this.ratings.reduce((sum, rating) => sum + rating.stars, 0);
    return totalStars / this.ratings.length;
});

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;