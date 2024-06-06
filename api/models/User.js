import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    display_name: { type: String, required: true },
    title: { type: String, required: true }
    profilePhoto: { type: String, default: `https://${process.env.S3_BUCKET}.s3.${process.env.REGION}.amazonaws.com/dog.jpg`}
});

const User = mongoose.model('User', userSchema);

export default User;