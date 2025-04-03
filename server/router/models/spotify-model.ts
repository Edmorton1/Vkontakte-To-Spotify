// import { AuthorizationBasic } from "@s/router/spotify/database";
import { $spotifyPost } from "@s/router/axios/$spotify-post"
import { AuthorizationBasic } from "@s/router/db";
import * as qs from "qs";
import { spotifyTrackDataInterface, trackInterface } from "@s/router/types";
import { cleanText,cosineSimilarity, delay } from "@s/router/functions";

type trackInterfaceWithSim = trackInterface & {sim_total: number}

// https://api.spotify.com/v1/search?q=morgen&type=album&limit=1
// https://api.spotify.com/v1/users/Weekend
// https://api.spotify.com/v1/users/weekend/playlists
// https://api.spotify.com/v1/search?q=il vento d'oro&type=track&limit=1
// 3m2fuTHJMXCnxiIBilSQrE -- ТРЕК ЖОЖО
// https://api.spotify.com/v1/playlists/{playlist_id}/tracks -- ДОБАВИТЬ ТРЕК

// https://api.spotify.com/v1/playlists/3HOK2rSvykVHJD1ZApCrrT` - ПЛЕЙЛИСТ test
// https://accounts.spotify.com/authorize?

class SpotifyModel {
  async getCallback(code: string, state: string) {
    // console.log(code);
    const data = qs.stringify({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: `${process.env.URL_SERVER_API}callback`,
    });
    // console.log(data, 'data')
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${AuthorizationBasic}`,
    };
    // console.log(headers, 'headers')
    // const request = await $spotify.post('https://accounts.spotify.com/api/token', data,
    //   {headers: { "Content-Type": "application/x-www-form-urlencoded" }})
    const request = await fetch("https://accounts.spotify.com/api/token", {
      credentials: "include",
      method: "POST",
      body: data,
      headers: headers,
    });
    // console.log(await request.json())
    return await request.json();
  }

  take = async (artist: string, name: string) => {
    async function getResponse(str: string) {
      // console.log(str)
      const response = await $spotifyPost.get(`https://api.spotify.com/v1/search?q=${encodeURIComponent(str)}&type=track&limit=50`);
      const bestMatch = response.data.tracks.items.map((e: spotifyTrackDataInterface) => ({
          vk_name: name,
          spotify_name: e.name,
          name_sim: parseFloat(cosineSimilarity(name, e.name).toFixed(2)),
          vk_artist: artist,
          sim_event: cosineSimilarity(artist, e.artists[0].name) < 0.4 || cosineSimilarity(name, e.name) < 0.4,
          spotify_artist: e.artists[0].name,
          arist_sim: parseFloat(cosineSimilarity(artist, e.artists[0].name).toFixed(2)),
          id: e.id,
          url: e.external_urls.spotify,
          sim_total: parseFloat(cosineSimilarity(name, e.name).toFixed(2)) + parseFloat(cosineSimilarity(artist, e.artists[0].name).toFixed(2))
        })).sort((a: trackInterfaceWithSim, b: trackInterfaceWithSim) => (b.sim_total) - (a.sim_total))[0];
      return bestMatch
    }
    const first = await getResponse(`${artist} ${name}`)
    // console.log('фирст')
    await delay(1000)
    // console.log('секонд')
    const second = await getResponse(name)
    const total = [first, second].sort((a: trackInterfaceWithSim, b: trackInterfaceWithSim) => (b.sim_total) - (a.sim_total))[0]
    delete total.sim_total
    return total
  }
}

export default new SpotifyModel();
