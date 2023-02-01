import { Router } from "express";
import SpotifyApiController from "./spotify-api.controller";

//Setting up routes for the spotify web Api 
const spotifyWebApiRoute = Router()

spotifyWebApiRoute.route('/getUserProfile').post(SpotifyApiController.getUserProfile)
spotifyWebApiRoute.route('/getPlaylists').post(SpotifyApiController.getPlaylists)
spotifyWebApiRoute.route('/getPlaylistTracks').post(SpotifyApiController.getPlaylistTracks)

export default spotifyWebApiRoute