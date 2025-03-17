// import { AuthorizationBasic } from "@s/router/spotify/database";
import { $spotifyPost } from "@s/router/$spotify-post"
import { AuthorizationBasic } from "@s/router/db";
import * as qs from "qs";
import { spotifyTrackDataInterface, trackInterface } from "@s/router/types";
import { cleanText,cosineSimilarity, delay } from "@s/router/functions";

// https://api.spotify.com/v1/search?q=morgen&type=album&limit=1
// https://api.spotify.com/v1/users/Weekend
// https://api.spotify.com/v1/users/weekend/playlists
// https://api.spotify.com/v1/search?q=il vento d'oro&type=track&limit=1
// 3m2fuTHJMXCnxiIBilSQrE -- ТРЕК ЖОЖО
// https://api.spotify.com/v1/playlists/{playlist_id}/tracks -- ДОБАВИТЬ ТРЕК

// https://api.spotify.com/v1/playlists/3HOK2rSvykVHJD1ZApCrrT` - ПЛЕЙЛИСТ test
// https://accounts.spotify.com/authorize?

class SpotifyModel {
  // async getSpotifyData(params: string) {
  //   const request = (await $spotify.post(`https://api.spotify.com/v1/playlists/3HOK2rSvykVHJD1ZApCrrT/tracks`), {
  //     uris: "spotify:track:3m2fuTHJMXCnxiIBilSQrE"
  //   })
  //   console.log('LJ<FDKTYJ')
  //   return request
  // }
  async getCallback(code: string, state: string) {
    console.log(code);
    const data = qs.stringify({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: "http://localhost:3000/api/callback",
    });
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${AuthorizationBasic}`,
    };
    // const request = await $spotify.post('https://accounts.spotify.com/api/token', data,
    //   {headers: { "Content-Type": "application/x-www-form-urlencoded" }})
    const request = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      body: data,
      headers: headers,
    });
    return await request.json();
  }
  take = async (artist: string, name: string) => {
    const response = await $spotifyPost.get(`https://api.spotify.com/v1/search?q=${`${cleanText(artist)} ${cleanText(name)}`}&type=track&limit=50`);
    const bestMatch = response.data.tracks.items.map((e: spotifyTrackDataInterface) => ({
        vk_name: name,
        spotify_name: e.name,
        name_sim: cosineSimilarity(name, e.name),
        vk_artist: artist,
        sim_event: cosineSimilarity(artist, e.artists[0].name) < 0.4 || cosineSimilarity(name, e.name),
        spotify_artist: e.artists[0].name,
        arist_sim: cosineSimilarity(artist, e.artists[0].name),
        id: e.id,
        url: e.external_urls.spotify,
      })).sort((a: trackInterface, b: trackInterface) => b.name_sim - a.name_sim)[0];
    return bestMatch
  }
}

export default new SpotifyModel();
