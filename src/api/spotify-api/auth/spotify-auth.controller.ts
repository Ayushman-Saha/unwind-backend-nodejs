import { Request, Response} from 'express'
import { stringify } from 'querystring'
import dotenv from 'dotenv'
import request from 'request'
 
//Configuring all the credentials from dotenv file
dotenv.config()

//Setting up all the credentials
const scopes = process.env.SCOPES as string
const client_id = process.env.CLIENT_ID as string
const redirect_uri = process.env.CALLBACK_URL as  string
const client_secret = process.env.CLIENT_SECRET as string
const auth_token = Buffer.from(`${client_id}:${client_secret}`, 'utf-8').toString('base64');

//Class for handling the Spotify Auth Api
class SpotifyApi {

    //Function for initiating the login request
    static async login (req: Request, res: Response) {
        res.redirect('https://accounts.spotify.com/authorize?' +
            stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scopes,
            redirect_uri: redirect_uri
        })   
    )}

    //Function for handling the callback after the login has been authorised
    static async callback(req: Request, res: Response) {
       
        //Getting the code and error from request query
       let code = req.query['code']
       let error = req.query['error']

       if(code == null) {
            res.status(200).json({
                "status" : 1,
                "message" : error
            })
       } else {

        //Setting of all the request for access_token
        var authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            headers: {
              Authorization:
                'Basic ' +
                auth_token
            },
            form: {
              grant_type: 'authorization_code',
              code: code,
              redirect_uri: redirect_uri
            },
            json: true
          };

          //Sending a post request for receiving the access_token
          request.post(authOptions, function(error: any, response: { statusCode: number }, body: { access_token: any }) {
            if (!error && response.statusCode === 200) {
              res.redirect("http://localhost:6969/callback?"+ stringify(body))
            }
          });

       }
    }

    //Function for refreshing the access token after it has expired
    static async refreshToken(req: Request, res :  Response) {
      //Getting the refresh token from request body
      let refreshToken = req.body.refresh_token

      if(refreshToken != null) {

        //Preparing the request
        var authOptions = {
          url: 'https://accounts.spotify.com/api/token',
          headers: { Authorization : `Basic ${auth_token}` },
          form: {
            grant_type: 'refresh_token',
            refresh_token: refreshToken
          },
          json: true
        };
      
        //Making the POST request for getting the access_token
        request.post(authOptions, function(error, response, body) {
          if (!error && response.statusCode === 200) {
            res.json({
              data : response.body
            });
          } else {
            res.sendStatus(400).json({
              status : 1,
              message : error
            })
          }
        });

      } else {
        res.sendStatus(403).json({
          status : 1,
          message : "No refresh token provided"
        })
      }

     
    }

}

export default SpotifyApi