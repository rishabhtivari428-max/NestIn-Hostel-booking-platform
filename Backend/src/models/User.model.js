import mongoose from 'mongoose'

const UserSchema = mongoose.Schema({
    Username:{
        type: String,
        required: [true, "Username is required"]
    },
    email:{
        type: String,
        required: [true, "E-Mail is required"] ,
        unique: true
    },
    password:{
        type: String,
        required: [true, "Password is required"] 
    },
    phone:{
        type: String,
        required: [true, "Phone number is required"]
    },
    gender:{
        type: String,
        enum: ["Male", "Female"]
    },
    role:{
        type: String,
        enum: ["Student", "Owner", "Admin"],
        required: true
    }
}, {timestamps: true});

UserSchema.virtual('name').get(function() {
    return this.Username;
});

UserSchema.set('toObject', { virtuals: true });
UserSchema.set('toJSON', { virtuals: true });

const UserModel = mongoose.model("Users", UserSchema)

export default UserModel