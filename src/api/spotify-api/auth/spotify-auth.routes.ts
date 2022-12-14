import { Router } from "express";
import SpotifyApi from "./spotify-auth.controller";

//Setting up routes for the spotify auth Api 
const spotifyAuthApiRoute = Router()

spotifyAuthApiRoute.route('/login').get(SpotifyApi.login)
spotifyAuthApiRoute.route('/callback').get(SpotifyApi.callback)
spotifyAuthApiRoute.route('/refreshToken').get(SpotifyApi.refreshToken)

export default spotifyAuthApiRoute