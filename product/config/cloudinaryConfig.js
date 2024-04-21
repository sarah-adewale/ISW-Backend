// cloudinaryConfig.js

import { v2 as cloudinary } from 'cloudinary';

function configureCloudinary() {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
        api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET
    });
}

export default configureCloudinary;
