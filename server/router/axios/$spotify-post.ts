
import { AuthorizationBasic } from "@s/router/db";
import { userTokens } from "@s/router/types";
import axios from "axios";
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

// export function setAuthorization(refresh_token: string, access_token?: string) {
//   if (!access_token) {
    
//   }
// }