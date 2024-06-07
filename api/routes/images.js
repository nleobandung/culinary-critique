import express from 'express';
import AWS from 'aws-sdk';
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const upload = multer();

// AWS credentials
AWS.config.update({
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();

router.post('/upload', upload.single('image'), async (req, res) => {
    try {
        const file = req.file;

        if (!file) {
            return res.status(400).send('No file uploaded.');
        }

        const params = {
            Bucket: "culinary-critique",
            Key: file.originalname,
            Body: file.buffer,
        };

        s3.putObject(params, (err, data) => {
            if (err) {
                console.error('Error uploading file:', err);
                return res.status(500).send('Error uploading file');
            }

            res.status(200).send({
                message: 'File uploaded successfully', 
                fileName: file.originalname
            });
        });

    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;