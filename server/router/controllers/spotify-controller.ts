import { $spotifyPost } from "@s/router/axios/$spotify-post"
import { chunkArray, cleanText, cosineSimilarity, delay } from "@s/router/functions"
import SpotifyModel from "@s/router/models/spotify-model"
import { SpotifyDataInterface, spotifyTrackDataInterface, trackInterface, userTokens } from "@s/router/types"
import { Request, Response } from "express"
import * as cheerio from 'cheerio'
import {readFileSync} from 'fs'
import path from 'path'
import fs from 'fs/promises'
import { user_data, user_id } from "@s/router/db"
import $spotify from "@s/router/axios/$spotify"

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
        const code = req.query.code as string
        const state = req.query.state as string
        const request = await SpotifyModel.getCallback(code, state) as userTokens
        res.cookie('spotify_refresh_token', request.refresh_token, {httpOnly: true, secure: true, sameSite: 'lax'})
        res.redirect(process.env.URL_CLIENT)
    }

    take = async (req: Request, res: Response) => {
        if (!req.files || !Array.isArray(req.files)) {
            return res.status(400).json({ message: "Файлы не загружены" });
        }
        try {
            const files = req.files.map(file => {
                if (file.mimetype != 'text/html') {
                    throw new Error('EXTENSION ERROR')
                }
                const buffer = Buffer.from(file.fieldname, 'latin1')
                return [buffer.toString('utf-8').split('.').slice(0, -1).join('.'), file.buffer.toString('utf-8')]
            })
    
            const total: SpotifyDataInterface[] = []
            for (let file of files) {
                const $ = cheerio.load(file[1])
                const tracksElements =  chunkArray($('.audio_row__performer_title').toArray())
                const playlist: SpotifyDataInterface = {
                    playlist: file[0],
                    is_published: false,
                    tracks: []
                }
    
                for (let trackPack of tracksElements) {
                    (tracksElements.length > 2 && await delay(5000))
                    const tracks: trackInterface[] = await Promise.all(trackPack.map(async e => {
                        const artist = $(e).find('.artist_link').text().trim()
                        const name = $(e).find('.audio_row__title_inner._audio_row__title_inner').text().trim()
                        if (name && artist) {
                            return await SpotifyModel.take(artist, name)
                        }
                        return null
                    })
                )
                playlist.tracks.push(...tracks)
                }
                total.push(playlist)
            }
            res.json(total)
            user_data.push(...total)
            console.log(total)
            return total
        } catch(err) {
            console.log(err)
            res.status(400)
        }
    }
    createAllPlaylists = async (req: Request, res: Response) => {
        // // await $spotifyPost.get(`${process.env.URL_SERVER}/getSpotifyTracks`)
        // for (const playlist of user_data) {
        //     const spotify_playlist = await $spotifyPost.post(`https://api.spotify.com/v1/users/${user_id}/playlists`, {
        //         name: playlist.playlist,
        //         description: playlist.playlist,
        //         public: true
        //     })
        //     const playlist_id = spotify_playlist.data.id
        //     const body = {uris: playlist.tracks.map(track => {
        //         return `spotify:track:${track.id}`
        //     })}
        //     console.log(body)
        //     await $spotifyPost.post(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, body)
        // }
        // res.json(user_data)
        for (const playlist of user_data) {
            const spotify_playlist = await $spotifyPost.post(`https://api.spotify.com/v1/users/${user_id}/playlists`, {
                name: playlist.playlist,
                description: playlist.playlist,
                public: true
            })
            const playlist_id = spotify_playlist.data.id
            const tracks = chunkArray(playlist.tracks, 99)
            for (let chunk of tracks) {
                await delay(500)
                const body = {uris: chunk.map(track => {
                    return `spotify:track:${track.id}`
                })}
                console.log(body)
                await $spotifyPost.post(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, body)
            }

        }
        res.json(user_data)
    }
    static async testAsync() {
        return 10
    }
    test = async (req: Request, res: Response) => {
        const qwe = await $spotify.get(`https://api.spotify.com/v1/search?q=Welcome to Jungle&type=track&limit=1`)
        res.json(qwe.data)
        // res.json(qwe.data())
        // arr.map(() => {
        //     console.log(Math.round(Math.random() * 50000) + 1000)
        // })
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
        }
    }
}

export default new SpotifyController()