import $api from "@/store/$api";
import ErrorStore from "@/store/ErrorStore";
import SocketStore from "@/store/SocketStore";
import { delay } from "@s/router/functions";
import { SpotifyDataInterface } from "@s/router/types";
import { action, makeAutoObservable, observable, runInAction, toJS } from "mobx";

type changeTypes = | `sim_event` | 'url' | 'delete'

class Store {
  constructor() {
    makeAutoObservable(this),
    SocketStore.connect()
  }
  // data: SpotifyDataInterface[] = []
  data: SpotifyDataInterface[] = [
    {
        "playlist": "аниме2",
        "is_published": false,
        "tracks": [
            {
                "vk_name": "[Скитальцы] 1 Опенинг",
                "spotify_name": "1 Op 1",
                "name_sim": 0.52,
                "vk_artist": "Drifters -OP 1",
                "sim_event": true,
                "spotify_artist": "Kav Verhouzer",
                "arist_sim": 0,
                "id": "7l0MFTZCKNscxlbpleneJ5",
                "url": "https://open.spotify.com/track/7l0MFTZCKNscxlbpleneJ5"
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
                "spotify_artist": "Curtis Cole",
                "arist_sim": 0,
                "id": "62816BBnjaPFdrk4BXHuiN",
                "url": "https://open.spotify.com/track/62816BBnjaPFdrk4BXHuiN"
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
                "spotify_name": "GATE ~Sore wa Akatsuki no you ni~ (dj-Jo Remix)",
                "name_sim": 0.25,
                "vk_artist": "Poppin' Party",
                "sim_event": true,
                "spotify_artist": "dj-Jo",
                "arist_sim": 0,
                "id": "1vBNGu1fZPQUChrCgKlJY3",
                "url": "https://open.spotify.com/track/1vBNGu1fZPQUChrCgKlJY3"
            }
        ]
    },
    {
        "playlist": "Blur",
        "is_published": false,
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
  isLoadCreate: number[] = []
  loadFiles: number = 0
  loadProgress: number = 0
  // socket: WebSocket | null = null

  pushData = (data: SpotifyDataInterface) => {
    runInAction(() => this.data.push(data))
  }

  async checkRefreshToken() {
    const request = await $api.get('http://localhost:3000/api/checkRefreshToken')
    return runInAction(() => request.data)
  }

  loadPlaylists = action(async (formData: FormData, setShowBlock: Function) => {
    try {
      // console.log(formData)
      // this.loadFiles = true
      await $api.post(`http://localhost:3000/api/take`, formData)
    } catch(err) {
      console.log(err)
      ErrorStore.setError(new Error('Не удалось выполнить операцию. Плейлсит должен быть обязательно в формате HTML или TXT'))
    } finally {
      // this.loadFiles = 0
      setShowBlock(false)
    }
  })

  setPlaylist = (index: number) => {
    return this.data[index]
  }

  updateTracks = action(
    async(playlist: number, track: number, changeType: changeTypes, changeValue: string = '') => {
      try {
        const body = {[changeType]: changeValue}
        const request = await $api.put(`http://localhost:3000/api/updateTrack/${playlist}/${track}`, body)
        if (changeType == 'url') {
          // console.log(request.data)
          this.data[playlist].tracks[track] = request.data
        }
        if (changeType == 'sim_event') {
          this.data[playlist].tracks[track].sim_event = false
        }
        if (changeType == 'delete') {
          this.data[playlist].tracks.splice(0, 1)
          console.log(toJS(this.data[playlist].tracks))
        }
      } catch(err) {
        console.log(err)
        ErrorStore.setError(new Error('Не удалось выполнить операцию, попробуйте ещё раз'))
      }
  })
  createPlaylist = action(
    async (playlist_id: number, clean?: boolean) => {
      try {
        const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
        this.isLoadCreate.push(playlist_id)
        console.log(this.isLoadCreate)
        await delay(3000)
        this.data[playlist_id].is_published = true
        this.isLoadCreate = this.isLoadCreate.filter(e => e != playlist_id)
        console.log(this.isLoadCreate)
      } catch(err) {
        console.log(err)
        ErrorStore.setError(new Error('Не удалось создать плейлист, попробуйте ещё раз'))
      }
    }
  )
  removePlaylist = action(
    async (playlist_id: number) => {
      try {
        this.data[playlist_id].is_published = false
      } catch(err) {
        console.log(err)
        ErrorStore.setError(new Error('Не удалось вернуть плейлист, попробуйте ещё раз'))
      }
    }
  )
}

export default new Store()