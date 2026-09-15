import dotenv from 'dotenv'
dotenv.config()
import app from './src/app.js'
import ConnectDB from './src/config/database.js'

ConnectDB()

const PORT = process.env.PORT 

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})