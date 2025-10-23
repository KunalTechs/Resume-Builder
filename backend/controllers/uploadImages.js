import fs from 'fs';
import path from 'path';

import Resume from '../models/resumeModel.js';
import upload from '../middleware/uploadMiddleware.js';

// UPLOAD IMAGE FUNCTION

export const uploadResumeImages = (req, res) => {
    try{
        upload.fields([{ name: 'thumbnail'},{ name: 'profileImage' }])
        (req, res, async (err) => {
            if(err){
                return res.statusd(400).json({message:"File uplaod failed", error: err.message})
            }

            const resumeId = req.params.id;
            const resume = await Resume.finOne({ _id: resumeId, user: req.user.id })

            if(!resume){
                return res.status(404).json({message: 'Resume not found'});
            }

            // USE PROCESSING.CWD() TO GET THE ABSOLUTE PATH OF THE UPLOADS FOLDER
            const uploadsFolder = path.join(process.cwd(), 'uploads');
            const baseUrl = `${req.protocol}://${req.get('host')}`;

            const newThumbnail = req.files.thumbnail?.[0];
            const newProfileImage = req.files.profileImage?.[0];

            if(newThumbnail){
                const oldThumbnail = path.join(uploadsFolder, path.basename(resume.thumbnailLink));
                if(fs.existsSync(oldThumbnail)){
                    fs.unlinkSync(oldThumbnail);
                }
                resume.thumbnailLink = `${baseUrl}/uploads/${newThumbnail.filename}`;
            }


            if(newProfileImage){
                if(resume.profileInfo?.profilepreviewUrl){
                    const oldProfileImage = path.join(uploadsFolder, path.basename(resume.profileInfo.profilepreviewUrl));
                    if(fs.existsSync(oldProfileImage)){
                        fs.unlinkSync(oldProfileImage);
                    }
                    resume.profileInfo.profilepreviewUrl = `${baseUrl}/uploads/${newProfileImage.filename}`;

                }

                await resume.save();
                res.status(200).json({message: 'Image uploaded successfully', thumbnailLink: resume.thumbnailLink, profilepreviewUrl: resume.profileInfo?.profilepreviewUrl});
            }   

        })
    }
    catch(error){
        console.error('Error uploading image:', error);
        res.status(500).json({message: 'Failed to upload image', error: error.message});
    }
}
