import mongoose from "mongoose"; 


const resumeSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
          required: true },

          title: {
            type: String,
            required: true
          },
          thumbnail: { type: String

           },
           template: { type: String,
            
            default: 'modern'
            },
            colorPalette: {
                type: String,
                default: 'blue'
            },
    personalInfo: {
        name: { type: String,
            required:true },
            email: { type: String,
                 required:true },
            phone: { type: String,
        }
    },
    contactInfo: {
        address: { type: String },
        linkedin: { type: String },
        github: { type: String },
        website: { type: String }
    },
    summary: { type: String },

    education: [
        {
            institution: { type: String },
            degree: { type: String },
            fieldofStudy: { type: String },
            StartDate: { type: String },
            endDate: { type: String },
            grade: { type: String },
            description: { type: String }
        }
    ],

    skills: [
        {
            name: { type: String }
        }
    ],

    projects: [
        {
            title: { type: String },
            link: { type: String },
            description: { type: String }
        }
    ],

    certifications: [
        {
            title: { type: String },   
            issuer: { type: String },
            date: { type: String },
            description: { type: String }
        }
    ],

    languages: [
        {
            name: { type: String },
            proficiency: { type: String }
        }
    ],

    workexperience: [
        {
            company: { type: String }, 
            position: { type: String },
            startDate: { type: String },
            endDate: { type: String },
            responsibilities: { type: String }
        }
    ],

    hobbies: [
        {
            name: { type: String }
        }
    ],

    references: [
        {
            name: { type: String }, 
            contactInfo: { type: String },
            relationship: { type: String }
        }
    ]
}, { timestamps: { createdAt: 'createdAt' , updatedAt: 'updatedAt'} });

const Resume = mongoose.model('Resume', resumeSchema);
export default Resume;

