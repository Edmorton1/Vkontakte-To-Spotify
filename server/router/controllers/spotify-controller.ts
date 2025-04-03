import { $spotifyPost } from "@s/router/axios/$spotify-post"
import { chunkArray, delay } from "@s/router/functions"
import SpotifyModel from "@s/router/models/spotify-model"
import { SpotifyDataInterface, spotifyTrackDataInterface, trackInterface, userTokens } from "@s/router/types"
import { Request, Response } from "express"
import * as cheerio from 'cheerio'
import { pushed_playlists, user_data, user_id } from "@s/router/db"
import $spotify from "@s/router/axios/$spotify"
import WebsocketController from "@s/router/controllers/websocket-controller"

class SpotifyController {
    // async getSpotifyData(req: Request, res: Response) {
    //     const response = await SpotifyModel.getSpotifyData(req.params.params)
    //     console.log(req.cookies)
    //     res.json(response)
    // }
    // static async getPlaylists() {
    //     const DIR_PATH = path.resolve(__dirname)

    //     const files = await fs.readdir(DIR_PATH + '/playlists');
    //     const total: VKDataInterface[] = []

    //     await Promise.all(files.map((filename) => {
    //         console.log(filename.slice(0, -5))
    //         const html = readFileSync(DIR_PATH + '/playlists/' + filename, 'utf8')
    //         const $ = cheerio.load(html)
    //         const tracks: [string, string][] = []
    //         $('.audio_row__performer_title').each((i, e) => {
    //             const artist = $(e).find('.artist_link').text().trim()
    //             const name = $(e).find('.audio_row__title_inner._audio_row__title_inner').text().trim()
    //             if (name && artist) {
    //                 tracks.push([artist, name])
    //             }
    //         })
    //         total.push({playlist: filename.slice(0, -5), tracks: tracks})
    //         }))
    //         //@ts-ignore
    //         user_data_vk = total
    // }

    async getCallback(req: Request, res: Response) {
        try {
            const code = req.query.code as string
            const state = req.query.state as string
            const request = await SpotifyModel.getCallback(code, state) as userTokens
            res.cookie('spotify_refresh_token', request.refresh_token, {httpOnly: true, secure: true, sameSite: 'lax'})
            res.redirect(process.env.URL_CLIENT)
        } catch(err) {
            console.log(err)
            res.status(500).json('Ошибка получения данных Spotify')
        }
    }

    take = async (req: Request, res: Response) => {
        console.log('1 ПОЛУЧЕНИЕ ЗАПРОСА ТЕЙК')
        console.log(`🚀 Вызов take() | Используемая память: ${process.memoryUsage().heapUsed / 1024 / 1024} MB`);
        if (!req.files || !Array.isArray(req.files)) {
            return res.status(400).json({ message: "Файлы не загружены" });
        }
        try {
            // WebsocketController.sendmessage('zaebal')
            const files = req.files.map(file => {
                // console.log(file)
                if (!['text/html', 'text/plain'].includes(file.mimetype)) {
                    throw new Error('EXTENSION ERROR')
                }
                const buffer = Buffer.from(file.fieldname, 'latin1')
                const name = buffer.toString('utf-8').split('.').slice(0, -1).join('.')
                return [name.toLowerCase() == 'моя музыка' ? 'Моя музыка' : name, file.buffer.toString('utf-8')]
            }).sort((a, b) => a[1].length - b[1].length)

            function myMusicCheck(name: string, iftrue: string, ifalse: string): string {return name == 'Моя музыка' ? iftrue : ifalse}
            
            WebsocketController.setLoadFiles(files.length - 1)

            for (let file of files) {
                const $ = cheerio.load(file[1])
                const tracksElements =  chunkArray($(myMusicCheck(file[0], ".audio_row_content._audio_row_content", '.audio_row__performer_title')).toArray())
                // console.log(file[0])
                let trackState = 0;
                const playlist: SpotifyDataInterface = {
                    playlist: file[0],
                    is_published: false,
                    tracks: []
                }
    
                let count = 0
                for (let trackPack of tracksElements) {
                    (tracksElements.length > 1 && count > 0 && await delay(2000))
                    count++
                    const tracks: trackInterface[] = await Promise.all(trackPack.map(async e => {
                        const artist = $(e).find(myMusicCheck(file[0], '.audio_row__performers a', '.artist_link')).text().trim()
                        const name = $(e).find(myMusicCheck(file[0], '.audio_row__title_inner', '.audio_row__title_inner._audio_row__title_inner')).text().trim()
                        if (name && artist) {
                            const result = await SpotifyModel.take(artist, name)
                            trackState++
                            WebsocketController.setLoading(trackState / tracksElements.flat(Infinity).length)
                            return result
                        }
                        return null
                    })
                )
                playlist.tracks.push(...tracks)
                }
                // total.push(playlist)
                console.log('2 КОНЕЦ ЗАПРОСА ТЕЙК')
                WebsocketController.pushToDB(playlist)
                WebsocketController.setLoadFiles(-1)
                count = 0
                res.status(200)
            }
            // res.json(total)
            // user_data.push(...total)
            // console.log(total)
            // return total
        } catch(err) {
            console.log(err)
            res.status(500).json(err)
        }
    }
    createAllPlaylists = async (req: Request, res: Response) => {
        console.log(user_id)
        // console.log(user_data)
        const {playlist, clean}: {playlist: number, clean: boolean} = req.body
        console.log(playlist, clean)
        const validateData = user_data.filter((e, i) => (!e.is_published && !(e.tracks.length === 0) && (playlist == i)))
        console.log(validateData)
        try {
            for (const playlist_to_pub of validateData) {
                const spotify_playlist = await $spotifyPost.post(`https://api.spotify.com/v1/users/${user_id}/playlists`, {
                    name: playlist_to_pub.playlist,
                    description: playlist_to_pub.playlist,
                    public: true
                })
                const playlist_id = spotify_playlist.data.id
                pushed_playlists.push({id_site: playlist, id_spoty: playlist_id})
                const tracks = chunkArray(playlist_to_pub.tracks, 99)
                for (let chunk of tracks) {
                    await delay(500)

                    const body = {uris: chunk.map((track: trackInterface) => {
                        if (clean && !track.sim_event) {
                            return `spotify:track:${track.id}`
                        }
                        if (!clean) {
                            return `spotify:track:${track.id}`;
                        }
                        return;
                    }).filter(e => e !== undefined)}
                    console.log(body)
                    await $spotifyPost.post(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, body)
                }
            }
            user_data[playlist].tracks.length > 0 ? user_data[playlist].is_published = true : user_data[playlist].is_published = false
            console.log(pushed_playlists)
            console.log(user_data)
            res.json(user_data)
        } catch(err) {
            console.log(err)
            res.status(500).json(err)
        }
    }
    removePlaylist = async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id)
            console.log(user_id)
            console.log(id)
            const playlist_id = pushed_playlists.filter(e => e.id_site == id)[0].id_spoty
            const indexToRemove = pushed_playlists.findIndex(e => e.id_spoty === playlist_id)
            pushed_playlists.splice(indexToRemove, 1)
            console.log(pushed_playlists)
            // const playlistsInSpoty: any[] = (await $spotifyPost.get(`https://api.spotify.com/v1/me/playlists`)).data.items
            // const allPlaylists: string[] = playlistsInSpoty.map(e => e.id)
            // console.log(allPlaylists) -- ПОЛУЧЕНИЕ ВСЕХ ПЛЕЙЛИСТОВ
            const playlistsInSpoty = $spotifyPost.delete(`https://api.spotify.com/v1/playlists/${playlist_id}/followers`)
            user_data[id].is_published = false
            console.log(user_data)
            res.json(playlistsInSpoty)
        } catch(err) {
            console.log(err)
            throw new Error('REMOVE PLAYLSIT ERROR')
        }
    }

    updateTrack = async (req: Request, res: Response) => {
        try {
            const playlist = Number(req.params.playlist)
            const track = Number(req.params.track)
            const methond = Object.keys(req.body)[0] as 'url' | 'sim_event' | 'delete'
            console.log(req.body)
            if (methond == 'url') {
                const url = req.body.url.split('/').pop()
                const response = (await $spotify(`https://api.spotify.com/v1/tracks/${url}`)).data as spotifyTrackDataInterface
                const result: trackInterface = {
                    vk_name: null,
                    spotify_name: response.name,
                    name_sim: null,
                    vk_artist: null,
                    sim_event: false,
                    spotify_artist: response.artists[0].name,
                    arist_sim: null,
                    id: response.id,
                    url: response.external_urls.spotify,
                }
                user_data[playlist].tracks[track] = result
            }
            if (methond == 'sim_event') {
                user_data[playlist].tracks[track][methond] = false
            }
            if (methond == 'delete') {
                user_data[playlist].tracks.splice(track, 1)
            }
            res.json(user_data[playlist].tracks[track])
        }
        catch(err) {
            console.log(err)
            res.status(500).json(err)
        }
    }
}

export default new SpotifyController()