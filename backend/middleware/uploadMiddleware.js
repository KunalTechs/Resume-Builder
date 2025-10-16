import multer from "multer";
import fs from "fs";
import path from "path";

// Ensure uploads folder exists
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// FILE FILTER TO ALLOW ONLY IMAGES

const fileFilter =(req,file,cb) => {
    const allowedtypes = ['image/jpeg','image/jpg','image/png'];
    if(allowedtypes.includes(file.mimetype)){
        cb(null,true);
    } else {
        cb(new Error('Only jpeg,jpg and png files are allowed'),false);
    }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

export const uploadThumbnail = upload.single('thumbnail');

export default upload;