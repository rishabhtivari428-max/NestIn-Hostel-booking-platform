import UserModel from "../models/User.model.js";
import passport from "passport";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
}, async(accessToken, refreshToken, profile, done) => {
    try {
        let user = await UserModel.findOne({ googleId: profile.id })

        if(!user){
            const email = profile.emails?.[0]?.value

            if(!email){
                return done(new Error('No email returned from Google'), null)
            }

            user = await UserModel.findOne({ email })

            if(user){
                user.googleId = profile.id,
                user.authProvider = 'google',
                await user.save()
                console.log('Google linked to existing account: ', user.email)
            } else {
                user = await UserModel.create({
                    googleId: profile.id,
                    Username: profile.displayName || email.split('@')[0],
                    email,
                    authProvider: 'google',
                    role: 'Student'
                })
                console.log('New user registered via Google: ', user.email)
            }
        } else {
            console.log('Existing user logged in via Google: ', user.email)
        }
        return done(null, user)
    } catch (error) {
        console.log('Error in Google Strategy: ', error)
        return done(error, null)
    }
}))