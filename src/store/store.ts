import $api from "@/store/$api";
import { SpotifyDataInterface } from "@s/router/types";
import { makeAutoObservable, runInAction } from "mobx";


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
                "spotify_name": "1 Op 1",
                "name_sim": 0.5163977794943222,
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
                "arist_sim": 0.5773502691896258,
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
                "name_sim": 0.6324555320336759,
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
                "name_sim": 0,
                "vk_artist": "THYME",
                "sim_event": true,
                "spotify_artist": "Drake",
                "arist_sim": 0,
                "id": "5UsLjwBaTHBX4ektWIr4XX",
                "url": "https://open.spotify.com/track/5UsLjwBaTHBX4ektWIr4XX"
            },
            {
                "vk_name": "OP  1 | Opening 1",
                "spotify_name": "Be a flower - Russian ver.",
                "name_sim": 0.25819888974716115,
                "vk_artist": "Durarara",
                "sim_event": true,
                "spotify_artist": "Sati Akura",
                "arist_sim": 0,
                "id": "4y2NRV3GlquST6qpmeCzBM",
                "url": "https://open.spotify.com/track/4y2NRV3GlquST6qpmeCzBM"
            },
            {
                "vk_name": "Go!!!",
                "spotify_name": "Go On Slow",
                "name_sim": 0.5773502691896258,
                "vk_artist": "FLOW",
                "sim_event": true,
                "spotify_artist": "FLOSS",
                "arist_sim": 0,
                "id": "5rxDKh0dwANk3WIHNFmy5t",
                "url": "https://open.spotify.com/track/5rxDKh0dwANk3WIHNFmy5t"
            },
            {
                "vk_name": "Koko kara Saki wa Uta ni Naranai",
                "spotify_name": "GATE ~Sore wa Akatsuki no you ni~ (dj-Jo Remix)",
                "name_sim": 0.2519763153394848,
                "vk_artist": "Poppin' Party",
                "sim_event": true,
                "spotify_artist": "dj-Jo",
                "arist_sim": 0,
                "id": "1vBNGu1fZPQUChrCgKlJY3",
                "url": "https://open.spotify.com/track/1vBNGu1fZPQUChrCgKlJY3"
            }
        ]
    }
]
playlist = {}

  async checkRefreshToken() {
    const request = await $api.get('http://localhost:3000/api/checkRefreshToken')
    return request.data
  }
  loadPlaylists = (data: any) => {
    console.log(data)
    runInAction(() => this.data.push(...data))
  }
  setPlaylist = (index: number) => {
    runInAction(() => this.playlist = this.data[index])
    console.log(this.playlist)
  }
}

export default new Store()