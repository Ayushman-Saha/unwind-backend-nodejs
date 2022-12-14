import dotenv from 'dotenv'
import {MongoClient,} from 'mongodb'
import UserDataDAO from './dao/userDataDao'
import app from './server'

//Configuring our dotenv file
dotenv.config()

const port = process.env.PORT || 5000
const DB_URI : string = process.env.DB_URI as string

//Connecting to MongoDB client 
MongoClient.connect(
    DB_URI,
)
.catch((err) => {
    console.error(err.stack)
    process.exit(1)
})
.then(async (client)=> {
    UserDataDAO.injectDB(client)
    app.listen(port,()=> {
        console.log(`Server started at ${port}`)
    })
})
