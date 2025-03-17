import { $spotifyPost } from "@s/router/$spotify-post"
import { chunkArray, cleanText, cosineSimilarity } from "@s/router/functions"
import SpotifyModel from "@s/router/models/spotify-model"
import { SpotifyDataInterface, spotifyTrackDataInterface, trackInterface, userTokens } from "@s/router/types"
import { Request, Response } from "express"
import * as cheerio from 'cheerio'
import {readFileSync} from 'fs'
import path from 'path'
import fs from 'fs/promises'
import { user_data, user_id } from "@s/router/db"

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
        const files = req.files.map(e => {
            const buffer = Buffer.from(e.fieldname, 'latin1')
            return [buffer.toString('utf-8').slice(0, -5), e.buffer.toString('utf-8')]
        })
        const total: SpotifyDataInterface[] = await Promise.all(files.map(async (file) => {
            const $ = cheerio.load(file[1])
            const tracksElements =  $('.audio_row__performer_title').toArray()

            const tracks: trackInterface[] = await Promise.all(tracksElements.map(async e => {
                    const artist = $(e).find('.artist_link').text().trim()
                    const name = $(e).find('.audio_row__title_inner._audio_row__title_inner').text().trim()
                    if (name && artist) {
                        return await SpotifyModel.take(artist, name)
                    }
                    return null
                })
            )
            return {playlist: file[0], tracks: tracks}
            }))
        res.json(total)
        user_data.push(...total)
        console.log(total)
        return total
    }
    createAllPlaylists = async (req: Request, res: Response) => {
        // await $spotifyPost.get(`${process.env.URL_SERVER}/getSpotifyTracks`)
        for (const playlist of user_data) {
            const spotify_playlist = await $spotifyPost.post(`https://api.spotify.com/v1/users/${user_id}/playlists`, {
                name: playlist.playlist,
                description: playlist.playlist,
                public: true
            })
            const playlist_id = spotify_playlist.data.id
            const body = {uris: playlist.tracks.map(track => {
                return `spotify:track:${track.id}`
            })}
            console.log(body)
            await $spotifyPost.post(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, body)
        }
        res.json(user_data)
    }
    static async testAsync() {
        return 10
    }
    test = async (req: Request, res: Response) => {
        const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

        await delay(3000)
        const num = await SpotifyController.testAsync()
        console.log(num)
    }
}

export default new SpotifyController()