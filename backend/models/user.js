// core modules
import mongoose from "mongoose";

// user schema for mongodb
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {    
        type: String,
        required: true,
        unique: true,       
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
    },
}
,{
    timestamps: true,
});

//export as userSchema as User mode
 const User = mongoose.model('User', userSchema);
export default User;
 