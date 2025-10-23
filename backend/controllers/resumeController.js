import Resume from '../models/resumeModel.js';
import fs from 'fs';
import path from 'path';

// CREATE FUNCTION

export const createResume = async (req, res) => {
    try {
        const {title} = req.body;

        //Default template
        const defaultResumeData ={
             

    personalInfo: {
        fullname:  '',
            email: '',
            phone: '',
    },
    contactInfo: {
        address: '',
        linkedin: '',
        github: '',
        website: ''
    },
    summary: '',

    education: [
        {
            institution: '',
            degree: '',
            fieldofStudy: '',
            StartDate: '',
            endDate: '',
            grade: '',
            description: ''
        }
    ],

    Skills: [
        {
            name: ''
        }
    ],

    projects: [
        {
            title: '',
            link: '',
            description: ''
        }
    ],

    certifications: [
        {
            title: '',   
            issuer: '',
            date: '',
            description: ''
        }
    ],

    languages: [
        {
            name: '',
            proficiency: ''
        }
    ],

    workexperience: [
        {
            company: '', 
            position: '',
            startDate: '',
            endDate: '',
            responsibilities: ''
        },
    ],

    hobbies: [
        {
            name: ''
        }
    ],

    references: [
        {
            name: '', 
            contactInfo: '',
            relationship: ''
        }
    ]
        };
     
    

    // **Create a new instance**
    const newResume = new Resume({
      user: req.user.id,
      title,
      ...defaultResumeData,
      ...req.body
    });

    // **Save the instance**
    const savedResume = await newResume.save();

    res.status(201).json(savedResume);
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
        const resume = await Resume.findOne({ _id: req.params.id,userId: req.user.id });

        if(!resume){
            return res.status(404).json({ message: 'Resume not found' });
        }
        res.json(resume);
    }
    catch (error) {
        res.status(500).json({ message: 'failed to get resume by id', error: error.message });
    }
}


// UPDATE FUNCTION
export const updateResume = async (req, res) => {
    try{
        const updatedResume = await Resume.findOneAndUpdate(
            { _id: req.params.id, userid: req.user.id })
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

    