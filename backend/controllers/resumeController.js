import Resume from '../models/resumeModel.js';
import fs from 'fs';
import path from 'path';

// CREATE FUNCTION

export const createResume = async (req, res) => {
    try {
        const userId = req.user.id;
        const {title} = req.body;

    // **Create a new instance**
    const newResume = new Resume({
      userId,
      title,
    });

    // **Save the instance**
    const savedResume = await newResume.save();

    res.status(201).json({message: 'Resume created successfully' ,savedResume});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'failed to createresume', error: error.message });
  }
};


//GET FUNCTION
export const getAllResumes = async (req, res) => {
    try{
        const resumes = await Resume.find({ userid: req.user.id }).sort({ updatedAt: -1 });
        res.json(resumes);
    }
        catch (error) {
        res.status(500).json({ message: 'failed to get resume', error: error.message });
    }
}


//GET RESUME BY ID
export const getResumeById = async (req, res) => {
    try{
        const userId = req.user.id;
        const resumeId = req.params.id;
        const resume = await Resume.findOne({ userId, _id: resumeId });

        if(!resume){
            return res.status(404).json({ message: 'Resume not found' });
        }

        resume._v = undefined; // EXCLUDE __V FIELD
        resume.createdAt = undefined; // EXCLUDE createdAt FIELD
        resume.updatedAt = undefined; // EXCLUDE updatedAt FIELD


        return res.status(200).json(resume);
    }
    catch (error) {
        res.status(500).json({ message: 'failed to get resume by id', error: error.message });
    }
}


// UPDATE FUNCTION
export const updateResume = async (req, res) => {
    try{
        const userId = req.user.id;
        const {resumeId, resumeData,resumeBackground} = req.params.id;
        const image = req.file;

        let resumeDataCopy = JSON.parse(resumeData);
        const updatedResume = await Resume.findOneAndUpdate(
            { userId, _id: resumeId }, resumeDataCopy, { new: true })
            if(!updatedResume){
                return res.status(404).json({ message: 'Resume not found or not authorized' });
    }
       // MERGE THE EXISTING DATA WITH THE NEW DATA
       Object.assign(updatedResume, req.body);
       // SAVE THE UPDATED RESUMES
       const savedResume = await updatedResume.save();
         res.json(savedResume);
}
    catch (error) {
        res.status(500).json({ message: 'failed to update resume', error: error.message });
    }
}

// DELETE FUNCTION
export const deleteResume = async (req, res) => {
    try{
        const deletedResume = await Resume.findOne({ _id: req.params.id, userid: req.user.id });
        if(!deletedResume){
            return res.status(404).status({ message: 'Resume not found or not authorized' });
        }

    // CREATE A UPLOADS FOLDER AND STOR THE RESUME THERE
    const uplaodsFolder = path.join(process.cwd(), 'uploads');

    // DELETE THUMBNAIL IF IT EXISTS
    if(deletedResume.thumbnailLink){
        const oldthumbnail = path.join(uplaodsFolder, path.basename(deletedResume.thumbnailLink));
        if(fs.existsSync(oldthumbnail)){
            fs.unlinkSync(oldthumbnail);
        }

        if(resume.profileInfo?.profilepreviewUrl){
            const oldProfilePic = path.join(uplaodsFolder, path.basename(deletedResume.profileInfo.profilepreviewUrl));
            if(fs.existsSync(oldProfilePic)){
                fs.unlinkSync(oldProfilePic);
            }

    // DELETE THE RESUME   
    const deleted = await Resume.findOneAndDelete({ _id: req.params.id, userid: req.user.id });
    if(!deleted){
        return res.status(404).json({ message: 'Resume not found or not authorized' });
    }
    res.json({ message: 'Resume deleted successfully', deleted });     

    }
}
    }
    catch (error) {
        res.status(500).json({ message: 'failed to delete resume', error: error.message });
    }
}


//get rsume by public id
export const getPublicResumeById = async (req, res) => {
    try{
        const resumeId = req.params.id;
        const resume = await Resume.findOne({ _id: resumeId, public: true });

        if(!resume){
            return res.status(404).json({ message: 'Resume not found or not public' });
        }       
        return res.status(200).json(resume);
    }
    catch (error) {
        res.status(500).json({ message: 'failed to get public resume by id', error: error.message });
    }
}


    