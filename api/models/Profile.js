import mongoose from 'mongoose';

const ratingSchema = new mongoose.Schema({
    stars: { type: Number, required: true, min: 1, max: 5},
    username: { type: String, required: true}
})

const profileSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true},
    ratings: { type: [ratingSchema], default: [] }
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