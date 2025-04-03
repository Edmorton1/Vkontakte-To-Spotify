
import { AuthorizationBasic } from "@s/router/db";
import { userTokens } from "@s/router/types";
import axios, { AxiosError } from "axios";
import * as qs from 'qs'

export const $spotifyPost = axios.create({
  headers: {
    "Content-Type": "application/json"
  },
});

export async function getAccessToken(refresh_token: string) {
  const body = qs.stringify({
    grant_type: "refresh_token",
    refresh_token: refresh_token,
    client_id: process.env.SPOTIFY_CLIENT_ID
  })
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    "Authorization": `Basic ${AuthorizationBasic}`
  }
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: "POST",
    body: body,
    headers: headers
  })
  const data = await response.json() as userTokens
  return data.access_token
}

$spotifyPost.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if ([429, 500, 502, 503, 504].includes(error.response?.status)) {
      console.log(error.response)
      await new Promise(res => setTimeout(res, 5000))
      return $spotifyPost.request(error.config)
    }
    return Promise.reject(error)
  }
)

// export function setAuthorization(refresh_token: string, access_token?: string) {
//   if (!access_token) {
    
//   }
// }