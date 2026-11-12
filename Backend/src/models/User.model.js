import mongoose from 'mongoose'

const UserSchema = mongoose.Schema({
    googleId: {
        type: String
    },
    Username: {
        type: String,
        required: [true, "Username is required"]
    },
    email: {
        type: String,
        required: [true, "E-Mail is required"],
        unique: true
    },
    password: {
        type: String
    },
    phone: {
        type: String
    },
    gender: {
        type: String,
        enum: ["Male", "Female"]
    },
    role: {
        type: String,
        enum: ["Student", "Owner", "Admin"],
        default: "Student",
        required: true
    },
    refreshToken:{
        type: String
    },
    authProvider:{
        type: String,
        enum: ['local', 'google'],
        default: 'local'
    }
}, { timestamps: true });

UserSchema.virtual('name').get(function () {
    return this.Username;
});

UserSchema.set('toObject', { virtuals: true });
UserSchema.set('toJSON', { virtuals: true });

const UserModel = mongoose.model("Users", UserSchema)

export default UserModel