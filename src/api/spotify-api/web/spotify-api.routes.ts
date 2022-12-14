import { Router } from "express";
import SpotifyApiController from "./spotify-api.controller";

//Setting up routes for the spotify web Api 
const spotifyWebApiRoute = Router()

spotifyWebApiRoute.route('/getUserProfile').get(SpotifyApiController.getUserProfile)
spotifyWebApiRoute.route('/getPlaylists').get(SpotifyApiController.getPlaylists)
spotifyWebApiRoute.route('/getPlaylistTracks').get(SpotifyApiController.getPlaylistTracks)

export default spotifyWebApiRoute