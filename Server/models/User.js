import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstname : {
        type: String,
        required: [true, 'First name is required'],
        trim: true
    },
    lastname : {
        type: String,
        required: [true, 'Last name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long']
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
});


 const User = mongoose.model('User',userSchema);
 export default User;