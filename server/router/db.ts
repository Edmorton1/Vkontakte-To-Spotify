import { SpotifyDataInterface } from "@s/router/types"
import dotenv from 'dotenv'
dotenv.config()

export const AuthorizationBasic = Buffer.from(
  `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
).toString("base64")

export let user_id = ''

export let pushed_playlists: {id_site: number, id_spoty: string}[] = []

export let loadFiles = 0

export const user_data: SpotifyDataInterface[] = []