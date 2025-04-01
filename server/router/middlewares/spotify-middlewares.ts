import { $spotifyPost, getAccessToken } from "@s/router/axios/$spotify-post"
import { user_id } from "@s/router/db"
import { Request, Response, NextFunction } from "express"

class SpotifyMiddlewares {
  async setUserAccessTokenMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
      console.log('ТРАЙ')
      await $spotifyPost.get('https://api.spotify.com/v1/me')
    } catch {
      console.log('КЭТЧ')
      const access_token = await getAccessToken(req.cookies.spotify_refresh_token)
      console.log(access_token)
      $spotifyPost.defaults.headers.Authorization = `Bearer ${access_token}`

      const request = await $spotifyPost.get('https://api.spotify.com/v1/me')
      //@ts-ignore
      user_id = request.data.id
    }
    next()
  }
  async checkRefreshToken(req: Request, res: Response) {
    try {
      const access_token = await getAccessToken(req.cookies.spotify_refresh_token)
      $spotifyPost.defaults.headers.Authorization = `Bearer ${access_token}`
      // console.log(access_token, req.cookies)
      const request = await $spotifyPost.get('https://api.spotify.com/v1/me')
      //@ts-ignore
      user_id = request.data.id
      console.log(true)
      res.send(true)
    } catch {
      console.log('КЭТЧ')
      console.log(req.cookies.spotify_refresh_token)
      if (req.cookies.spotify_refresh_token === undefined) {
        res.send('undefined')
      } else {
        res.send(false)
      }
    }
  }
}

export default new SpotifyMiddlewares()