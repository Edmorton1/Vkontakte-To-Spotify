import $api from "@/store/$api";
import { SpotifyDataInterface } from "@s/router/types";
import { action, makeAutoObservable, runInAction, toJS } from "mobx";

type changeTypes = | `sim_event` | 'url' | 'delete'

class Store {
  constructor() {
    makeAutoObservable(this)
  }
  // data: SpotifyDataInterface[] = []
  data: SpotifyDataInterface[] = [
    {
        "playlist": "аниме2",
        "tracks": [
            {
                "vk_name": "[Скитальцы] 1 Опенинг",
                "spotify_name": "SVARS",
                "name_sim": 0,
                "vk_artist": "Drifters -OP 1",
                "sim_event": true,
                "spotify_artist": "BANDA BANDA",
                "arist_sim": 0,
                "id": "2Pxf4He2VkSo1k4aLFJAhO",
                "url": "https://open.spotify.com/track/2Pxf4He2VkSo1k4aLFJAhO"
            },
            {
                "vk_name": "BEYOND",
                "spotify_name": "BEYOND",
                "name_sim": 1,
                "vk_artist": "ALI & MaRI",
                "sim_event": false,
                "spotify_artist": "ALI",
                "arist_sim": 0.58,
                "id": "0cbxHYeQrL9Bz6IjyIWSQi",
                "url": "https://open.spotify.com/track/0cbxHYeQrL9Bz6IjyIWSQi"
            },
            {
                "vk_name": "bloom",
                "spotify_name": "bloom",
                "name_sim": 1,
                "vk_artist": "ネクライトーキー",
                "sim_event": false,
                "spotify_artist": "ネクライトーキー",
                "arist_sim": 1,
                "id": "1f37xjUqPlrDvA6MdQoAis",
                "url": "https://open.spotify.com/track/1f37xjUqPlrDvA6MdQoAis"
            },
            {
                "vk_name": "Odd Numbers (The Fable ED)",
                "spotify_name": "Odd Numbers",
                "name_sim": 0.63,
                "vk_artist": "UmedaCypher",
                "sim_event": true,
                "spotify_artist": "梅田サイファー",
                "arist_sim": 0,
                "id": "5UUQjdgSOoJUGgciuFHDkP",
                "url": "https://open.spotify.com/track/5UUQjdgSOoJUGgciuFHDkP"
            },
            {
                "vk_name": "forever we can make it! (любовные неприятности)",
                "spotify_name": "Forever",
                "name_sim": 0.38,
                "vk_artist": "THYME",
                "sim_event": true,
                "spotify_artist": "Drake",
                "arist_sim": 0,
                "id": "5UsLjwBaTHBX4ektWIr4XX",
                "url": "https://open.spotify.com/track/5UsLjwBaTHBX4ektWIr4XX"
            },
            {
                "vk_name": "OP  1 | Opening 1",
                "spotify_name": "Opening Up - Improv Take 1",
                "name_sim": 0.65,
                "vk_artist": "Durarara",
                "sim_event": true,
                "spotify_artist": "R_R_",
                "arist_sim": 0,
                "id": "7mDMCQOdqaP5ar4WJpdCYf",
                "url": "https://open.spotify.com/track/7mDMCQOdqaP5ar4WJpdCYf"
            },
            {
                "vk_name": "Go!!!",
                "spotify_name": "GO!!!",
                "name_sim": 1,
                "vk_artist": "FLOW",
                "sim_event": false,
                "spotify_artist": "FLOW",
                "arist_sim": 1,
                "id": "66BfcocNwMJEwugiiEnLNM",
                "url": "https://open.spotify.com/track/66BfcocNwMJEwugiiEnLNM"
            },
            {
                "vk_name": "Koko kara Saki wa Uta ni Naranai",
                "spotify_name": "Koko ni Arukoto",
                "name_sim": 0.44,
                "vk_artist": "Poppin' Party",
                "sim_event": true,
                "spotify_artist": "Soraru",
                "arist_sim": 0,
                "id": "3fBHeslrgnY1vcVEONsWzt",
                "url": "https://open.spotify.com/track/3fBHeslrgnY1vcVEONsWzt"
            }
        ]
    },
    {
        "playlist": "Blur",
        "tracks": [
            {
                "vk_name": "Girls & Boys",
                "spotify_name": "Girls & Boys",
                "name_sim": 1,
                "vk_artist": "Blur",
                "sim_event": false,
                "spotify_artist": "Blur",
                "arist_sim": 1,
                "id": "5CeL9C3bsoe4yzYS1Qz8cw",
                "url": "https://open.spotify.com/track/5CeL9C3bsoe4yzYS1Qz8cw"
            },
            {
                "vk_name": "Song 2",
                "spotify_name": "Song 2",
                "name_sim": 1,
                "vk_artist": "Blur",
                "sim_event": false,
                "spotify_artist": "Blur",
                "arist_sim": 1,
                "id": "3GfOAdcoc3X5GPiiXmpBjK",
                "url": "https://open.spotify.com/track/3GfOAdcoc3X5GPiiXmpBjK"
            },
            {
                "vk_name": "Charmless Man",
                "spotify_name": "Charmless Man",
                "name_sim": 1,
                "vk_artist": "Blur",
                "sim_event": false,
                "spotify_artist": "Blur",
                "arist_sim": 1,
                "id": "1lYOlG9ZNtz5p3eSgnMn0Z",
                "url": "https://open.spotify.com/track/1lYOlG9ZNtz5p3eSgnMn0Z"
            },
            {
                "vk_name": "Parklife",
                "spotify_name": "Parklife",
                "name_sim": 1,
                "vk_artist": "Blur",
                "sim_event": false,
                "spotify_artist": "Blur",
                "arist_sim": 1,
                "id": "3mqRLlD9j92BBv1ueFhJ1l",
                "url": "https://open.spotify.com/track/3mqRLlD9j92BBv1ueFhJ1l"
            },
            {
                "vk_name": "Popscene",
                "spotify_name": "Popscene",
                "name_sim": 1,
                "vk_artist": "Blur",
                "sim_event": false,
                "spotify_artist": "Blur",
                "arist_sim": 1,
                "id": "4SBOjhVieT0bRh8gFhsreE",
                "url": "https://open.spotify.com/track/4SBOjhVieT0bRh8gFhsreE"
            },
            {
                "vk_name": "Tracy Jacks",
                "spotify_name": "Tracy Jacks - Live",
                "name_sim": 0.71,
                "vk_artist": "Blur",
                "sim_event": false,
                "spotify_artist": "Blur",
                "arist_sim": 1,
                "id": "63rczSfbTmCRnpTBYP84UH",
                "url": "https://open.spotify.com/track/63rczSfbTmCRnpTBYP84UH"
            },
            {
                "vk_name": "Come Together",
                "spotify_name": "Come Together - 2012 Remaster",
                "name_sim": 0.63,
                "vk_artist": "Blur",
                "sim_event": false,
                "spotify_artist": "Blur",
                "arist_sim": 1,
                "id": "0jqa9HTlMeh5Smq3dLGwR0",
                "url": "https://open.spotify.com/track/0jqa9HTlMeh5Smq3dLGwR0"
            },
            {
                "vk_name": "Jubilee",
                "spotify_name": "Jubilee - Live",
                "name_sim": 0.58,
                "vk_artist": "Blur",
                "sim_event": false,
                "spotify_artist": "Blur",
                "arist_sim": 1,
                "id": "378ap3H5A9nbCzxe63glJV",
                "url": "https://open.spotify.com/track/378ap3H5A9nbCzxe63glJV"
            },
            {
                "vk_name": "London Loves",
                "spotify_name": "London Loves - Live",
                "name_sim": 0.71,
                "vk_artist": "Blur",
                "sim_event": false,
                "spotify_artist": "Blur",
                "arist_sim": 1,
                "id": "1YCd0o2Tu6QCkfLMWvSroz",
                "url": "https://open.spotify.com/track/1YCd0o2Tu6QCkfLMWvSroz"
            },
            {
                "vk_name": "To the End",
                "spotify_name": "To the End",
                "name_sim": 1,
                "vk_artist": "Blur",
                "sim_event": false,
                "spotify_artist": "Blur",
                "arist_sim": 1,
                "id": "5BpWVTgEQTng1ocwMsVzZO",
                "url": "https://open.spotify.com/track/5BpWVTgEQTng1ocwMsVzZO"
            }
        ]
    }
]
  isLoad = false

  async checkRefreshToken() {
    const request = await $api.get('http://localhost:3000/api/checkRefreshToken')
    return runInAction(() => request.data)
  }
  loadPlaylists = action(async (formData: FormData, setShowBlock: Function) => {
    this.isLoad = true
    const data = await (await $api.post(`http://localhost:3000/api/take`, formData)).data
    // store.loadPlaylists(request.data)
    console.log(data)
    this.data.push(...data)
    this.isLoad = false
    setShowBlock(false)
  })
  setPlaylist = (index: number) => {
    return this.data[index]
  }
  updateTracks = action(
    async(playlist: number, track: number, changeType: changeTypes, changeValue: string = '') => {
      const body = {[changeType]: changeValue}
      const request = await $api.put(`http://localhost:3000/api/updateTrack/${playlist}/${track}`, body)
      if (changeType == 'url') {
        this.data[playlist].tracks[track] = request.data
      }
      if (changeType == 'sim_event') {
        this.data[playlist].tracks[track].sim_event = false
      }
      if (changeType == 'delete') {
        this.data[playlist].tracks.splice(0, 1)
      }
  })
}

export default new Store()