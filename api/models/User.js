import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePhoto: { type: String, default: `https://culinary-critique.s3.us-west-1.amazonaws.com/dog.jpg`},
    comments: { type: [mongoose.Schema.Types.ObjectId], default: []}
});

const User = mongoose.model('User', userSchema);

export default User;