import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const followerSchema = new mongoose.Schema({
    followerID: {type: String, default: ""},
    status: {type: Number, default: -1}
});

const userSchema = new mongoose.Schema({

    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePhoto: { type: String, default: `https://${process.env.S3_BUCKET}.s3.${process.env.REGION}.amazonaws.com/dog.jpg`},
    comments: { type: [mongoose.Schema.Types.ObjectId], default: []},
    followers: {type: [followerSchema]}
});


const User = mongoose.model('User', userSchema);

export default User;