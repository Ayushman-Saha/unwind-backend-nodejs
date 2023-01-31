import axios from 'axios';
import { Request, Response} from 'express'
const YoutubeMusicApi = require('youtube-music-api')

class YTApi {
    static async searchSongBySpotifyQuery(req: Request, res: Response) {

        let access_token = req.body.access_token
        let track_id = req.body.track_id
        const ytApi = new YoutubeMusicApi();

        if(track_id != null  && access_token != null) {

            axios.get(`https://api.spotify.com/v1/tracks/${track_id}`,{
                    headers : {
                        "Accept": "application/json",
                        "Content-Type" : "application/json",
                        "Authorization" : `Bearer ${access_token}`
                    }
                }).then((response)=> {
                    let track_name = response.data.name
                    let artist = response.data.artists[0].name

                    ytApi.initalize().then(() => {
                        ytApi.search(`${track_name} ${artist}`).then((result: any) => {
                            let data: { videoId: any; name: any; artist: any; album: any; duration: any; thumbnail: any; }[] = []
                            result.content.forEach((video:any) => {
                                if(video.type ==='song' || video.type === 'single') {
                                    let videoData = {
                                        "videoId" : video.videoId,
                                        "name" : video.name,
                                        "artist" : video.artist === undefined? "undefined" : video.artist.name,
                                        "album" : video.album === undefined? "undefined" : video.album.name,
                                        "duration" : video.duration,
                                        "thumbnail" : video.thumbnails[1] === undefined? "undefined" : video.thumbnails[1].url
                                    }
                                    data.push(videoData)
                                }
                            })
                            res.status(200).json({
                                "data" : data[0]
                            })
                        })
                    })
                })  
        } else {
            res.status(403).json({
                "message": "Incomplete or malformed parameters"
            })
        }
    }
}

export default YTApi