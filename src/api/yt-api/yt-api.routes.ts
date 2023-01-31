//Importing modules
import { Router } from "express"
import YoutubeDataController from "../yt-api/yt-api.controller"


//Declaring the routes
const YoutubeApiDataRouter = Router()


//Registering the routes
YoutubeApiDataRouter.route("/searchSongBySpotifyQuery").post(YoutubeDataController.searchSongBySpotifyQuery)
// UserDataRouter.route("/get").get(UserDataController.getUser)
// UserDataRouter.route("/update").post(UserDataController.modifyUser)
// UserDataRouter.route("/delete").delete(UserDataController.deleteUser)

export default YoutubeApiDataRouter