import {Request , Response} from 'express'
import axios from 'axios'

//Class for handing all the spotify api calls
class SpotifyApiController {

    //Function for getting the spotify user data
    static async getUserProfile(req : Request, res : Response) {
        let access_token = req.body.access_token
        if(access_token != null) {
            axios.get('https://api.spotify.com/v1/me',{
                headers : {
                    "Accept": "application/json",
                    "Content-Type" : "application/json",
                    "Authorization" : `Bearer ${access_token}`
                }
            }).then((response)=> {
                res.json({
                    status : 0,
                    data : response.data
                })
            }).catch((err)=> {
                res.status(403).json({
                    status : 1,
                    message : err
                })
            })
        
        } else {
            res.status(403).json({
                status : 1,
                message : "No access_token provided"
            })
        }
    }


    //Function for getting all the playlist of a particular user
    static async getPlaylists(req : Request, res: Response) {
        let access_token = req.body.access_token
        if(access_token!=null) {
            axios.get('https://api.spotify.com/v1/me/playlists?limit=50',{
                headers : {
                    "Accept": "application/json",
                    "Content-Type" : "application/json",
                    "Authorization" : `Bearer ${access_token}`
                }
            }).then((response)=> {
                res.json({
                    status : 0,
                    data : response.data
                })
            }).catch((err)=> {
                res.status(400).json({
                    status : 1,
                    message : err
                })
            })
        
        } else {
            res.status(403).json({
                status : 1,
                message : "No access_token provided"
            })
        }
        
    }

    //Function for getting all the playlist tracks 
    static async getPlaylistTracks(req : Request, res: Response) {
        let access_token = req.body.access_token
        let playlistId = req.body.playlist_id
        if(access_token!=null) {
            axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?fields=items(track%2Cid%2Curi%2Calbum(images)%2Cartists)`,{
                headers : {
                    "Accept": "application/json",
                    "Content-Type" : "application/json",
                    "Authorization" : `Bearer ${access_token}`
                }
            }).then((response)=> {
                res.json({
                    status : 0,
                    data : response.data
                })
            }).catch((err)=> {
                res.status(403).json({
                    status : 1,
                    message : err
                })
            })
        
        } else {
            res.status(403).json({
                status : 1,
                message : "No access_token provided"
            })
        }
        
    }
}

export default SpotifyApiController