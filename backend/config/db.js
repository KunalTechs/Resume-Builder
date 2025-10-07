import mongoose from "mongoose";


export const connectDB = async () => {
        await mongoose.connect('mongodb+srv://Kunal_user:Kunal123@cluster0.nydoot1.mongodb.net/Resume?retryWrites=true&w=majority'

        ).then (() => {
            console.log('MongoDB connected');
        }).catch((err) => {
            console.log('Error while connecting to MongoDB', err);
        });
    }