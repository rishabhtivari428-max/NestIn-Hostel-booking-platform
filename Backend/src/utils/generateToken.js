import jwt from 'jsonwebtoken'

export const generateAcessToken = (userId) => {
    return jwt.sign({
        userId
    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
}

export const generateRefreshToken = (userId) => {
    return jwt.sign({
        userId
    }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
}