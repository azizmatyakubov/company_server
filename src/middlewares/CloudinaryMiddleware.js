import { v2 as  cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';


export const cloudinaryUploader = multer({
    storage: new CloudinaryStorage({
        cloudinary: cloudinary,
        params: {
            folder: 'users',
            allowedFormats: ['jpg', 'png', 'jpeg'],
        },
    }),
}).single('avatar');
