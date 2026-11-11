import 'dotenv/config'
import app from './src/app.js'
import ConnectDB from './src/config/database.js'

ConnectDB()

const PORT = process.env.PORT || 3000 

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})