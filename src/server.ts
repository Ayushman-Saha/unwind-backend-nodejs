//Importing the modules
import express, {Application} from 'express'
import spotifyAuthApiRoute from './api/spotify-api/auth/spotify-auth.routes'
import spotifyWebApiRoute from './api/spotify-api/web/spotify-api.routes'
import UserDataRouter from './api/mongo-api/userData/userData.routes'
import cors from 'cors'

//Declaring the express app
const app : Application = express()

//Adding the middlewares
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended:true}))

//Setting of all routes to the express app
app.use('/auth',spotifyAuthApiRoute)
app.use('/spotify',spotifyWebApiRoute)
app.use('/userData',UserDataRouter)

export default app

