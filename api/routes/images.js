import express from 'express';
import { S3 } from '@aws-sdk/client-s3';
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const upload = multer();

const s3 = new S3({
    region: "us-west-1",
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
});

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