import { SpotifyDataInterface } from "@s/router/types"
import dotenv from 'dotenv'
dotenv.config()

export const AuthorizationBasic = Buffer.from(
  `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
).toString("base64")

export let user_id = ''

export const user_data: SpotifyDataInterface[] = [
  {
      "playlist": "аниме2",
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
            "spotify_name": "forever",
            "name_sim": 0.38,
            "vk_artist": "THYME",
            "sim_event": true,
            "spotify_artist": "Øneheart",
            "arist_sim": 0,
            "id": "75RuDOLRx4KOukzYLa4y4R",
            "url": "https://open.spotify.com/track/75RuDOLRx4KOukzYLa4y4R"
        },
        {
            "vk_name": "OP  1 | Opening 1",
            "spotify_name": "1 Op 1 (feat. SBMG)",
            "name_sim": 0.48,
            "vk_artist": "Durarara",
            "sim_event": true,
            "spotify_artist": "Equalz",
            "arist_sim": 0,
            "id": "3deiVmpBZY5Bn3EI0N8dc6",
            "url": "https://open.spotify.com/track/3deiVmpBZY5Bn3EI0N8dc6"
        },
        {
            "vk_name": "Go!!!",
            "spotify_name": "Go!",
            "name_sim": 1,
            "vk_artist": "FLOW",
            "sim_event": true,
            "spotify_artist": "QEETHA",
            "arist_sim": 0,
            "id": "3VlkNdlMauyfXa7SI9BoSW",
            "url": "https://open.spotify.com/track/3VlkNdlMauyfXa7SI9BoSW"
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
  }
]